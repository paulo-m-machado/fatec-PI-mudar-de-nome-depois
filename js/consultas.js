'use strict';

(function () {
  const STORAGE_KEY = 'consultas';
  const PACIENTES_KEY = 'pacientes';

  const els = {};
  const state = {
    query: '',
    sortBy: 'data',
    sortDir: 'asc', // 'asc' | 'desc'
  };

  function loadConsultas() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(data)) return [];
      return data;
    } catch (e) {
      console.error('Erro ao carregar consultas', e);
      return [];
    }
  }

  function saveConsultas(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function loadPacientes(){
    try{ const raw=localStorage.getItem(PACIENTES_KEY); const arr= raw?JSON.parse(raw):[]; return Array.isArray(arr)?arr:[]; }catch{return []}
  }

  function populatePacientesSelect(){
    const pacientes = loadPacientes();
    if(els.paciente){
      els.paciente.innerHTML = '';
      pacientes.forEach(p=>{
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nome;
        els.paciente.appendChild(opt);
      });
    }
  }

  function parseDateTime(d, t) {
    // d = 'YYYY-MM-DD', t = 'HH:MM'
    if (!d) return 0;
    const [yy, mm, dd] = d.split('-').map(Number);
    const [HH = 0, MM = 0] = (t || '00:00').split(':').map(Number);
    return new Date(yy, (mm || 1) - 1, dd || 1, HH, MM).getTime();
  }

  function formatDate(d) {
    if (!d) return '';
    try {
      const [yy, mm, dd] = d.split('-').map(Number);
      return new Date(yy, (mm || 1) - 1, dd || 1).toLocaleDateString('pt-BR');
    } catch {
      return d;
    }
  }

  function formatTime(t) {
    return t || '';
  }

  function statusBadgeClass(status) {
    const s = (status || '').toLowerCase();
    if (s === 'agendada') return 'badge agendada';
    if (s === 'concluída' || s === 'concluida') return 'badge concluida';
    if (s === 'cancelada') return 'badge cancelada';
    return 'badge';
  }

  function render() {
    const tbody = els.tbody;
    const query = state.query.trim().toLowerCase();
    let rows = loadConsultas();
    // Exibir apenas consultas com status 'Agendada'
    rows = rows.filter(r => String((r.status || '')).toLowerCase() === 'agendada');

    if (query) {
      rows = rows.filter((r) =>
        [r.paciente, r.tipo, r.status]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(query))
      );
    }

    const sortBy = state.sortBy;
    const dir = state.sortDir === 'asc' ? 1 : -1;
    rows.sort((a, b) => {
      let va, vb;
      if (sortBy === 'data') {
        va = parseDateTime(a.data, a.hora);
        vb = parseDateTime(b.data, b.hora);
      } else {
        va = (a[sortBy] || '').toString().toLowerCase();
        vb = (b[sortBy] || '').toString().toLowerCase();
      }
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });

    const html = rows
      .map((r) => {
        return `
          <tr>
            <td>${escapeHtml(r.paciente)}</td>
            <td>${formatDate(r.data)}</td>
            <td>${formatTime(r.hora)}</td>
            <td>${escapeHtml(r.tipo)}</td>
            <td><span class="${statusBadgeClass(r.status)}">${escapeHtml(r.status)}</span></td>
            <td>
              <a href="#" class="acao" data-action="editar" data-id="${r.id}">Editar</a>
              <a href="#" class="acao" data-action="excluir" data-id="${r.id}">Excluir</a>
              ${r.pacienteId ? `<a href="anamnese.html?pacienteId=${r.pacienteId}" class="acao">Anamnese</a>` : ''}
            </td>
          </tr>`;
      })
      .join('');

    tbody.innerHTML = html || '<tr><td colspan="6">Nenhuma consulta encontrada.</td></tr>';
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function clearForm() {
    els.form.reset();
    els.consultaId.value = '';
    els.btnCancelar.style.display = 'none';
    els.btnSalvar.textContent = 'Salvar';
  }

  function fillForm(model) {
    els.consultaId.value = model.id || '';
    // Seleciona por pacienteId; se ausente, tenta por nome
    const pacientes = loadPacientes();
    let pid = model.pacienteId;
    if(!pid && model.paciente){ const m = pacientes.find(p=>p.nome===model.paciente); if(m) pid = m.id; }
    if(pid){ els.paciente.value = pid; }
    els.data.value = model.data || '';
    els.hora.value = model.hora || '';
    els.tipo.value = model.tipo || 'Avaliação';
    els.status.value = model.status || 'Agendada';
    els.observacoes.value = model.observacoes || '';

    els.btnCancelar.style.display = 'inline-block';
    els.btnSalvar.textContent = 'Atualizar';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const pacientes = loadPacientes();
    const pacienteId = els.paciente && els.paciente.value;
    const paciente = (pacientes.find(p=>p.id===pacienteId)||{}).nome || '';

    const model = {
      id: els.consultaId.value || uid(),
      pacienteId,
      paciente,
      data: els.data.value,
      hora: els.hora.value,
      tipo: els.tipo.value,
      status: els.status.value,
      observacoes: els.observacoes.value.trim(),
      createdAt: Date.now(),
    };

    if (!model.pacienteId || !model.data || !model.hora) {
      alert('Selecione o paciente e preencha data e hora.');
      return;
    }

    const list = loadConsultas();
    const idx = list.findIndex((x) => x.id === model.id);
    if (idx >= 0) {
      list[idx] = model;
    } else {
      list.push(model);
    }
    saveConsultas(list);
    clearForm();
    render();
  }

  function handleTableClick(e) {
    const a = e.target.closest('a[data-action]');
    if (!a) return;
    e.preventDefault();

    const id = a.getAttribute('data-id');
    const action = a.getAttribute('data-action');
    const list = loadConsultas();
    const item = list.find((x) => x.id === id);

    if (action === 'editar') {
      if (item) fillForm(item);
      return;
    }

    if (action === 'excluir') {
      if (!confirm('Deseja realmente excluir esta consulta?')) return;
      const filtered = list.filter((x) => x.id !== id);
      saveConsultas(filtered);
      render();
      return;
    }
  }

  function handleSort(e) {
    const th = e.target.closest('th[data-col]');
    if (!th) return;
    const col = th.getAttribute('data-col');
    if (state.sortBy === col) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortBy = col;
      state.sortDir = 'asc';
    }
    render();
  }

  function init() {
    els.form = document.getElementById('consultaForm');
    els.consultaId = document.getElementById('consultaId');
    els.paciente = document.getElementById('paciente');
    els.data = document.getElementById('data');
    els.hora = document.getElementById('hora');
    els.tipo = document.getElementById('tipo');
    els.status = document.getElementById('status');
    els.observacoes = document.getElementById('observacoes');

    els.btnSalvar = document.getElementById('btnSalvar');
    els.btnCancelar = document.getElementById('btnCancelar');

    els.busca = document.getElementById('busca');

    els.tabela = document.getElementById('tabelaConsultas');
    els.tbody = els.tabela.querySelector('tbody');
    els.thead = els.tabela.querySelector('thead');

    populatePacientesSelect();
    if(els.paciente && !els.paciente.options.length){
      alert('Cadastre pacientes antes de criar consultas.');
    }

    els.form.addEventListener('submit', handleSubmit);
    els.btnCancelar.addEventListener('click', clearForm);

    els.busca.addEventListener('input', function () {
      state.query = this.value;
      render();
    });

    els.tbody.addEventListener('click', handleTableClick);
    els.thead.addEventListener('click', handleSort);

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
