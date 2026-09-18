(function () {
  "use strict";

  /* ============================= ICONS ============================= */
  function placeholderIcon(size, color, strokeWidth) {
    const sw = strokeWidth || 1.3;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="${color}" stroke-width="${sw}"/><path d="M4.5 4.5L19.5 19.5M19.5 4.5L4.5 19.5" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/></svg>`;
  }
  function chevron(size, dir, color) {
    const paths = { down: "M6 9l6 6 6-6", up: "M6 15l6-6 6 6", right: "M9 6l6 6-6 6" };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="${paths[dir]}" stroke="${color}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  const ICON = {
    navPlaceholder: placeholderIcon(15, "currentColor"),
    search: placeholderIcon(11, "#9A9A9A"),
    trash: placeholderIcon(11, "#B5B5B5"),
    chevronDown: chevron(9, "down", "#9A9A9A"),
    chevronUpSm: chevron(10, "up", "#9A9A9A"),
    chevronRight: chevron(9, "right", "#9A9A9A"),
    wagon: placeholderIcon(12, "#1A1A1A"),
    magnify: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="10" r="7" stroke="#1A1A1A" stroke-width="2"/><line x1="15" y1="15" x2="21" y2="21" stroke="#1A1A1A" stroke-width="2"/></svg>',
    edit: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4 12-12 3 3-12 12-4 1z" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"/></svg>',
    filter: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M9 6V4h6v2m-8 0v14a1 1 0 001 1h6a1 1 0 001-1V6" stroke="#1A1A1A" stroke-width="2"/></svg>',
    list: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 5h16M4 12h16M4 19h16" stroke="#1A1A1A" stroke-width="2"/></svg>',
    flag: placeholderIcon(11, "#FFFFFF"),
    note: placeholderIcon(11, "#1A1A1A"),
    compass: placeholderIcon(10, "#FFFFFF"),
    viewMap: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" stroke-width="1.4"/><line x1="9" y1="5" x2="9" y2="19" stroke="currentColor" stroke-width="1.4"/><line x1="15" y1="5" x2="15" y2="19" stroke="currentColor" stroke-width="1.4"/></svg>',
    viewKanban: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="5" height="16" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="9.5" y="4" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="16" y="4" width="5" height="13" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>'
  };

  /* ============================= NAV ============================= */
  const NAV_ITEMS = [
    { id: "cadastrar-demanda", label: "Cadastrar demanda", icon: ICON.navPlaceholder },
    { id: "demandas", label: "Demandas", icon: ICON.navPlaceholder },
    { id: "ficha-operacional", label: "Ficha Operacional", icon: ICON.navPlaceholder },
    { id: "planejamento", label: "Planejamento", icon: ICON.navPlaceholder },
    { id: "meu-patio", label: "Meu Pátio", icon: ICON.navPlaceholder },
    { id: "historico", label: "Histórico", icon: ICON.navPlaceholder },
    { id: "visao-estrategica", label: "Visão Estratégica", icon: ICON.navPlaceholder }
  ];

  /* ============================= PERSONAS ============================= */
  const PPC_ROUTES = ["cadastrar-demanda", "demandas", "editar-demanda"];
  const PERSONAS = {
    cpt: { label: "CPT", defaultRoute: "ficha-operacional", nav: ["ficha-operacional", "planejamento", "meu-patio", "historico", "visao-estrategica"] },
    ppc: { label: "PPC Execução", defaultRoute: "cadastrar-demanda", nav: ["cadastrar-demanda", "demandas"] }
  };
  function personaKeyForRoute(route) {
    return PPC_ROUTES.includes(route) ? "ppc" : "cpt";
  }
  let personaMenuOpen = false;

  /* ============================= DATA ============================= */
  const TRAINS = [
    {
      id: "J614", os: "9882/2026", eta: "18:50", fichaBadge: 5,
      detail: {
        blockTitle: "BLOCO A", blockSub: "1 loco · 29 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 342598-3", "− 342766-8", "− 618214-3"],
        addChips: ["+ VG-88091", "+ VG-70228"],
        timeBadge: "00:16", etapasLabel: "6 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha Desvio, referência T3, a 1200m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 342598-3</span><span class="chip-inline">− 342766-8</span><span class="chip-inline">− 618214-3</span>, mantendo a composição na Linha Desvio, referência T3.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de recebimento." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 2, badgeNum: "1200m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "R045", os: "9915/2026", eta: "19:20", fichaBadge: 3,
      detail: {
        blockTitle: "BLOCO B", blockSub: "1 loco · 22 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 118820-4", "− 118834-7"],
        addChips: ["+ VG-52310"],
        timeBadge: "00:09", etapasLabel: "5 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha 4, referência T1, a 800m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 118820-4</span><span class="chip-inline">− 118834-7</span>, mantendo a composição na Linha 4, referência T1.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de expedição." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 0, badgeNum: "800m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "J602", os: "9840/2026", eta: "17:30", fichaBadge: null,
      detail: {
        blockTitle: "BLOCO A", blockSub: "2 locos · 34 vagões · 2 grupos no bloco",
        groupLabel: "Grupo 2 —",
        removeChips: ["− 705214-2"],
        addChips: ["+ VG-90142", "+ VG-90178"],
        timeBadge: "00:21", etapasLabel: "7 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha 3, referência T2, a 450m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 705214-2</span>, mantendo a composição na Linha 3, referência T2.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de recebimento." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 1, badgeNum: "450m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "R039", os: "9855/2026", eta: "18:10", fichaBadge: 1,
      detail: {
        blockTitle: "BLOCO B", blockSub: "1 loco · 18 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 220156-9"],
        addChips: ["+ VG-33021"],
        timeBadge: "00:12", etapasLabel: "5 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha Desvio, referência T4, a 950m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 220156-9</span>, mantendo a composição na Linha Desvio, referência T4.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de expedição." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 2, badgeNum: "950m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "J588", os: "9801/2026", eta: "17:00", fichaBadge: null,
      detail: {
        blockTitle: "BLOCO A", blockSub: "1 loco · 26 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 402317-6"],
        addChips: ["+ VG-61140"],
        timeBadge: "00:11", etapasLabel: "5 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha 4, referência T1, a 600m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 402317-6</span>, mantendo a composição na Linha 4, referência T1.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de recebimento." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 0, badgeNum: "600m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "J640", os: "9773/2026", eta: "19:40", fichaBadge: null,
      detail: {
        blockTitle: "BLOCO B", blockSub: "2 locos · 31 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 550872-1", "− 550889-5"],
        addChips: ["+ VG-74402"],
        timeBadge: "00:18", etapasLabel: "6 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha 3, referência T2, a 1100m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 550872-1</span><span class="chip-inline">− 550889-5</span>, mantendo a composição na Linha 3, referência T2.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de expedição." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 1, badgeNum: "1100m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "J356", os: "9784/2026", eta: "18:35", fichaBadge: null,
      detail: {
        blockTitle: "BLOCO A", blockSub: "1 loco · 24 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 313409-8"],
        addChips: ["+ VG-20087"],
        timeBadge: "00:10", etapasLabel: "5 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha Desvio, referência T3, a 700m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 313409-8</span>, mantendo a composição na Linha Desvio, referência T3.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de recebimento." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 2, badgeNum: "700m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "R073", os: "9791/2026", eta: "20:05", fichaBadge: null,
      detail: {
        blockTitle: "BLOCO B", blockSub: "1 loco · 19 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 601122-0"],
        addChips: ["+ VG-45590"],
        timeBadge: "00:08", etapasLabel: "4 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha 4, referência T1, a 500m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 601122-0</span>, mantendo a composição na Linha 4, referência T1.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de expedição." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 0, badgeNum: "500m", badgeLbl: "até o desvio" }
      }
    },
    {
      id: "R512", os: "9762/2026", eta: "18:15", fichaBadge: null,
      detail: {
        blockTitle: "BLOCO A", blockSub: "1 loco · 27 vagões · 1 grupo no bloco",
        groupLabel: "Grupo 1 —",
        removeChips: ["− 887701-4"],
        addChips: ["+ VG-13065"],
        timeBadge: "00:14", etapasLabel: "5 etapas previstas",
        steps: [
          { num: 1, title: "PARADA", desc: "O Maquinista do Trem conduz a parada da composição na Linha 3, referência T2, a 850m do início do trecho." },
          { num: 2, title: "CORTE", desc: 'O Operador da Manobra desengata o(s) vagão(ões) <span class="chip-inline">− 887701-4</span>, mantendo a composição na Linha 3, referência T2.' },
          { num: 3, title: "TRAÇÃO", desc: "O Maquinista do Trem traciona a composição restante para liberar a via principal, seguindo em direção ao pátio de recebimento." }
        ],
        map: { lanes: ["L4", "L3", "L Desvio"], activeLane: 1, badgeNum: "850m", badgeLbl: "até o desvio" }
      }
    }
  ];

  /* ============================= TRACK MAP (placeholder) ============================= */
  function renderTrackMap() {
    return `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line x1="0" y1="0" x2="100" y2="100" stroke="#D0D0D0" stroke-width="1" vector-effect="non-scaling-stroke"/>
      <line x1="100" y1="0" x2="0" y2="100" stroke="#D0D0D0" stroke-width="1" vector-effect="non-scaling-stroke"/>
    </svg>`;
  }

  /* ============================= SHELL ============================= */
  function renderShell(active, innerHtml) {
    const personaKey = personaKeyForRoute(active);
    const persona = PERSONAS[personaKey];
    const navHtml = NAV_ITEMS.filter((item) => persona.nav.includes(item.id))
      .map((item) => `<div class="nav-item${active === item.id ? " active" : ""}" data-route="${item.id}">${item.icon}<span>${item.label}</span></div>`)
      .join("");

    const personaMenu = personaMenuOpen
      ? `<div class="persona-menu">
          <button type="button" class="persona-option${personaKey === "cpt" ? " active" : ""}" data-persona="cpt">CPT</button>
          <button type="button" class="persona-option${personaKey === "ppc" ? " active" : ""}" data-persona="ppc">PPC Execução</button>
          <button type="button" class="persona-option" data-persona="maquinista">Maquinista</button>
        </div>`
      : "";

    return `
      <div class="shell">
        <div class="app-side">
          <div class="app-title"><span>Manobra X</span></div>
          ${navHtml}
          <div class="app-footer persona-widget">
            <button type="button" class="persona-toggle" data-persona-toggle>
              <span>${persona.label}</span>
              ${ICON.chevronDown}
            </button>
            ${personaMenu}
          </div>
        </div>
        <div class="view">${innerHtml}</div>
      </div>
    `;
  }

  /* ============================= SCREEN: CADASTRAR DEMANDA ============================= */
  function renderVagaoRow(r) {
    return `
        <tr>
          <td class="veiculo-link">${r.veiculo}</td><td>${r.serie}</td><td>${r.local}</td><td>${r.situacao}</td><td>${r.lotacao}</td>
          <td><span class="crit-badge">${r.crit}</span></td><td>${r.restricao}</td>
          <td class="${r.nota !== "—" ? "nota-link" : ""}">${r.nota}</td>
          <td class="trash">${ICON.trash}</td>
        </tr>`;
  }

  function renderCadastrarDemanda() {
    const rows = [
      { veiculo: "6047122", serie: "HPD", local: "V28", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Hollow", nota: "—" },
      { veiculo: "7053401", serie: "HFE", local: "V54", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Isolado + furo na tubulação do EG", nota: "15642369" },
      { veiculo: "7053398", serie: "HFE", local: "VTU", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Acompanha reparo", nota: "15642368" },
      { veiculo: "2412993", serie: "HFD", local: "V48", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "IB e IT", nota: "—" }
    ];
    const rowsHtml = rows.map(renderVagaoRow).join("");

    return `
      <div class="page">
        <div class="header-row">
          <div class="page-title">Nova demanda</div>
          <div class="pill-tag">Retirada de avariados</div>
        </div>

        <div class="card">
          <div class="field-row">
            <div class="field"><div class="field-label">Trem</div><div class="field-input">J103</div></div>
            <div class="field"><div class="field-label">Pátio</div><div class="field-input">EHT</div></div>
            <div class="field"><div class="field-label">Trecho</div><div class="field-input">Centro Leste OTA</div></div>
          </div>
        </div>

        <div class="card">
          <div class="section-header">
            <div class="section-title">Vagões a retirar</div>
            <div class="spacer"></div>
            <button class="btn btn-secondary">+ Adicionar vagão</button>
          </div>
          <table>
            <thead>
              <tr><th>Veículo</th><th>Série</th><th>Local</th><th>Situação</th><th>Lotação</th><th>Criticidade</th><th>Restrição Consolidada</th><th>Nota SAP</th><th></th></tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>

        <div class="card">
          <div class="section-title" style="margin-bottom:12px;">Vagões a incluir</div>
          <div class="field-label">Quantidade de vagões</div>
          <div class="field-input qty-input">4</div>
        </div>

        <div class="bottom-row">
          <div class="bottom-left"></div>
          <button class="btn btn-primary" data-route="ficha-operacional">Enviar para o CPT →</button>
        </div>
      </div>
    `;
  }

  /* ============================= SCREEN: DEMANDAS ============================= */
  const DEMANDAS = [
    {
      id: "DM-1042", tipo: "Retirada de avariados", trem: "J103", patio: "EHT", trecho: "Centro Leste OTA",
      status: "em-analise", dataEnvio: "24/08/2026 · 09:12", qtdIncluir: 4,
      rows: [
        { veiculo: "6047122", serie: "HPD", local: "V28", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Hollow", nota: "—" },
        { veiculo: "7053401", serie: "HFE", local: "V54", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Isolado + furo na tubulação do EG", nota: "15642369" },
        { veiculo: "7053398", serie: "HFE", local: "VTU", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Acompanha reparo", nota: "15642368" },
        { veiculo: "2412993", serie: "HFD", local: "V48", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "IB e IT", nota: "—" }
      ]
    },
    {
      id: "DM-1039", tipo: "Retirada de avariados", trem: "R045", patio: "EHT", trecho: "Centro Leste OTA",
      status: "aprovada", dataEnvio: "23/08/2026 · 16:40", qtdIncluir: 1,
      rows: [
        { veiculo: "1188204", serie: "HAD", local: "V12", situacao: "Giro", lotacao: "Vazio", crit: "B", restricao: "Rodeiro com desgaste", nota: "15641987" }
      ]
    },
    {
      id: "DM-1035", tipo: "Retirada de avariados", trem: "J602", patio: "EHT", trecho: "Centro Leste OTA",
      status: "recusada", dataEnvio: "23/08/2026 · 11:05", qtdIncluir: 2,
      rows: [
        { veiculo: "7052140", serie: "HFE", local: "V33", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Estrutura avariada", nota: "—" }
      ]
    },
    {
      id: "DM-1031", tipo: "Retirada de avariados", trem: "J588", patio: "EHT", trecho: "Centro Leste OTA",
      status: "aprovada", dataEnvio: "22/08/2026 · 14:22", qtdIncluir: 0,
      rows: [
        { veiculo: "7016325", serie: "PED", local: "V19", situacao: "Giro", lotacao: "Vazio", crit: "B", restricao: "Freio danificado", nota: "15640512" },
        { veiculo: "7016340", serie: "PED", local: "V19", situacao: "Giro", lotacao: "Vazio", crit: "B", restricao: "Nenhuma", nota: "—" }
      ]
    },
    {
      id: "DM-1028", tipo: "Retirada de avariados", trem: "R039", patio: "EHT", trecho: "Centro Leste OTA",
      status: "enviada", dataEnvio: "22/08/2026 · 08:50", qtdIncluir: 3,
      rows: [
        { veiculo: "2201569", serie: "HFD", local: "V41", situacao: "Giro", lotacao: "Vazio", crit: "A", restricao: "Isolado", nota: "—" }
      ]
    }
  ];

  let demandasStatusFilter = "todas";
  let selectedDemandaId = null;

  function demandaStatusLabel(status) {
    return status === "enviada" ? "Enviada" : status === "em-analise" ? "Em análise" : status === "aprovada" ? "Aprovada" : "Recusada";
  }

  function renderDemandas() {
    const filtered = DEMANDAS.filter((d) => demandasStatusFilter === "todas" || d.status === demandasStatusFilter);

    const chips = [
      { key: "todas", label: "Todas" },
      { key: "enviada", label: "Enviada" },
      { key: "em-analise", label: "Em análise" },
      { key: "aprovada", label: "Aprovada" },
      { key: "recusada", label: "Recusada" }
    ]
      .map((c) => `<button type="button" class="hist-chip${demandasStatusFilter === c.key ? " active" : ""}" data-demanda-filter="${c.key}">${c.label}</button>`)
      .join("");

    const rowsHtml = filtered
      .map(
        (d) => `
      <tr class="hist-row${selectedDemandaId === d.id ? " active" : ""}" data-demanda-edit="${d.id}">
        <td>${d.id}</td>
        <td>${d.trem}</td>
        <td>${d.patio}</td>
        <td>${d.trecho}</td>
        <td>${d.rows.length}</td>
        <td>${d.dataEnvio}</td>
        <td><span class="status-badge ${d.status}">${demandaStatusLabel(d.status)}</span></td>
        <td><div class="icon-btn" title="Editar">${ICON.edit}</div></td>
      </tr>`
      )
      .join("");

    return `
      <div class="page">
        <div class="header-row">
          <div class="page-title">Demandas</div>
          <div class="spacer"></div>
          <div class="search-box">${ICON.search}<span>Buscar demanda...</span></div>
          <button class="btn btn-primary" data-route="cadastrar-demanda">+ Nova demanda</button>
        </div>

        <div class="hist-filters-row">
          <div class="hist-chips">${chips}</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Trem</th><th>Pátio</th><th>Trecho</th><th>A retirar</th><th>Envio</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ============================= SCREEN: EDITAR DEMANDA ============================= */
  function renderEditarDemanda() {
    const d = DEMANDAS.find((x) => x.id === selectedDemandaId) || DEMANDAS[0];
    const rowsHtml = d.rows.map(renderVagaoRow).join("");

    return `
      <div class="page">
        <div class="header-row">
          <div class="page-title">Editar demanda</div>
          <div class="pill-tag">${d.tipo}</div>
          <span class="status-badge ${d.status}">${demandaStatusLabel(d.status)}</span>
          <div class="spacer"></div>
          <button class="btn btn-secondary" data-route="demandas">← Voltar para Demandas</button>
        </div>

        <div class="card">
          <div class="field-row">
            <div class="field"><div class="field-label">Trem</div><div class="field-input">${d.trem}</div></div>
            <div class="field"><div class="field-label">Pátio</div><div class="field-input">${d.patio}</div></div>
            <div class="field"><div class="field-label">Trecho</div><div class="field-input">${d.trecho}</div></div>
          </div>
        </div>

        <div class="card">
          <div class="section-header">
            <div class="section-title">Vagões a retirar</div>
            <div class="spacer"></div>
            <button class="btn btn-secondary">+ Adicionar vagão</button>
          </div>
          <table>
            <thead>
              <tr><th>Veículo</th><th>Série</th><th>Local</th><th>Situação</th><th>Lotação</th><th>Criticidade</th><th>Restrição Consolidada</th><th>Nota SAP</th><th></th></tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>

        <div class="card">
          <div class="section-title" style="margin-bottom:12px;">Vagões a incluir</div>
          <div class="field-label">Quantidade de vagões</div>
          <div class="field-input qty-input">${d.qtdIncluir}</div>
        </div>

        <div class="bottom-row">
          <div class="bottom-left"></div>
          <button class="btn btn-secondary" data-route="demandas">Cancelar</button>
          <button class="btn btn-primary" data-route="demandas">Salvar alterações</button>
        </div>
      </div>
    `;
  }

  /* ============================= SCREEN: FICHA OPERACIONAL ============================= */
  function renderFichaOperacional() {
    const trainList = TRAINS.map(
      (t) => `
      <div class="train-item${t.id === "J614" ? " active" : ""}">
        <div><div class="train-name">${t.id}</div><div class="train-os">OS ${t.os}</div></div>
        ${t.fichaBadge ? `<div class="train-badge">${t.fichaBadge}</div>` : ""}
      </div>`
    ).join("");

    const wagonRows = [
      { v: "GT46-0117", s: "DASH-9", o: "—", d: "—", m: "—", r: "Nenhuma", retirar: false },
      { v: "VG-88011", s: "VG", o: "EPW", d: "ETB", m: "Minério de ferro", r: "Nenhuma", retirar: false },
      { v: "VG-88034", s: "VG", o: "EPW", d: "ETB", m: "—", r: "Nenhuma", retirar: false },
      { v: "701521-3", s: "PCD", o: "EPW", d: "ETB", m: "—", r: "Nenhuma", retirar: false },
      { v: "701528-4", s: "PED", o: "EPW", d: "ETB", m: "—", r: "Freio danificado", retirar: true },
      { v: "701535-5", s: "PCD", o: "EPW", d: "ETB", m: "—", r: "Nenhuma", retirar: false },
      { v: "701542-6", s: "PED", o: "EPW", d: "ETB", m: "Carvão mineral", r: "Rodeiro com desgaste", retirar: true },
      { v: "701549-7", s: "PCD", o: "EPW", d: "ETB", m: "—", r: "Isolado", retirar: false },
      { v: "701556-8", s: "PED", o: "EPW", d: "ETB", m: "—", r: "Nenhuma", retirar: false },
      { v: "701563-9", s: "PED", o: "EPW", d: "ETB", m: "—", r: "Estrutura avariada", retirar: true },
      { v: "701570-1", s: "PED", o: "EPW", d: "EVN", m: "—", r: "Nenhuma", retirar: false },
      { v: "701577-2", s: "PCD", o: "EPW", d: "ETB", m: "Fertilizante", r: "Vazamento", retirar: true }
    ];
    const wagonRowsHtml = wagonRows
      .map(
        (r) => `
        <tr${r.retirar ? ' class="alert"' : ""}>
          <td>${r.v}</td><td>${r.s}</td><td>${r.o}</td><td>${r.d}</td><td>Bloco A</td><td>${r.m}</td><td>${r.r}</td>
          <td class="${r.retirar ? "sim" : "nao"}">${r.retirar ? "Sim" : "Não"}</td>
        </tr>`
      )
      .join("");

    return `
      <div class="split">
        <div class="trains-col">
          <div class="trains-col-title">Fichas do Trem</div>
          <div class="search-box">${ICON.search}<span>Buscar trem...</span></div>
          ${trainList}
        </div>
        <div class="page">
          <div class="header-row">
            <div class="page-title">Ficha Operacional</div>
            <div class="select-box">Pátio Hélio Torres ${ICON.chevronDown}</div>
            <div class="select-box">Hoje · 24/08/2026 ${ICON.chevronDown}</div>
            <div class="spacer"></div>
            <button class="btn btn-secondary">Confirmar Todas (9)</button>
            <button class="btn btn-primary" data-route="planejamento">Confirmar Ficha</button>
          </div>

          <div class="train-banner">
            <div>Trem J614 <span class="meta">· Pátio Hélio Torres · OS 9882/2026 · 24/08/2026</span></div>
            <div class="icon-btns">
              <div class="icon-btn">${ICON.magnify}</div>
              <div class="icon-btn">${ICON.edit}</div>
              <div class="icon-btn">${ICON.filter}</div>
              <div class="icon-btn">${ICON.list}</div>
            </div>
          </div>

          <div class="stats-row">
            <div class="stat-card"><div class="stat-num">87</div><div class="stat-label">Vagões</div></div>
            <div class="stat-card"><div class="stat-num">2</div><div class="stat-label">Locomotivas</div></div>
            <div class="stat-card"><div class="stat-num">5</div><div class="stat-label">Com Restrição</div></div>
            <div class="stat-card"><div class="stat-num">4</div><div class="stat-label">A Retirar</div></div>
            <div class="stat-card"><div class="stat-num">6</div><div class="stat-label">A Incluir</div></div>
          </div>

          <div class="table-wrap">
            <table>
              <thead><tr><th>Veículo</th><th>Série</th><th>Origem</th><th>Destino</th><th>Bloco</th><th>Mercadoria</th><th>Restrição Consolidada</th><th>A Retirar</th></tr></thead>
              <tbody>${wagonRowsHtml}</tbody>
            </table>
          </div>

          <div class="footer-row">
            <div class="footer-btn">Ficha do Trem</div>
            <div class="footer-btn">Vagões a Incluir (6)</div>
          </div>
        </div>
      </div>
    `;
  }

  /* ============================= SCREEN: PLANEJAMENTO ============================= */
  const SETUP_TRANSITIONS = [
    { forTrainId: "R045", from: "L Desvio", to: "L3", cars: ["VG-88091", "VG-70228"] },
    { forTrainId: "J602", from: "L4", to: "L Desvio", cars: ["GFE 0636455"] },
    { forTrainId: "R039", from: "L3", to: "L4", cars: ["HAE 0641847", "GFE 2212447"] },
    { forTrainId: "J588", from: "L Desvio", to: "L3", cars: ["TCD 7116667"] },
    { forTrainId: "J640", from: "L4", to: "L Desvio", cars: ["HFD 6436919", "GFD 6065384"] },
    { forTrainId: "J356", from: "L3", to: "L4", cars: ["GFE 0636030"] },
    { forTrainId: "R073", from: "L Desvio", to: "L3", cars: ["PEF 0562807", "GFE 0634875"] },
    { forTrainId: "R512", from: "L4", to: "L Desvio", cars: ["HFE 2540495"] }
  ];
  const FILLER_POOL = ["GFE 2214377", "HFD 6435459", "TCE 0606375", "HPD 6052207", "GFE 0642070", "HAE 0642282", "VG-88034", "GFD 6436919"];
  const SETUPS = SETUP_TRANSITIONS.map((s, i) => ({
    id: "setup-" + s.forTrainId,
    forTrainId: s.forTrainId,
    from: s.from,
    to: s.to,
    cars: s.cars,
    otherFrom: [FILLER_POOL[i % FILLER_POOL.length]],
    otherTo: [FILLER_POOL[(i + 4) % FILLER_POOL.length]],
    staticA: [FILLER_POOL[(i + 2) % FILLER_POOL.length]],
    staticB: [FILLER_POOL[(i + 6) % FILLER_POOL.length]],
    steps: [
      { num: 1, title: "REALOCAÇÃO", desc: `Vagões ${s.cars.join(", ")} são realocados da ${s.from} para a ${s.to}, liberando espaço para a chegada do trem ${s.forTrainId}.` },
      { num: 2, title: "LIBERAÇÃO", desc: `A ${s.from} é liberada e sinalizada como disponível para nova composição.` },
      { num: 3, title: "CONFIRMAÇÃO", desc: `CPT confirma o setup concluído e libera o plano de manobra do trem ${s.forTrainId}.` }
    ]
  }));
  function setupBeforeTrain(trainId) {
    return SETUPS.find((s) => s.forTrainId === trainId);
  }

  let selectedPlanItem = { type: "train", id: "J614" };
  let patioViewMode = "map";

  function renderPlanTrainListItem(t, isActive) {
    return `
      <div class="train-item${isActive ? " active" : ""}" data-plan-train="${t.id}">
        <div><div class="train-name">${t.id}</div><div class="train-os">OS ${t.os}</div></div>
        <div class="train-eta">${t.eta}</div>
      </div>`;
  }

  function renderPlanSetupListItem(s, isActive) {
    return `
      <div class="setup-item${isActive ? " active" : ""}" data-plan-setup="${s.id}">
        <div class="setup-title">Setup do Pátio</div>
        <div class="setup-sub">prepara chegada do ${s.forTrainId}</div>
      </div>
      <div class="setup-connector"></div>`;
  }

  function renderTrainDetail(train) {
    const d = train.detail;
    const removeChips = d.removeChips.map((c) => `<span class="car-chip remove">${c}</span>`).join("");
    const addChips = d.addChips.map((c) => `<span class="car-chip add">${c}</span>`).join("");
    const stepsHtml = d.steps
      .map(
        (s) => `
        <div class="step-card">
          <div class="step-head"><div class="step-num">${s.num}</div><div class="step-title">${s.title}</div></div>
          <div class="step-desc">${s.desc}</div>
        </div>`
      )
      .join("");

    return `
      <div class="detail-header">
        ${ICON.wagon}
        <div class="detail-title">${train.id}</div>
        <div class="spacer"></div>
        <button class="btn btn-secondary">${ICON.note}Ver Ficha</button>
        <button class="btn btn-primary" data-route="app-manobra">${ICON.compass}Gerar Plano e Enviar</button>
      </div>

      <div class="tabs">
        <div class="tab">Visão Geral</div>
        <div class="tab active">Manobras</div>
      </div>

      <div class="block-card">
        <div class="block-header">
          <div class="block-title">${d.blockTitle}</div>
          <div class="block-sub">${d.blockSub}</div>
          <div class="spacer"></div>
          ${ICON.chevronUpSm}
        </div>
        <div class="group-row">
          <span class="group-label">${d.groupLabel}</span>
          ${removeChips}
          ${addChips}
        </div>
        <div class="time-row">
          <span class="time-badge">${d.timeBadge}</span>
          <span class="time-label">${d.etapasLabel}</span>
          <div class="spacer"></div>
          ${ICON.chevronUpSm}
        </div>
      </div>

      <div class="seq-label">Sequência de manobra</div>
      ${stepsHtml}
    `;
  }

  function renderSetupDetail(setup) {
    const stepsHtml = setup.steps
      .map(
        (s) => `
        <div class="step-card">
          <div class="step-head"><div class="step-num muted">${s.num}</div><div class="step-title">${s.title}</div></div>
          <div class="step-desc">${s.desc}</div>
        </div>`
      )
      .join("");

    return `
      <div class="detail-header">
        <div class="detail-title">Setup do Pátio</div>
        <div class="spacer"></div>
      </div>
      <div class="col-sub" style="margin-bottom:16px;">Prepara a chegada do trem ${setup.forTrainId}</div>

      <div class="seq-label">Sequência de Setup</div>
      ${stepsHtml}
    `;
  }

  function renderTrainMapPanel(train) {
    return `
      <div class="map-title">Visão Topológica Atual</div>
      <div class="map-box">${renderTrackMap()}</div>
      <div class="map-footer-row"><span>Legenda</span><span>${ICON.chevronRight}</span></div>
      <div class="map-footer-row"><span>Restrições Ativas <span class="count">(5)</span></span><span>${ICON.chevronRight}</span></div>
    `;
  }

  function carRow(code) {
    return `<div class="car-row"><span class="tag">VG</span><span class="car-code">${code}</span></div>`;
  }

  const PATIO_LANES = ["L4", "L3", "L Desvio", "L Principal"];

  function renderPatioKanban(setup) {
    const uninvolved = PATIO_LANES.filter((l) => l !== setup.from && l !== setup.to);
    const staticCars = { [uninvolved[0]]: setup.staticA, [uninvolved[1]]: setup.staticB };

    function laneCars(lane, phase) {
      if (lane === setup.from) return phase === "before" ? [...setup.cars, ...setup.otherFrom] : [...setup.otherFrom];
      if (lane === setup.to) return phase === "before" ? [...setup.otherTo] : [...setup.otherTo, ...setup.cars];
      return staticCars[lane] || [];
    }

    const colsRow = (phase) => `
      <div class="patio-kanban-cols">
        ${PATIO_LANES.map((lane) => `<div class="col"><div class="col-title">${lane}</div>${laneCars(lane, phase).map(carRow).join("")}</div>`).join("")}
      </div>`;

    return `
      <div class="patio-kanban-stack">
        <div class="patio-kanban-section">
          <div class="map-split-label">Meu Pátio — Atual</div>
          ${colsRow("before")}
        </div>
        <div class="map-split-divider"></div>
        <div class="patio-kanban-section">
          <div class="map-split-label">Pátio — Após Setup</div>
          ${colsRow("after")}
        </div>
      </div>`;
  }

  function renderSetupMapPanel(setup) {
    const body =
      patioViewMode === "kanban"
        ? renderPatioKanban(setup)
        : `
      <div class="map-split">
        <div class="map-split-section">
          <div class="map-split-label">Meu Pátio — Atual</div>
          <div class="map-box-sm">${renderTrackMap()}</div>
        </div>
        <div class="map-split-divider"></div>
        <div class="map-split-section">
          <div class="map-split-label">Pátio — Após Setup</div>
          <div class="map-box-sm">${renderTrackMap()}</div>
        </div>
      </div>`;

    return `
      <div class="map-header-row">
        <div class="map-title">Visão do Pátio</div>
        <div class="spacer"></div>
        <div class="view-toggle">
          <button type="button" class="view-toggle-btn${patioViewMode === "map" ? " active" : ""}" data-patio-view="map" title="Mapa">${ICON.viewMap}</button>
          <button type="button" class="view-toggle-btn${patioViewMode === "kanban" ? " active" : ""}" data-patio-view="kanban" title="Kanban">${ICON.viewKanban}</button>
        </div>
      </div>
      ${body}
    `;
  }

  function renderPlanejamento() {
    const isSetup = selectedPlanItem.type === "setup";
    const activeSetup = isSetup ? SETUPS.find((s) => s.id === selectedPlanItem.id) : null;
    const activeTrain = !isSetup
      ? TRAINS.find((t) => t.id === selectedPlanItem.id) || TRAINS[0]
      : null;

    let listHtml = "";
    TRAINS.forEach((t, i) => {
      if (i > 0) {
        const setup = setupBeforeTrain(t.id);
        if (setup) listHtml += renderPlanSetupListItem(setup, isSetup && selectedPlanItem.id === setup.id);
      }
      listHtml += renderPlanTrainListItem(t, !isSetup && selectedPlanItem.id === t.id);
    });

    const detailHtml = isSetup ? renderSetupDetail(activeSetup) : renderTrainDetail(activeTrain);
    const mapHtml = isSetup ? renderSetupMapPanel(activeSetup) : renderTrainMapPanel(activeTrain);

    return `
      <div class="split${isSetup ? " split-setup" : ""}">
        <div class="trains-col">
          <div class="col-title">Planejamento</div>
          <div class="col-sub">Planos de Manobra<br>Fichas de 24/08/2026</div>
          <div class="search-box">${ICON.search}<span>Buscar trem...</span></div>
          <div class="train-th"><span>Trem</span><span>ETA</span></div>
          ${listHtml}
        </div>

        <div class="detail">${detailHtml}</div>

        <div class="map-col">${mapHtml}</div>
      </div>
    `;
  }

  /* ============================= SCREEN: MEU PÁTIO ============================= */
  function renderMeuPatio() {
    const col = (title, blocks) => `
      <div class="col">
        <div class="col-title">${title}</div>
        ${blocks
          .map(
            (b) => `
          <div class="block-label">${b.label}</div>
          ${b.cars
            .map(
              (c) => `<div class="car-row"><span class="tag">${c.tag}</span><span class="car-code">${c.code}</span>${c.pill ? `<span class="pill ${c.pill.cls}">${c.pill.text}</span>` : ""}</div>`
            )
            .join("")}
        `
          )
          .join("")}
      </div>`;

    const L4 = col("L4", [
      { label: "Bloco A", cars: [
        { tag: "LOC", code: "GT46 8185" }, { tag: "VG", code: "GFE 2214377" }, { tag: "VG", code: "GFE 7087641" },
        { tag: "VG", code: "GFD 6065384" }, { tag: "VG", code: "GFD 6436919" }
      ]},
      { label: "Bloco B", cars: [
        { tag: "VG", code: "HAD 6080430", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "HAD 6190758", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "HAD 6081118", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "HFE 2540495", pill: { cls: "avariado", text: "AVARIADO" } }
      ]}
    ]);

    const L3 = col("L3", [
      { label: "Bloco A", cars: [
        { tag: "LOC", code: "U20 2688" }, { tag: "VG", code: "GFE 2206579" }, { tag: "VG", code: "GFE 2207435" },
        { tag: "VG", code: "GFE 0635073" }, { tag: "VG", code: "HAE 0641561" }, { tag: "VG", code: "HAE 0642282" },
        { tag: "VG", code: "GFE 0642070" }, { tag: "VG", code: "GFE 0636030" }, { tag: "VG", code: "HFD 2464098" }
      ]},
      { label: "Bloco B", cars: [
        { tag: "VG", code: "GFE 2210371", pill: { cls: "reserva", text: "RESERVA" } },
        { tag: "VG", code: "GFE 0636455", pill: { cls: "reserva", text: "RESERVA" } },
        { tag: "VG", code: "GFE 2207656", pill: { cls: "reserva", text: "RESERVA" } },
        { tag: "VG", code: "GFE 0437524", pill: { cls: "reserva", text: "RESERVA" } },
        { tag: "VG", code: "GFE 0635723", pill: { cls: "reserva", text: "RESERVA" } }
      ]}
    ]);

    const LDesvio = col("L Desvio", [
      { label: "Bloco A", cars: [
        { tag: "LOC", code: "G46 8193" }, { tag: "VG", code: "TCE 0606375" }, { tag: "VG", code: "PEC 6074723" },
        { tag: "VG", code: "HPD 6182674" }, { tag: "VG", code: "PEF 0562807" }, { tag: "VG", code: "TCD 7116667" },
        { tag: "VG", code: "HAE 0640808", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "GFE 0636193" }, { tag: "VG", code: "GFE 0634875" }
      ]},
      { label: "Bloco B", cars: [
        { tag: "VG", code: "HAE 0641847" }, { tag: "VG", code: "HAE 0642118" }, { tag: "VG", code: "GFE 0636711" },
        { tag: "VG", code: "GFE 2212447" }, { tag: "VG", code: "GFE 2219778" }
      ]}
    ]);

    const LPrincipal = col("L Principal", [
      { label: "Bloco A", cars: [
        { tag: "LOC", code: "U20 3904" }, { tag: "VG", code: "HFE 2533707" }, { tag: "VG", code: "HFE 2533693" },
        { tag: "VG", code: "HPD 6052207" }, { tag: "VG", code: "HPD 6409130" }, { tag: "VG", code: "HPD 6048145" }
      ]},
      { label: "Bloco B", cars: [
        { tag: "VG", code: "HFE 2541360", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "HFE 2541351", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "HFE 2540509", pill: { cls: "avariado", text: "AVARIADO" } },
        { tag: "VG", code: "HFE 7053576" }, { tag: "VG", code: "TSC 6343261" }, { tag: "VG", code: "HFE 6077382" },
        { tag: "VG", code: "HFD 6447473" }, { tag: "VG", code: "HFD 6435459" }
      ]}
    ]);

    return `
      <div class="page">
        <div class="header-row">
          <div class="page-title">Meu pátio</div>
          <div class="select-box">EHT ${ICON.chevronDown}</div>
          <div class="spacer"></div>
          <button class="btn btn-primary">+ Adicionar vagão</button>
          <div class="icon-btn">···</div>
        </div>
        <div class="columns">${L4}${L3}${LDesvio}${LPrincipal}</div>
      </div>
    `;
  }

  /* ============================= SCREEN: HISTÓRICO ============================= */
  const HISTORICO = [
    {
      id: "h1", type: "manobra", label: "J614", block: "Bloco A · L Desvio", date: "24/08/2026", start: "08:12", end: "08:28",
      plannedMin: 16, actualMin: 16, status: "concluida", responsible: "Carlos Eduardo",
      steps: [
        { num: 1, title: "PARADA", start: "08:12", end: "08:15", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "08:15", end: "08:22", status: "no-prazo" },
        { num: 3, title: "TRAÇÃO", start: "08:22", end: "08:28", status: "no-prazo" }
      ]
    },
    {
      id: "h2", type: "setup", label: "Setup → R045", block: "L Desvio → L3", date: "24/08/2026", start: "09:40", end: "10:02",
      plannedMin: 18, actualMin: 22, status: "atraso", responsible: "Ana Beatriz",
      from: "L Desvio", to: "L3", cars: ["VG-88091", "VG-70228"],
      steps: [
        { num: 1, title: "REALOCAÇÃO", start: "09:40", end: "09:52", status: "no-prazo" },
        { num: 2, title: "LIBERAÇÃO", start: "09:52", end: "10:00", status: "atrasado", reason: "Troca de maquinista" },
        { num: 3, title: "CONFIRMAÇÃO", start: "10:00", end: "10:02", status: "no-prazo" }
      ]
    },
    {
      id: "h3", type: "manobra", label: "R045", block: "Bloco B · L4", date: "24/08/2026", start: "10:05", end: "10:14",
      plannedMin: 9, actualMin: 9, status: "concluida", responsible: "Carlos Eduardo",
      steps: [
        { num: 1, title: "PARADA", start: "10:05", end: "10:07", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "10:07", end: "10:11", status: "no-prazo" },
        { num: 3, title: "TRAÇÃO", start: "10:11", end: "10:14", status: "no-prazo" }
      ]
    },
    {
      id: "h4", type: "manobra", label: "J602", block: "Bloco A · L3", date: "24/08/2026", start: "11:20", end: "11:26",
      plannedMin: 21, actualMin: 6, status: "cancelada", responsible: "Marcos Silva",
      steps: [
        { num: 1, title: "PARADA", start: "11:20", end: "11:23", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "11:23", end: "11:26", status: "atrasado", reason: "Bloqueio de via" },
        { num: 3, title: "TRAÇÃO", status: "nao-executado" }
      ]
    },
    {
      id: "h5", type: "setup", label: "Setup → J602", block: "L4 → L Desvio", date: "23/08/2026", start: "15:10", end: "15:31",
      plannedMin: 20, actualMin: 21, status: "concluida", responsible: "Ana Beatriz",
      from: "L4", to: "L Desvio", cars: ["GFE 0636455"],
      steps: [
        { num: 1, title: "REALOCAÇÃO", start: "15:10", end: "15:19", status: "no-prazo" },
        { num: 2, title: "LIBERAÇÃO", start: "15:19", end: "15:26", status: "no-prazo" },
        { num: 3, title: "CONFIRMAÇÃO", start: "15:26", end: "15:31", status: "no-prazo" }
      ]
    },
    {
      id: "h6", type: "manobra", label: "R039", block: "Bloco B · L Desvio", date: "23/08/2026", start: "16:00", end: "16:22",
      plannedMin: 12, actualMin: 22, status: "atraso", responsible: "Carlos Eduardo",
      steps: [
        { num: 1, title: "PARADA", start: "16:00", end: "16:04", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "16:04", end: "16:15", status: "atrasado", reason: "Falha de integração Unilog" },
        { num: 3, title: "TRAÇÃO", start: "16:15", end: "16:22", status: "no-prazo" }
      ]
    },
    {
      id: "h7", type: "manobra", label: "J588", block: "Bloco A · L4", date: "23/08/2026", start: "17:05", end: "17:16",
      plannedMin: 11, actualMin: 11, status: "concluida", responsible: "Marcos Silva",
      steps: [
        { num: 1, title: "PARADA", start: "17:05", end: "17:08", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "17:08", end: "17:12", status: "no-prazo" },
        { num: 3, title: "TRAÇÃO", start: "17:12", end: "17:16", status: "no-prazo" }
      ]
    },
    {
      id: "h8", type: "manobra", label: "J640", block: "Bloco B · L3", date: "22/08/2026", start: "09:30", end: "09:48",
      plannedMin: 18, actualMin: 18, status: "concluida", responsible: "Ana Beatriz",
      steps: [
        { num: 1, title: "PARADA", start: "09:30", end: "09:35", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "09:35", end: "09:42", status: "no-prazo" },
        { num: 3, title: "TRAÇÃO", start: "09:42", end: "09:48", status: "no-prazo" }
      ]
    },
    {
      id: "h9", type: "setup", label: "Setup → R073", block: "L Desvio → L3", date: "22/08/2026", start: "13:00", end: "13:14",
      plannedMin: 14, actualMin: 14, status: "concluida", responsible: "Carlos Eduardo",
      from: "L Desvio", to: "L3", cars: ["PEF 0562807", "GFE 0634875"],
      steps: [
        { num: 1, title: "REALOCAÇÃO", start: "13:00", end: "13:06", status: "no-prazo" },
        { num: 2, title: "LIBERAÇÃO", start: "13:06", end: "13:10", status: "no-prazo" },
        { num: 3, title: "CONFIRMAÇÃO", start: "13:10", end: "13:14", status: "no-prazo" }
      ]
    },
    {
      id: "h10", type: "manobra", label: "R512", block: "Bloco A · L3", date: "22/08/2026", start: "14:22", end: "14:41",
      plannedMin: 14, actualMin: 19, status: "atraso", responsible: "Marcos Silva",
      steps: [
        { num: 1, title: "PARADA", start: "14:22", end: "14:25", status: "no-prazo" },
        { num: 2, title: "CORTE", start: "14:25", end: "14:35", status: "atrasado", reason: "Reparo de vagão" },
        { num: 3, title: "TRAÇÃO", start: "14:35", end: "14:41", status: "no-prazo" }
      ]
    }
  ];

  let historicoStatusFilter = "todos";
  let historicoSelectedId = null;

  function historicoStatusLabel(status) {
    return status === "concluida" ? "Concluída" : status === "atraso" ? "Em atraso" : "Cancelada";
  }
  function historicoDurationClass(status) {
    return status === "cancelada" ? "danger" : status === "atraso" ? "warn" : "ok";
  }

  function renderHistStep(s) {
    const badge =
      s.status === "nao-executado"
        ? `<span class="hist-step-badge muted">Não executado</span>`
        : s.status === "atrasado"
        ? `<span class="hist-step-badge warn">Atrasado</span>`
        : `<span class="hist-step-badge ok">No prazo</span>`;
    const timeLine = s.status === "nao-executado" ? "" : `<div class="step-desc">${s.start} – ${s.end}</div>`;
    const reasonLine = s.reason ? `<div class="hist-step-reason">Motivo: ${s.reason}</div>` : "";
    return `
      <div class="step-card">
        <div class="step-head">
          <div class="step-num${s.status === "nao-executado" ? " muted" : ""}">${s.num}</div>
          <div class="step-title">${s.title}</div>
          <div class="spacer"></div>
          ${badge}
        </div>
        ${timeLine}
        ${reasonLine}
      </div>`;
  }

  function renderHistDrawer(entry) {
    const stepsHtml = entry.steps.map(renderHistStep).join("");
    const kanbanHtml =
      entry.type === "setup"
        ? `
      <div class="hist-kanban">
        <div class="col"><div class="col-title">Origem — ${entry.from}</div>${entry.cars.map(carRow).join("")}</div>
        <div class="hist-kanban-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M14 6l6 6-6 6" stroke="#6A6A6A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="col"><div class="col-title">Destino — ${entry.to}</div>${entry.cars.map(carRow).join("")}</div>
      </div>`
        : "";
    const footerHtml =
      entry.type === "manobra"
        ? `<div class="hist-drawer-footer"><button class="btn btn-secondary" data-route="ficha-operacional">Ver ficha completa</button></div>`
        : "";

    return `
      <div class="hist-backdrop" data-hist-close></div>
      <div class="hist-drawer">
        <div class="hist-drawer-header">
          <div>
            <div class="hist-drawer-title">${entry.label}</div>
            <span class="hist-status-badge ${entry.status}">${historicoStatusLabel(entry.status)}</span>
          </div>
          <div class="icon-btn" data-hist-close>${ICON.navPlaceholder}</div>
        </div>
        <div class="hist-drawer-body">
          <div class="hist-info-grid">
            <div><div class="field-label">Bloco/Via</div><div>${entry.block}</div></div>
            <div><div class="field-label">Pátio</div><div>Pátio Hélio Torres</div></div>
            <div><div class="field-label">Início</div><div>${entry.date} · ${entry.start}</div></div>
            <div><div class="field-label">Fim</div><div>${entry.date} · ${entry.end}</div></div>
            <div><div class="field-label">Duração planejada</div><div>${entry.plannedMin} min</div></div>
            <div><div class="field-label">Duração real</div><div class="hist-actual ${historicoDurationClass(entry.status)}">${entry.actualMin} min</div></div>
            <div><div class="field-label">Responsável</div><div>${entry.responsible}</div></div>
          </div>
          ${kanbanHtml}
          <div class="seq-label">Sequência Executada</div>
          ${stepsHtml}
        </div>
        ${footerHtml}
      </div>
    `;
  }

  function renderHistorico() {
    const filtered = HISTORICO.filter((h) => historicoStatusFilter === "todos" || h.status === historicoStatusFilter);
    const manobraCount = filtered.filter((h) => h.type === "manobra").length;
    const setupCount = filtered.filter((h) => h.type === "setup").length;
    const noPrazoCount = filtered.filter((h) => h.status === "concluida").length;
    const atrasadaCount = filtered.filter((h) => h.status === "atraso").length;
    const pctNoPrazo = filtered.length ? Math.round((noPrazoCount / filtered.length) * 100) : 0;

    const chips = [
      { key: "todos", label: "Todos" },
      { key: "concluida", label: "Concluída" },
      { key: "atraso", label: "Em atraso" },
      { key: "cancelada", label: "Cancelada" }
    ]
      .map((c) => `<button type="button" class="hist-chip${historicoStatusFilter === c.key ? " active" : ""}" data-hist-filter="${c.key}">${c.label}</button>`)
      .join("");

    const rowsHtml = filtered
      .map(
        (h) => `
      <tr class="hist-row${historicoSelectedId === h.id ? " active" : ""}" data-hist-row="${h.id}">
        <td><span class="hist-type-badge ${h.type}">${h.type === "manobra" ? "Manobra" : "Setup"}</span></td>
        <td>${h.label}</td>
        <td>${h.block}</td>
        <td>${h.date} · ${h.start}</td>
        <td>${h.plannedMin} min · <span class="hist-actual ${historicoDurationClass(h.status)}">${h.actualMin} min</span></td>
        <td><span class="hist-status-badge ${h.status}">${historicoStatusLabel(h.status)}</span></td>
        <td>${h.responsible}</td>
      </tr>`
      )
      .join("");

    const selectedEntry = historicoSelectedId ? HISTORICO.find((h) => h.id === historicoSelectedId) : null;

    return `
      <div class="page">
        <div class="header-row">
          <div class="page-title">Histórico de Manobras</div>
        </div>

        <div class="hist-filters-row">
          <div class="select-box">Pátio Hélio Torres ${ICON.chevronDown}</div>
          <div class="select-box">Últimos 7 dias ${ICON.chevronDown}</div>
          <div class="search-box">${ICON.search}<span>Buscar trem...</span></div>
          <div class="spacer"></div>
          <div class="hist-chips">${chips}</div>
        </div>

        <div class="hist-summary-row">
          <span><strong>${manobraCount}</strong> manobras</span>
          <span><strong>${setupCount}</strong> setups</span>
          <span><strong>${pctNoPrazo}%</strong> no prazo</span>
          <span><strong>${atrasadaCount}</strong> atrasadas</span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Tipo</th><th>Trem / Identificação</th><th>Bloco/Via</th><th>Início</th><th>Duração (plan · real)</th><th>Status</th><th>Responsável</th></tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
      ${selectedEntry ? renderHistDrawer(selectedEntry) : ""}
    `;
  }

  /* ============================= SCREEN: VISÃO ESTRATÉGICA ============================= */
  function renderVisaoEstrategica() {
    return `
      <div class="page">
        <div class="header-row">
          <div class="page-title">Visão Estratégica</div>
          <div class="spacer"></div>
          <div class="select-box">Todos os pátios ${ICON.chevronDown}</div>
          <div class="select-box">Últimos 30 dias ${ICON.chevronDown}</div>
        </div>

        <div class="kpi-row">
          <div class="kpi-card"><div class="kpi-label">Tempo médio real vs. planejado</div><div class="kpi-value">+22%</div></div>
          <div class="kpi-card"><div class="kpi-label">Execução conforme o plano</div><div class="kpi-value">78%</div></div>
          <div class="kpi-card"><div class="kpi-label">Manobras no período</div><div class="kpi-value">146</div></div>
          <div class="kpi-card"><div class="kpi-label">Principal causa de atraso</div><div class="kpi-value" style="font-size:15px;">Troca de maquinista</div></div>
        </div>

        <div class="charts-grid">
          <div class="chart-card">
            <div class="chart-title">Tendência do tempo médio de manobra</div>
            <div class="chart-sub">Últimas 6 semanas</div>
            <div class="chart-body">
              <svg width="100%" height="100%" viewBox="0 0 300 90" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="300" y2="0" stroke="#F2F2F2"/>
                <line x1="0" y1="45" x2="300" y2="45" stroke="#F2F2F2"/>
                <line x1="0" y1="89" x2="300" y2="89" stroke="#F2F2F2"/>
                <polyline points="10,35 60,32 110,15 160,42 210,30 260,55" fill="none" stroke="#6A6A6A" stroke-width="1.6"/>
                <circle cx="10" cy="35" r="2.5" fill="#6A6A6A"/><circle cx="60" cy="32" r="2.5" fill="#6A6A6A"/>
                <circle cx="110" cy="15" r="2.5" fill="#6A6A6A"/><circle cx="160" cy="42" r="2.5" fill="#6A6A6A"/>
                <circle cx="210" cy="30" r="2.5" fill="#6A6A6A"/><circle cx="260" cy="55" r="2.5" fill="#6A6A6A"/>
                <text x="10" y="88" font-size="7" fill="#9A9A9A">S1</text><text x="60" y="88" font-size="7" fill="#9A9A9A">S2</text>
                <text x="108" y="88" font-size="7" fill="#9A9A9A">S3</text><text x="158" y="88" font-size="7" fill="#9A9A9A">S4</text>
                <text x="208" y="88" font-size="7" fill="#9A9A9A">S5</text><text x="258" y="88" font-size="7" fill="#9A9A9A">S6</text>
              </svg>
            </div>
            <div class="legend-row"><span class="legend-swatch" style="background:#6A6A6A"></span>Tempo médio (min)</div>
          </div>

          <div class="chart-card">
            <div class="chart-title">Composição do tempo total</div>
            <div class="chart-sub">Manobra do trem vs. setup do pátio</div>
            <div class="chart-body">
              <div class="donut-wrap">
                <svg width="96" height="96" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#F2F2F2" stroke-width="6"></circle>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#6A6A6A" stroke-width="6" stroke-dasharray="65 35" stroke-dashoffset="25"></circle>
                  <text x="21" y="20" text-anchor="middle" font-size="6.5" font-weight="700" fill="#6A6A6A">65%</text>
                  <text x="21" y="27" text-anchor="middle" font-size="4.5" fill="#9A9A9A">MANOBRA</text>
                </svg>
                <div class="donut-labels">
                  <div class="legend-row"><span class="legend-swatch" style="background:#6A6A6A"></span>Manobra do trem — 65%</div>
                  <div class="legend-row"><span class="legend-swatch" style="background:#D9D9D9"></span>Setup do pátio — 35%</div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-title">Tempo planejado x executado por pátio</div>
            <div class="chart-sub">Média em minutos</div>
            <div class="chart-body">
              <div class="bars-x">
                <div class="bar-group"><div class="bar-pair">
                  <div class="bar planned" style="height:73px;"><span class="bar-val">40</span></div>
                  <div class="bar executed" style="height:89px;"><span class="bar-val">49</span></div>
                </div><div class="bar-group-label">EHT</div></div>
                <div class="bar-group"><div class="bar-pair">
                  <div class="bar planned" style="height:76px;"><span class="bar-val">42</span></div>
                  <div class="bar executed" style="height:80px;"><span class="bar-val">44</span></div>
                </div><div class="bar-group-label">Paulínia</div></div>
                <div class="bar-group"><div class="bar-pair">
                  <div class="bar planned" style="height:69px;"><span class="bar-val">38</span></div>
                  <div class="bar executed" style="height:83px;"><span class="bar-val">46</span></div>
                </div><div class="bar-group-label">Divinópolis</div></div>
              </div>
            </div>
            <div class="legend-row"><span class="legend-swatch" style="background:#D9D9D9"></span>Planejado &nbsp;<span class="legend-swatch" style="background:#6A6A6A"></span>Executado</div>
          </div>

          <div class="chart-card">
            <div class="chart-title">Causas de atraso mais frequentes</div>
            <div class="chart-sub">Nº de ocorrências no período</div>
            <div class="chart-body">
              <div class="hbars">
                <div class="hbar-row"><span class="hbar-name">Troca de maquinista</span><div class="hbar-track"><div class="hbar-fill" style="width:100%"></div></div><span class="hbar-count">38</span></div>
                <div class="hbar-row"><span class="hbar-name">Bloqueio de via</span><div class="hbar-track"><div class="hbar-fill" style="width:63%"></div></div><span class="hbar-count">24</span></div>
                <div class="hbar-row"><span class="hbar-name">Falha de integração Unilog</span><div class="hbar-track"><div class="hbar-fill" style="width:39%"></div></div><span class="hbar-count">15</span></div>
                <div class="hbar-row"><span class="hbar-name">Reparo de vagão</span><div class="hbar-track"><div class="hbar-fill" style="width:24%"></div></div><span class="hbar-count">9</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ============================= SCREEN: APP MANOBRA (fullscreen) ============================= */
  function renderAppManobra() {
    return `
      <div class="manobra-shell">
        <div class="manobra-side">
          <div class="app-title" data-route="__back__"><span>Manobra X</span></div>
          <div class="status-row"><span class="dot"></span><span>Em execução</span></div>
          <div class="sub-meta">Trem J105 · Bloco A · Etapa 3 de 6</div>
          <div class="timer">02:14</div>
          <div class="timer-label">tempo nesta etapa</div>

          <div class="steps">
            <div class="step active">
              <div class="step-bullet"></div>
              <div>
                <div class="step-title-sm">3 · RETIRADA</div>
                <div class="step-desc-sm">Avançar até o travessão T3</div>
                <div class="step-meta-sm">40 m restantes</div>
              </div>
            </div>
            <div class="step inactive"><div class="step-bullet"></div><div class="step-title-sm">4 · Troca de maquinista</div></div>
            <div class="step inactive"><div class="step-bullet"></div><div class="step-title-sm">5 · Inclusão</div></div>
          </div>

          <button class="manobra-btn manobra-btn-primary">${ICON.flag}Concluir etapa</button>
          <button class="manobra-btn manobra-btn-secondary">${ICON.note}Registrar observação</button>
        </div>

        <div class="manobra-main">
          <div class="manobra-top-row">
            <div class="manobra-badge-circle"><div class="num">40m</div><div class="lbl">restantes</div></div>
            <div class="manobra-top-title">AVANCE ATÉ O TRAVESSÃO T3</div>
          </div>

          <div class="track-area">
            <svg viewBox="0 0 560 390" preserveAspectRatio="xMidYMid meet">
              <polygon points="267,40 293,40 352,330 208,330" fill="#EDEDED"/>
              <line x1="207.3" y1="83.5" x2="352.7" y2="83.5" stroke="#E5E5E5" stroke-width="1"/>
              <line x1="173.8" y1="132.8" x2="386.2" y2="132.8" stroke="#E5E5E5" stroke-width="1"/>
              <line x1="134.5" y1="190.8" x2="425.5" y2="190.8" stroke="#E5E5E5" stroke-width="1"/>
              <line x1="91.2" y1="254.6" x2="468.8" y2="254.6" stroke="#E5E5E5" stroke-width="1"/>
              <line x1="45.9" y1="321.3" x2="514.1" y2="321.3" stroke="#E5E5E5" stroke-width="1"/>
              <line x1="236.8" y1="40" x2="40" y2="330" stroke="#1A1A1A" stroke-width="1.3"/>
              <line x1="262.7" y1="40" x2="184" y2="330" stroke="#1A1A1A" stroke-width="1.3"/>
              <line x1="267" y1="40" x2="208" y2="330" stroke="#1A1A1A" stroke-width="1.3"/>
              <line x1="293" y1="40" x2="352" y2="330" stroke="#1A1A1A" stroke-width="1.3"/>
              <line x1="297.3" y1="40" x2="376" y2="330" stroke="#1A1A1A" stroke-width="1.3"/>
              <line x1="323.2" y1="40" x2="520" y2="330" stroke="#1A1A1A" stroke-width="1.3"/>
              <polygon points="280,127 296,147 287,147 280,138 273,147 264,147" fill="#ABABAB"/>
              <polygon points="280,185 296,205 287,205 280,196 273,205 264,205" fill="#ABABAB"/>
              <polygon points="280,243 296,263 287,263 280,254 273,263 264,263" fill="#ABABAB"/>
              <g transform="translate(280,38) scale(0.0234375) translate(-415,-1280)">
                <g transform="translate(0,1280) scale(0.1,-0.1)" fill="#1A1A1A" stroke="none">
                  <path d="M3855 12789 c-555 -44 -1043 -176 -1530 -414 -1457 -712 -2370 -2223 -2322 -3840 19 -605 152 -1155 406 -1680 109 -225 183 -353 331 -575 65 -96 856 -1369 1760 -2827 903 -1459 1646 -2653 1650 -2653 4 0 747 1194 1650 2652 904 1459 1695 2732 1760 2828 148 222 222 350 331 575 421 869 520 1869 279 2821 -244 958 -822 1795 -1640 2371 -696 491 -1551 759 -2404 752 -94 -1 -216 -5 -271 -10z m635 -1764 c440 -80 813 -271 1120 -575 769 -761 825 -1980 130 -2812 -335 -402 -817 -663 -1344 -728 -114 -14 -378 -14 -492 0 -853 105 -1550 715 -1764 1544 -141 545 -52 1136 243 1613 330 531 862 876 1497 968 130 19 481 13 610 -10z"/>
                </g>
              </g>
              <circle cx="280" cy="296" r="24" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2.2"/>
              <polygon points="280,281 293,307 280,300 267,307" fill="#1A1A1A"/>
              <text x="112" y="362" text-anchor="middle" font-size="14" font-weight="700" fill="#9A9A9A" font-family="Arial">L4</text>
              <rect x="250" y="345" width="60" height="26" rx="5" fill="#FFFFFF" stroke="#9A9A9A" stroke-width="1.3"/>
              <text x="280" y="362" text-anchor="middle" font-size="14" font-weight="700" fill="#1A1A1A" font-family="Arial">L3</text>
              <text x="448" y="362" text-anchor="middle" font-size="14" font-weight="700" fill="#9A9A9A" font-family="Arial">L Desvio</text>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  /* ============================= ROUTER ============================= */
  const SHELL_SCREENS = {
    "cadastrar-demanda": renderCadastrarDemanda,
    "demandas": renderDemandas,
    "editar-demanda": renderEditarDemanda,
    "ficha-operacional": renderFichaOperacional,
    "planejamento": renderPlanejamento,
    "meu-patio": renderMeuPatio,
    "historico": renderHistorico,
    "visao-estrategica": renderVisaoEstrategica
  };
  const DEFAULT_ROUTE = PERSONAS.cpt.defaultRoute;
  let lastSidebarRoute = DEFAULT_ROUTE;

  function currentRoute() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (hash === "app-manobra" || SHELL_SCREENS[hash]) return hash;
    return DEFAULT_ROUTE;
  }

  function render() {
    const route = currentRoute();
    const root = document.getElementById("root");
    if (route === "app-manobra") {
      root.innerHTML = renderAppManobra();
    } else {
      lastSidebarRoute = route;
      root.innerHTML = renderShell(route, SHELL_SCREENS[route]());
    }
    window.scrollTo(0, 0);
  }

  function navigate(routeId) {
    if (location.hash === "#/" + routeId) { render(); return; }
    location.hash = "#/" + routeId;
  }

  document.addEventListener("click", (e) => {
    const toggleEl = e.target.closest("[data-persona-toggle]");
    if (toggleEl) {
      personaMenuOpen = !personaMenuOpen;
      render();
      return;
    }
    const personaEl = e.target.closest("[data-persona]");
    if (personaEl) {
      personaMenuOpen = false;
      const key = personaEl.getAttribute("data-persona");
      navigate(key === "maquinista" ? "app-manobra" : PERSONAS[key].defaultRoute);
      return;
    }
    const routeEl = e.target.closest("[data-route]");
    if (routeEl) {
      e.preventDefault();
      personaMenuOpen = false;
      const target = routeEl.getAttribute("data-route");
      navigate(target === "__back__" ? lastSidebarRoute : target);
      return;
    }
    const planTrainEl = e.target.closest("[data-plan-train]");
    if (planTrainEl) {
      selectedPlanItem = { type: "train", id: planTrainEl.getAttribute("data-plan-train") };
      render();
      return;
    }
    const planSetupEl = e.target.closest("[data-plan-setup]");
    if (planSetupEl) {
      selectedPlanItem = { type: "setup", id: planSetupEl.getAttribute("data-plan-setup") };
      render();
      return;
    }
    const patioViewEl = e.target.closest("[data-patio-view]");
    if (patioViewEl) {
      patioViewMode = patioViewEl.getAttribute("data-patio-view");
      render();
      return;
    }
    const histCloseEl = e.target.closest("[data-hist-close]");
    if (histCloseEl) {
      historicoSelectedId = null;
      render();
      return;
    }
    const histFilterEl = e.target.closest("[data-hist-filter]");
    if (histFilterEl) {
      historicoStatusFilter = histFilterEl.getAttribute("data-hist-filter");
      render();
      return;
    }
    const histRowEl = e.target.closest("[data-hist-row]");
    if (histRowEl) {
      historicoSelectedId = histRowEl.getAttribute("data-hist-row");
      render();
      return;
    }
    const demandaEditEl = e.target.closest("[data-demanda-edit]");
    if (demandaEditEl) {
      selectedDemandaId = demandaEditEl.getAttribute("data-demanda-edit");
      navigate("editar-demanda");
      return;
    }
    const demandaFilterEl = e.target.closest("[data-demanda-filter]");
    if (demandaFilterEl) {
      demandasStatusFilter = demandaFilterEl.getAttribute("data-demanda-filter");
      render();
      return;
    }
    if (personaMenuOpen && !e.target.closest(".persona-widget")) {
      personaMenuOpen = false;
      render();
    }
  });

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", render);
})();
