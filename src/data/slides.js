export const slides = [
  {
    type: 'macro',
    title: 'Visão geral da jornada',
    phases: [
      {
        phaseLabel: 'Fase 1 — Programação e Planejamento',
        name: 'Fase 1',
        description: 'Programação e planejamento',
        summary: 'PPC informa a demanda → CPT confirma a ficha e gera o plano → CPT valida e envia',
        status: 'Em andamento',
      },
      {
        phaseLabel: 'Fase 2 — Execução em Campo',
        name: 'Fase 2',
        description: 'Execução em campo',
        summary: 'Maquinista recebe o plano → executa a manobra → pátio é atualizado',
        status: 'Em andamento',
      },
      {
        phaseLabel: 'Fase 3 — Setup do Pátio',
        name: 'Fase 3',
        description: 'Setup do pátio (mini-ciclo paralelo)',
        summary: 'Sistema sugere um setup e CPT confirma → maquinista executa',
        status: 'Não iniciado',
      },
      {
        phaseLabel: 'Fase 4 — Fechamento e Indicadores',
        name: 'Fase 4',
        description: 'Fechamento e indicadores',
        summary: 'CPT consulta os históricos → gestão acompanha os indicadores',
        status: 'Não iniciado',
      },
    ],
  },

  {
    type: 'fase',
    color: 'human',
    phaseLabel: 'Fase 1 — Programação e Planejamento',
    phaseNumber: 1,
    phaseName: 'Programação e Planejamento',
    steps: [
      {
        type: 'human',
        title: 'PPC cadastra a demanda',
        wireframe: {
          image: '/cadastrar-demanda-ppc.png',
          imageAlt: 'Tela Nova Demanda — PPC Execução',
          v2Image: '/minhas-demandas.png',
          v2ImageAlt: 'Tela Minhas Demandas — PPC Execução',
          persona: 'PPC Execução',
          dispositivo: 'PC',
          resolve:
            'Substitui o envio de demanda por e-mail sem padrão — a entrada estruturada já alimenta o Plano de Manobra direto.',
          legacyImage: '/refdemanda.png',
          legacyCaption: 'Demanda enviada por e-mail, sem padrão nem histórico registrado.',
          versions: [
            { version: 'V1', description: 'Cadastro estruturado da demanda, direto no sistema.', available: false },
            { version: 'V2', description: '"Minhas Demandas": PPC acessa, edita e cancela envios.', available: false },
          ],
        },
      },
      {
        type: 'green',
        title: 'Sistema junta os dados',
        tooltip: 'Sistema junta a demanda do PPC com a ficha do Unilog.',
      },
      {
        type: 'human',
        title: 'CPT confirma a Ficha Operacional',
        wireframe: {
          image: '/ficha-operacional-v1.png',
          imageAlt: 'Tela Ficha Operacional — versão V1',
          hideBadge: true,
          persona: 'CPT',
          dispositivo: 'PC',
          resolve:
            'Substitui a ficha impressa marcada à mão — reúne automaticamente a ficha do Unilog e a demanda do PPC.',
          legacyImage: '/unilog.png',
          legacyCaption: 'Consulta manual de vagões no Unilog, tela por tela.',
          versions: [
            { version: 'V1', description: 'Ficha Operacional - Upload manual do arquivo, sem integrações.', available: true },
            { version: 'V2', description: 'Edição da ficha do trem após ser gerada.', available: false },
            { version: 'V3', description: 'Integração com Unilog e Demandas do PPC.', available: false },
          ],
        },
      },
      {
        type: 'amber',
        title: 'Sistema gera o Plano de Manobra',
        tooltip: 'Sistema gera o plano de manobra a partir da ficha confirmada.',
      },
      {
        type: 'human',
        title: 'CPT valida o plano',
        wireframe: {
          image: '/planejamento-v1.png',
          imageAlt: 'Tela Planejamento — versão V1',
          hideBadge: true,
          persona: 'CPT',
          dispositivo: 'PC',
          resolve:
            'O sistema já gera o melhor plano; o CPT revisa, ajusta se preciso e envia direto ao app do maquinista.',
          legacyImage: '/refficha.jpeg',
          legacyCaption: 'Não há plano gerado por sistema — o CPT monta de cabeça e passa a instrução na ficha impressa.',
          versions: [
            { version: 'V1', description: 'Lista dos trens com impressão de PDF.', available: true },
            { version: 'V2', description: 'Visualização de Plano em texto na tela de Planejamento.', available: false },
            { version: 'V3', description: 'Visualização de Plano em Mapa na tela de Planejamento.', available: false },
          ],
        },
      },
    ],
  },

  {
    type: 'fase',
    color: 'green',
    phaseLabel: 'Fase 2 — Execução em Campo',
    phaseNumber: 2,
    phaseName: 'Execução em Campo',
    steps: [
      { type: 'green', title: 'Plano recebido do Planejamento', minimal: true },
      {
        type: 'human',
        title: 'Maquinista/manobrador executa a manobra',
        wireframe: {
          image: '/app-maquinista.png',
          imageAlt: 'App Manobra — trajeto em mapa (V4)',
          v1Image: '/pdf-v1.png',
          v1ImageAlt: 'Plano de Manobra (PDF) — versão V1',
          v2Image: '/pdfv2.png',
          v2ImageAlt: 'Plano de Manobra (PDF) — versão V2',
          v3Image: '/appv3.png',
          v3ImageAlt: 'App Manobra — checklist textual (V3)',
          defaultView: 'v1',
          viewOptions: [
            { key: 'v1', label: 'V1' },
            { key: 'v2', label: 'V2' },
            { key: 'v3', label: 'V3' },
            { key: 'base', label: 'V4' },
          ],
          versionViewMap: { V1: 'v1', V2: 'v2', V3: 'v3', V4: 'base' },
          persona: 'Maquinista',
          dispositivo: 'Tablet-App',
          resolve:
            'Substitui a ficha impressa — o maquinista (apoiado pelo Manobrador por rádio) marca início/fim de cada etapa, com tempo automático.',
          legacyImage: '/refficha.jpeg',
          legacyCaption: 'Tempo de cada etapa cronometrado por fora, sem registro automático.',
          versions: [
            { version: 'V1', description: 'Planos de Manobra em PDF para impressão (Refinando modelo matemático).', available: true },
            { version: 'V2', description: 'PDF otimizado, com instruções mais objetivas para os manobradores.', available: false },
            { version: 'V3', description: 'App com checklist textual e tempo automático por etapa.', available: false },
            { version: 'V4', description: 'Visualizar instruções com trajeto em mapa.', available: false },
          ],
        },
      },
      {
        type: 'amber',
        title: 'Execução atualiza o Pátio',
        tooltip: 'Conforme o checklist avança, o status do Pátio é atualizado automaticamente.',
      },
      {
        type: 'human',
        title: 'CPT consulta e edita o Pátio',
        wireframe: {
          image: '/meupatio.png',
          imageAlt: 'Meu Pátio CPT',
          hideBadge: true,
          persona: 'CPT',
          dispositivo: 'PC',
          resolve:
            'Hoje o pátio só é atualizado numa planilha no fim do turno — aqui o CPT vê o status em tempo real.',
          legacyImage: '/patio.png',
          legacyCaption: 'Atualização manual em planilha de Excel, só no fim do turno.',
          versions: [
            { version: 'V1', description: 'Visualização do pátio, substituindo planilha, com edição manual.', available: false },
            { version: 'V2', description: 'Status do pátio atualizado em tempo real (com input do app do maquinista).', available: false },
          ],
        },
      },
    ],
  },

  {
    type: 'fase',
    color: 'amber',
    phaseLabel: 'Fase 3 — Setup do Pátio',
    phaseNumber: 3,
    phaseName: 'Setup do Pátio (mini-ciclo paralelo)',
    steps: [
      { type: 'green', title: 'Demanda recebida pelo PPC + Unilog', minimal: true },
      {
        type: 'decision',
        title: 'Pátio comporta a chegada?',
        decision: {
          badge: 'Dado da Fase 2',
          simTarget: 'Fase 1',
        },
      },
      {
        type: 'human',
        title: 'Sistema gera um setup e CPT revisa e confirma',
        wireframe: {
          image: '/planejamento-setup.png',
          imageAlt: 'Tela Planejamento — aba Setup',
          tag: 'aba Setup',
          hideBadge: true,
          persona: 'CPT',
          dispositivo: 'PC',
          resolve:
            'Sistema usa o estado atual do pátio (vindo do app do maquinista) pra sugerir o setup; CPT revisa e confirma em uma única etapa.',
          legacyCaption: 'Hoje não há sugestão automática — o CPT monta e decide o setup de cabeça, sem apoio de dados.',
          versions: [
            { version: 'V1', description: 'Sugestão automática de setup com confirmação do CPT.', available: false },
            { version: 'V2', description: 'Visão antes e depois do pátio (Mapa/Kanban).', available: false },
          ],
        },
      },
      {
        type: 'human',
        title: 'Maquinista executa',
        wireframe: {
          image: '/app-maquinista.png',
          imageAlt: 'App Manobra',
          hideBadge: true,
          persona: 'Maquinista',
          dispositivo: 'Tablet-App',
          resolve: 'Reorganiza o pátio para abrir espaço.',
          legacyCaption: 'Hoje o setup é combinado por rádio, sem checklist digital.',
          versionsLink: {
            label: 'Ver versionamento na Fase 2',
            targetPhase: 'Fase 2 — Execução em Campo',
          },
        },
      },
    ],
  },

  {
    type: 'fase',
    phaseLabel: 'Fase 4 — Fechamento e Indicadores',
    phaseNumber: 4,
    phaseName: 'Fechamento e Indicadores',
    steps: [
      {
        type: 'human',
        title: 'CPT consulta o histórico de manobras',
        wireframe: {
          image: '/historico.png',
          imageAlt: 'Tela Histórico — CPT e Gestão',
          hideBadge: true,
          persona: 'CPT e Gestão',
          dispositivo: 'PC',
          resolve: 'Lista navegável de manobras concluídas, com tempo planejado x executado e status de cada uma.',
          legacyCaption: 'Hoje não há histórico consolidado — cada manobra existe só na memória de quem participou.',
          versions: [
            { version: 'V1', description: 'Histórico de manobras com tempo planejado x executado.', available: false },
          ],
        },
      },
      {
        type: 'human',
        title: 'Gestão e CPT acompanham indicadores',
        wireframe: {
          image: '/visao-estrategica.png',
          imageAlt: 'Visão estratégica — Gestão e CPT',
          hideBadge: true,
          persona: 'Gestão e CPT',
          dispositivo: 'PC',
          resolve: 'Combina o histórico de manobras com os dados do app do maquinista pra mostrar onde o tempo é perdido e onde investir primeiro.',
          legacyCaption: 'Hoje essa visão não existe — desempenho depende de observação manual pontual.',
          versions: [
            { version: 'V1', description: 'Painel de indicadores cruzando histórico e execução.', available: false },
          ],
        },
      },
    ],
  },
]
