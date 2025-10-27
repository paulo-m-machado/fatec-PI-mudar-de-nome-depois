'use strict';

(function(){
  const CONSULTAS_KEY = 'consultas';
  const PACIENTES_KEY = 'pacientes';

  const els = {};
  const state = {
    weekStart: startOfWeek(new Date()), // Monday
    dayStart: '08:00',
    dayEnd: '18:00',
    slotMinutes: 30,
  };

  function startOfWeek(d){
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = x.getDay(); // 0 Sun, 1 Mon ...
    const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
    x.setDate(x.getDate() + diff);
    x.setHours(0,0,0,0);
    return x;
  }

  function formatDateYYYYMMDD(d){
    const y=d.getFullYear();
    const m=String(d.getMonth()+1).padStart(2,'0');
    const dd=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${dd}`;
  }

  function formatBR(d){ return d.toLocaleDateString('pt-BR'); }

  function addDays(d, n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }

  function loadConsultas(){
    try{ const raw=localStorage.getItem(CONSULTAS_KEY); const arr= raw?JSON.parse(raw):[]; return Array.isArray(arr)?arr:[]; }catch{return []}
  }
  function saveConsultas(list){ localStorage.setItem(CONSULTAS_KEY, JSON.stringify(list)); }

  function loadPacientes(){
    try{ const raw=localStorage.getItem(PACIENTES_KEY); const arr= raw?JSON.parse(raw):[]; return Array.isArray(arr)?arr:[]; }catch{return []}
  }

  function populatePacientesSelect(){
    const pacientes = loadPacientes();
    els.agendaPaciente.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Selecione um paciente';
    placeholder.disabled = true;
    placeholder.selected = true;
    els.agendaPaciente.appendChild(placeholder);
    pacientes.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.nome;
      els.agendaPaciente.appendChild(opt);
    });
  }

  function timeToMinutes(t){
    const [H='0',M='0']=String(t||'').split(':');
    return (+H)*60 + (+M);
  }
  function minutesToTime(m){
    const H=Math.floor(m/60), M=m%60;
    return `${String(H).padStart(2,'0')}:${String(M).padStart(2,'0')}`;
  }

  function toCssClass(s){
    return String(s||'')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/\s+/g,'-');
  }

  function setWeekLabel(){
    const start = state.weekStart;
    const end = addDays(start, 6);
    els.weekLabel.textContent = `${formatBR(start)} – ${formatBR(end)}`;
  }

  function buildHeader(){
    const headerRow = document.getElementById('agendaHeaderRow');
    const days = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
    // Keep first th (Horários), fill others with dates
    // headerRow already has 8 th; update text content from index 1..7
    for(let i=0;i<7;i++){
      const th = headerRow.children[i+1];
      const d = addDays(state.weekStart, i);
      th.textContent = `${days[i]}\n${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
      const isToday = formatDateYYYYMMDD(d) === formatDateYYYYMMDD(new Date());
      th.classList.toggle('today', isToday);
    }
  }

  function slotKey(dateStr, timeStr){ return `${dateStr}T${timeStr}`; }

  function findConsultaAt(dateStr, timeStr){
    const list = loadConsultas();
    return list.find(c => c.data === dateStr && c.hora === timeStr && c.status !== 'Cancelada');
  }

  function renderGrid(){
    setWeekLabel();
    buildHeader();

    const tbody = els.agendaBody;
    tbody.innerHTML = '';

    const startMin = timeToMinutes(state.dayStart);
    const endMin = timeToMinutes(state.dayEnd);
    const step = +state.slotMinutes || 30;

    for(let m=startMin; m<endMin; m+=step){
      const tr = document.createElement('tr');
      // time label
      const tdTime = document.createElement('td');
      tdTime.className = 'times-col';
      tdTime.textContent = minutesToTime(m);
      tr.appendChild(tdTime);

      for(let d=0; d<7; d++){
        const td = document.createElement('td');
        const slot = document.createElement('div');
        slot.className = 'slot';
        const dateObj = addDays(state.weekStart, d);
        const dateStr = formatDateYYYYMMDD(dateObj);
        const timeStr = minutesToTime(m);
        slot.dataset.date = dateStr;
        slot.dataset.time = timeStr;

        const c = findConsultaAt(dateStr, timeStr);
        if(c){
          const ev = document.createElement('div');
          ev.className = `event ${toCssClass(c.status)}`;
          const titulo = c.paciente ? c.paciente : 'Consulta';
          ev.textContent = `${titulo} • ${c.tipo||''}`;
          slot.appendChild(ev);
        }
        td.appendChild(slot);
        // highlight today column
        if(formatDateYYYYMMDD(dateObj) === formatDateYYYYMMDD(new Date())) td.classList.add('today');
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }

  function fillForm(model){
    els.consultaId.value = model.id || '';
    if(model.pacienteId){ els.agendaPaciente.value = model.pacienteId; }
    els.agendaData.value = model.data || '';
    els.agendaHora.value = model.hora || '';
    els.agendaTipo.value = model.tipo || 'Avaliação';
    els.agendaStatus.value = model.status || 'Agendada';
    els.agendaObs.value = model.observacoes || '';

    els.btnCancelarEdicao.style.display = 'inline-block';
    els.btnCancelarConsulta.style.display = 'inline-block';
    els.formTitle.textContent = 'Editar agendamento';
  }

  function clearForm(){
    els.agendaForm.reset();
    els.consultaId.value = '';
    els.btnCancelarEdicao.style.display = 'none';
    els.btnCancelarConsulta.style.display = 'none';
    els.formTitle.textContent = 'Agendar';
  }

  function uid(){ return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }

  function conflictExists(list, data, hora, ignoreId){
    return list.some(c => c.data===data && c.hora===hora && c.status!=='Cancelada' && c.id!==ignoreId);
  }

  function handleSlotClick(e){
    const slot = e.target.closest('.slot');
    if(!slot) return;
    const data = slot.dataset.date;
    const hora = slot.dataset.time;

    const c = findConsultaAt(data, hora);
    if(c){
      fillForm(c);
      return;
    }
    // Novo agendamento
    els.agendaData.value = data;
    els.agendaHora.value = hora;
    els.agendaStatus.value = 'Agendada';
    els.formTitle.textContent = 'Agendar';
  }

  function handleSubmit(e){
    e.preventDefault();
    const pacientes = loadPacientes();
    const pacienteId = els.agendaPaciente.value;
    const paciente = (pacientes.find(p=>p.id===pacienteId)||{}).nome || '';

    const model = {
      id: els.consultaId.value || uid(),
      pacienteId,
      paciente,
      data: els.agendaData.value,
      hora: els.agendaHora.value,
      tipo: els.agendaTipo.value,
      status: els.agendaStatus.value,
      observacoes: els.agendaObs.value.trim(),
      createdAt: Date.now(),
    };

    if(!model.pacienteId || !model.data || !model.hora){
      alert('Selecione o paciente e preencha data e hora.');
      return;
    }

    const list = loadConsultas();
    if(conflictExists(list, model.data, model.hora, model.id)){
      alert('Horário já ocupado.');
      return;
    }

    const idx = list.findIndex(x => x.id === model.id);
    if(idx>=0) list[idx] = model; else list.push(model);
    saveConsultas(list);
    clearForm();
    renderGrid();
  }

  function handleCancelEdit(){ clearForm(); }

  function handleCancelConsulta(){
    const id = els.consultaId.value;
    if(!id) return;
    if(!confirm('Cancelar esta consulta?')) return;
    const list = loadConsultas();
    const idx = list.findIndex(x=>x.id===id);
    if(idx>=0){ list[idx].status = 'Cancelada'; saveConsultas(list); }
    clearForm();
    renderGrid();
  }

  function init(){
    els.agendaForm = document.getElementById('agendaForm');
    els.consultaId = document.getElementById('consultaId');
    els.agendaPaciente = document.getElementById('agendaPaciente');
    els.agendaData = document.getElementById('agendaData');
    els.agendaHora = document.getElementById('agendaHora');
    els.agendaTipo = document.getElementById('agendaTipo');
    els.agendaStatus = document.getElementById('agendaStatus');
    els.agendaObs = document.getElementById('agendaObs');
    els.btnCancelarEdicao = document.getElementById('btnCancelarEdicao');
    els.btnCancelarConsulta = document.getElementById('btnCancelarConsulta');
    els.formTitle = document.getElementById('formTitle');

    els.agendaBody = document.getElementById('agendaBody');
    els.weekLabel = document.getElementById('weekLabel');
    els.btnPrev = document.getElementById('btnPrev');
    els.btnNext = document.getElementById('btnNext');
    els.btnToday = document.getElementById('btnToday');

    els.dayStart = document.getElementById('dayStart');
    els.dayEnd = document.getElementById('dayEnd');
    els.slotMinutes = document.getElementById('slotMinutes');

    populatePacientesSelect();

    els.agendaBody.addEventListener('click', handleSlotClick);
    els.agendaForm.addEventListener('submit', handleSubmit);
    els.btnCancelarEdicao.addEventListener('click', handleCancelEdit);
    els.btnCancelarConsulta.addEventListener('click', handleCancelConsulta);

    els.btnPrev.addEventListener('click', function(){ state.weekStart = addDays(state.weekStart, -7); renderGrid(); });
    els.btnNext.addEventListener('click', function(){ state.weekStart = addDays(state.weekStart, 7); renderGrid(); });
    els.btnToday.addEventListener('click', function(){ state.weekStart = startOfWeek(new Date()); renderGrid(); });

    els.dayStart.addEventListener('change', function(){ state.dayStart = this.value || '08:00'; renderGrid(); });
    els.dayEnd.addEventListener('change', function(){ state.dayEnd = this.value || '18:00'; renderGrid(); });
    els.slotMinutes.addEventListener('change', function(){ state.slotMinutes = parseInt(this.value||'30',10); renderGrid(); });

    // Init state from inputs
    state.dayStart = els.dayStart.value || state.dayStart;
    state.dayEnd = els.dayEnd.value || state.dayEnd;
    state.slotMinutes = parseInt(els.slotMinutes.value||state.slotMinutes,10);

    renderGrid();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
