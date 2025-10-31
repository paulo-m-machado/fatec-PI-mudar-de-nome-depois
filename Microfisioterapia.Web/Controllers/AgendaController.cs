using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Microfisioterapia.Web.Data;
using Microfisioterapia.Web.Models;

namespace Microfisioterapia.Web.Controllers
{
    public class AgendaController : Controller
    {
        private readonly MongoDbContext _db;

        public AgendaController(MongoDbContext db)
        {
            _db = db;
        }

        public IActionResult Index(string? start)
        {
            ViewData["Start"] = start;
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Weekly(string? start, string? end, string? tipo)
        {
            var startDate = string.IsNullOrWhiteSpace(start) ? DateTime.Today : DateTime.Parse(start);
            var endDate = string.IsNullOrWhiteSpace(end) ? startDate.AddDays(6) : DateTime.Parse(end);

            var fb = Builders<Agendamento>.Filter;
            var filter = fb.Gte(a => a.Data, startDate.ToString("yyyy-MM-dd")) &
                         fb.Lte(a => a.Data, endDate.ToString("yyyy-MM-dd"));

            if (!string.IsNullOrWhiteSpace(tipo) && !string.Equals(tipo, "Todos", StringComparison.OrdinalIgnoreCase))
            {
                filter &= fb.Eq(a => a.Tipo, tipo);
            }

            var list = await _db.Agendamentos.Find(filter).ToListAsync();
            return Json(list);
        }

        [HttpGet]
        public async Task<IActionResult> Create(string? id, string? date, string? time)
        {
            var pacientes = await _db.Pacientes
                .Find(Builders<Paciente>.Filter.Empty)
                .Project(p => new { p.Id, p.NomeCompleto })
                .ToListAsync();
            ViewBag.Pacientes = pacientes;

            Agendamento model;
            if (!string.IsNullOrEmpty(id))
            {
                model = await _db.Agendamentos.Find(a => a.Id == id).FirstOrDefaultAsync() ?? new Agendamento();
            }
            else
            {
                model = new Agendamento { Data = date ?? string.Empty, Hora = time ?? string.Empty };
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Agendamento model)
        {
            if (string.IsNullOrWhiteSpace(model.PacienteId) || string.IsNullOrWhiteSpace(model.Data) || string.IsNullOrWhiteSpace(model.Hora))
            {
                ModelState.AddModelError(string.Empty, "Paciente, data e hora são obrigatórios.");
            }

            if (!ModelState.IsValid)
            {
                var pacientes = await _db.Pacientes
                    .Find(Builders<Paciente>.Filter.Empty)
                    .Project(p => new { p.Id, p.NomeCompleto })
                    .ToListAsync();
                ViewBag.Pacientes = pacientes;
                return View(model);
            }

            var paciente = await _db.Pacientes.Find(p => p.Id == model.PacienteId).FirstOrDefaultAsync();
            model.PacienteNome = paciente?.NomeCompleto ?? model.PacienteNome;

            if (string.IsNullOrEmpty(model.Id))
            {
                await _db.Agendamentos.InsertOneAsync(model);
            }
            else
            {
                await _db.Agendamentos.ReplaceOneAsync(a => a.Id == model.Id, model);
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
