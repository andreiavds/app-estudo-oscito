import type { DadosSemestre, Subtopico, PassoAPasso, ItemChecklist } from '../types/osce';

// Exemplo de conteúdo detalhado para Sinais Vitais - Aferição de Pressão Arterial
const passoAPasso_PA: PassoAPasso[] = [
  {
    ordem: 1,
    titulo: "Higienização das mãos",
    descricao: "Realizar higienização das mãos com água e sabão ou álcool gel 70% antes de iniciar o procedimento.",
    pontosCriticos: [
      "Friccionar por pelo menos 20 segundos",
      "Incluir dorso das mãos, entre os dedos e unhas"
    ],
    errosComuns: [
      "Esquecer de higienizar as mãos",
      "Higienização superficial e rápida"
    ]
  },
  {
    ordem: 2,
    titulo: "Apresentação e identificação",
    descricao: "Apresentar-se ao paciente, confirmar nome completo e data de nascimento. Explicar o procedimento que será realizado.",
    pontosCriticos: [
      "Usar linguagem clara e acessível",
      "Confirmar dois identificadores do paciente",
      "Obter consentimento verbal"
    ],
    errosComuns: [
      "Não se apresentar adequadamente",
      "Usar termos técnicos sem explicação",
      "Não confirmar identidade do paciente"
    ]
  },
  {
    ordem: 3,
    titulo: "Preparação do paciente",
    descricao: "Orientar o paciente a sentar-se confortavelmente, com as costas apoiadas, pés no chão e braço na altura do coração. Pedir para não falar durante a aferição.",
    pontosCriticos: [
      "Braço apoiado na altura do coração",
      "Paciente relaxado por 5 minutos antes da aferição",
      "Bexiga vazia (perguntar se precisa ir ao banheiro)"
    ],
    errosComuns: [
      "Medir com paciente em pé ou deitado sem ajuste",
      "Braço pendente ou acima do coração",
      "Não aguardar repouso adequado"
    ]
  },
  {
    ordem: 4,
    titulo: "Seleção do manguito adequado",
    descricao: "Escolher o tamanho correto do manguito (largura = 40% da circunferência do braço; comprimento = 80% da circunferência).",
    pontosCriticos: [
      "Manguito deve cobrir 80% da circunferência do braço",
      "Largura adequada para evitar erro de medida",
      "Verificar se o manguito está em boas condições"
    ],
    errosComuns: [
      "Usar manguito muito pequeno (superestima PA)",
      "Usar manguito muito grande (subestima PA)",
      "Não verificar tamanho do manguito"
    ]
  },
  {
    ordem: 5,
    titulo: "Posicionamento do manguito",
    descricao: "Posicionar o manguito 2-3 cm acima da fossa cubital, com a marcação da artéria sobre a artéria braquial. Braço deve estar descoberto (sem roupas apertadas).",
    pontosCriticos: [
      "Manguito 2-3 cm acima da fossa cubital",
      "Marcação sobre artéria braquial",
      "Ajuste firme mas não apertado demais"
    ],
    errosComuns: [
      "Posicionar sobre roupas",
      "Manguito muito frouxo ou muito apertado",
      "Posicionamento incorreto da marcação"
    ]
  },
  {
    ordem: 6,
    titulo: "Palpação da artéria braquial",
    descricao: "Palpar a artéria braquial na fossa cubital para localizar o ponto de ausculta.",
    pontosCriticos: [
      "Identificar corretamente a artéria braquial",
      "Usar palpação suave"
    ],
    errosComuns: [
      "Não palpar antes de auscultar",
      "Confundir com outras estruturas"
    ]
  },
  {
    ordem: 7,
    titulo: "Estimativa da pressão sistólica por palpação",
    descricao: "Palpar o pulso radial, inflar o manguito até o pulso desaparecer, anotar o valor e adicionar 30 mmHg. Esvaziar completamente o manguito.",
    pontosCriticos: [
      "Evita auscultar na 'zona de silêncio' (hiato auscultatório)",
      "Aguardar 1 minuto antes da medida auscultatória"
    ],
    errosComuns: [
      "Pular esta etapa",
      "Não esvaziar completamente antes da medida"
    ]
  },
  {
    ordem: 8,
    titulo: "Posicionamento do estetoscópio",
    descricao: "Posicionar a campânula ou diafragma do estetoscópio sobre a artéria braquial, sem pressionar excessivamente e sem contato com o manguito.",
    pontosCriticos: [
      "Não pressionar demais (pode obliterar artéria)",
      "Não tocar no manguito (causa ruído)",
      "Usar campânula para sons de baixa frequência"
    ],
    errosComuns: [
      "Pressionar excessivamente",
      "Posicionar sob o manguito",
      "Usar diafragma em vez de campânula"
    ]
  },
  {
    ordem: 9,
    titulo: "Inflação do manguito",
    descricao: "Inflar rapidamente o manguito até 30 mmHg acima da pressão sistólica estimada.",
    pontosCriticos: [
      "Inflação rápida e contínua",
      "Não ultrapassar muito a pressão necessária (causa desconforto)"
    ],
    errosComuns: [
      "Inflação muito lenta",
      "Inflar muito além do necessário"
    ]
  },
  {
    ordem: 10,
    titulo: "Deflação e ausculta",
    descricao: "Esvaziar o manguito lentamente (2-3 mmHg/segundo) enquanto ausculta. Anotar o valor do primeiro som (Korotkoff I = PAS) e do desaparecimento do som (Korotkoff V = PAD).",
    pontosCriticos: [
      "Deflação lenta e constante (2-3 mmHg/seg)",
      "Identificar corretamente Korotkoff I e V",
      "Anotar valores em mmHg pares"
    ],
    errosComuns: [
      "Deflação muito rápida (erro de medida)",
      "Deflação muito lenta (congestão venosa)",
      "Confundir fases de Korotkoff"
    ]
  },
  {
    ordem: 11,
    titulo: "Registro e interpretação",
    descricao: "Registrar os valores de PAS/PAD, braço utilizado, posição do paciente e horário. Informar o resultado ao paciente de forma clara.",
    pontosCriticos: [
      "Registrar imediatamente",
      "Incluir todas as informações contextuais",
      "Comunicar resultado ao paciente"
    ],
    errosComuns: [
      "Não registrar adequadamente",
      "Esquecer de informar o paciente"
    ]
  },
  {
    ordem: 12,
    titulo: "Higienização final",
    descricao: "Higienizar as mãos novamente e agradecer a colaboração do paciente.",
    pontosCriticos: [
      "Sempre higienizar após contato com paciente",
      "Demonstrar profissionalismo"
    ],
    errosComuns: [
      "Esquecer higienização final"
    ]
  }
];

const checklist_PA: ItemChecklist[] = [
  { id: "pa-1", texto: "Higienizou as mãos antes do procedimento", pontos: 1, categoria: "obrigatorio" },
  { id: "pa-2", texto: "Apresentou-se e confirmou identidade do paciente", pontos: 1, categoria: "obrigatorio" },
  { id: "pa-3", texto: "Explicou o procedimento ao paciente", pontos: 1, categoria: "importante" },
  { id: "pa-4", texto: "Posicionou o paciente adequadamente (sentado, braço apoiado)", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-5", texto: "Selecionou manguito de tamanho adequado", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-6", texto: "Posicionou o manguito corretamente (2-3 cm acima da fossa cubital)", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-7", texto: "Palpou a artéria braquial antes da ausculta", pontos: 1, categoria: "importante" },
  { id: "pa-8", texto: "Estimou a pressão sistólica por palpação do pulso radial", pontos: 2, categoria: "importante" },
  { id: "pa-9", texto: "Posicionou o estetoscópio corretamente sobre a artéria", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-10", texto: "Inflou o manguito adequadamente", pontos: 1, categoria: "obrigatorio" },
  { id: "pa-11", texto: "Esvaziou o manguito lentamente (2-3 mmHg/seg)", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-12", texto: "Identificou corretamente a PAS (Korotkoff I)", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-13", texto: "Identificou corretamente a PAD (Korotkoff V)", pontos: 2, categoria: "obrigatorio" },
  { id: "pa-14", texto: "Registrou os valores corretamente", pontos: 1, categoria: "obrigatorio" },
  { id: "pa-15", texto: "Comunicou o resultado ao paciente", pontos: 1, categoria: "importante" },
  { id: "pa-16", texto: "Higienizou as mãos após o procedimento", pontos: 1, categoria: "obrigatorio" },
  { id: "pa-17", texto: "Demonstrou profissionalismo e empatia durante todo o procedimento", pontos: 1, categoria: "diferencial" },
];

export const semestreData: DadosSemestre[] = [
  {
    semestre: 1,
    periodo: "Ciclo Básico - Introdução",
    progresso: 85,
    horasEstudo: 24,
    atividadesConcluidas: 17,
    totalAtividades: 20,
    conteudos: [
      {
        topico: "Sinais Vitais",
        categoria: "Exame Físico",
        subtopicos: [
          {
            id: "sv-pa",
            text: "Aferição de pressão arterial",
            contextualizacao: "A aferição da pressão arterial é um dos procedimentos mais fundamentais na prática médica e frequentemente cobrado em estações OSCE. O avaliador espera observar técnica correta, incluindo seleção adequada do manguito, posicionamento correto do paciente, e identificação precisa dos sons de Korotkoff. Erros comuns incluem: usar manguito de tamanho inadequado, não aguardar repouso do paciente, posicionar o braço incorretamente, e esvaziar o manguito muito rapidamente. A técnica correta garante medidas precisas e evita erros diagnósticos.",
            passoAPasso: passoAPasso_PA,
            checklist: checklist_PA,
          },
          {
            id: "sv-fc",
            text: "Frequência cardíaca e pulso",
            contextualizacao: "A avaliação do pulso fornece informações vitais sobre frequência, ritmo, amplitude e simetria. É essencial em emergências e na avaliação cardiovascular. O avaliador espera técnica adequada de palpação, contagem correta e identificação de características do pulso.",
            passoAPasso: [
              {
                ordem: 1,
                titulo: "Higienização das mãos",
                descricao: "Realizar higienização adequada das mãos antes do contato com o paciente.",
                pontosCriticos: ["Técnica correta de higienização"],
                errosComuns: ["Pular esta etapa"]
              },
              {
                ordem: 2,
                titulo: "Apresentação e posicionamento",
                descricao: "Apresentar-se, explicar o procedimento e posicionar o paciente confortavelmente sentado ou deitado.",
                pontosCriticos: ["Paciente relaxado", "Braço apoiado"],
                errosComuns: ["Não explicar o procedimento"]
              },
              {
                ordem: 3,
                titulo: "Palpação da artéria radial",
                descricao: "Localizar a artéria radial no punho, lateral ao tendão do flexor radial do carpo. Usar polpa dos dedos indicador e médio (nunca o polegar).",
                pontosCriticos: ["Usar 2-3 dedos", "Pressão suave", "Nunca usar o polegar"],
                errosComuns: ["Usar o polegar (sente próprio pulso)", "Pressão excessiva"]
              },
              {
                ordem: 4,
                titulo: "Contagem da frequência",
                descricao: "Contar os batimentos por 30 segundos e multiplicar por 2 (ou 60 segundos se ritmo irregular).",
                pontosCriticos: ["Usar cronômetro/relógio", "Contar 60 seg se irregular"],
                errosComuns: ["Contar tempo incorreto", "Não identificar irregularidade"]
              },
              {
                ordem: 5,
                titulo: "Avaliação das características",
                descricao: "Avaliar ritmo (regular/irregular), amplitude (forte/fraco/filiforme), simetria (comparar ambos os pulsos radiais).",
                pontosCriticos: ["Avaliar ritmo", "Avaliar amplitude", "Comparar bilateralmente"],
                errosComuns: ["Avaliar apenas frequência", "Não comparar pulsos"]
              },
              {
                ordem: 6,
                titulo: "Registro e comunicação",
                descricao: "Registrar FC, ritmo e características. Comunicar resultado ao paciente.",
                pontosCriticos: ["Registro completo", "Comunicação clara"],
                errosComuns: ["Registro incompleto"]
              }
            ],
            checklist: [
              { id: "fc-1", texto: "Higienizou as mãos", pontos: 1, categoria: "obrigatorio" },
              { id: "fc-2", texto: "Apresentou-se e explicou procedimento", pontos: 1, categoria: "importante" },
              { id: "fc-3", texto: "Posicionou paciente adequadamente", pontos: 1, categoria: "importante" },
              { id: "fc-4", texto: "Localizou corretamente a artéria radial", pontos: 2, categoria: "obrigatorio" },
              { id: "fc-5", texto: "Usou dedos indicador e médio (não o polegar)", pontos: 2, categoria: "obrigatorio" },
              { id: "fc-6", texto: "Aplicou pressão adequada", pontos: 1, categoria: "importante" },
              { id: "fc-7", texto: "Contou por tempo adequado (30 ou 60 seg)", pontos: 2, categoria: "obrigatorio" },
              { id: "fc-8", texto: "Avaliou ritmo (regular/irregular)", pontos: 2, categoria: "obrigatorio" },
              { id: "fc-9", texto: "Avaliou amplitude do pulso", pontos: 1, categoria: "importante" },
              { id: "fc-10", texto: "Comparou pulsos bilateralmente", pontos: 2, categoria: "importante" },
              { id: "fc-11", texto: "Registrou corretamente os achados", pontos: 1, categoria: "obrigatorio" },
              { id: "fc-12", texto: "Comunicou resultado ao paciente", pontos: 1, categoria: "diferencial" },
            ],
          },
          {
            id: "sv-fr",
            text: "Frequência respiratória",
            contextualizacao: "A avaliação da frequência respiratória é frequentemente negligenciada, mas é um sinal vital crucial. O avaliador espera que você observe discretamente (sem que o paciente perceba, pois a consciência altera o padrão respiratório) e avalie não apenas a frequência, mas também o padrão, profundidade e esforço respiratório.",
            passoAPasso: [
              {
                ordem: 1,
                titulo: "Observação discreta",
                descricao: "Após avaliar o pulso, manter a mão no pulso do paciente enquanto observa os movimentos respiratórios, sem avisar que está contando a respiração.",
                pontosCriticos: ["Não avisar o paciente", "Observação natural"],
                errosComuns: ["Avisar que vai contar respiração", "Observação óbvia"]
              },
              {
                ordem: 2,
                titulo: "Contagem dos movimentos",
                descricao: "Contar os ciclos respiratórios completos (inspiração + expiração = 1 ciclo) por 30 segundos e multiplicar por 2.",
                pontosCriticos: ["Contar ciclos completos", "Tempo adequado"],
                errosComuns: ["Contar apenas inspirações", "Tempo insuficiente"]
              },
              {
                ordem: 3,
                titulo: "Avaliação do padrão",
                descricao: "Observar padrão (regular/irregular), profundidade (superficial/normal/profunda), esforço (uso de musculatura acessória, tiragem).",
                pontosCriticos: ["Avaliar padrão", "Avaliar profundidade", "Identificar sinais de esforço"],
                errosComuns: ["Avaliar apenas frequência"]
              },
              {
                ordem: 4,
                titulo: "Registro",
                descricao: "Registrar FR (irpm), padrão e características observadas.",
                pontosCriticos: ["Registro completo"],
                errosComuns: ["Registro apenas da frequência"]
              }
            ],
            checklist: [
              { id: "fr-1", texto: "Observou respiração de forma discreta", pontos: 2, categoria: "obrigatorio" },
              { id: "fr-2", texto: "Não avisou o paciente sobre contagem respiratória", pontos: 2, categoria: "obrigatorio" },
              { id: "fr-3", texto: "Contou ciclos respiratórios completos", pontos: 2, categoria: "obrigatorio" },
              { id: "fr-4", texto: "Contou por tempo adequado (30-60 seg)", pontos: 1, categoria: "importante" },
              { id: "fr-5", texto: "Avaliou padrão respiratório", pontos: 2, categoria: "importante" },
              { id: "fr-6", texto: "Avaliou profundidade da respiração", pontos: 1, categoria: "importante" },
              { id: "fr-7", texto: "Identificou sinais de esforço respiratório", pontos: 2, categoria: "importante" },
              { id: "fr-8", texto: "Registrou corretamente os achados", pontos: 1, categoria: "obrigatorio" },
            ],
          },
          {
            id: "sv-temp",
            text: "Temperatura corporal",
            contextualizacao: "A aferição da temperatura é essencial na avaliação de processos infecciosos e inflamatórios. O avaliador espera conhecimento das diferentes vias de aferição (oral, axilar, retal, timpânica), suas indicações e contraindicações, além da técnica correta para cada via.",
            passoAPasso: [
              {
                ordem: 1,
                titulo: "Seleção da via e termômetro",
                descricao: "Escolher via adequada (axilar mais comum em adultos) e tipo de termômetro (digital preferível). Verificar se o termômetro está limpo e funcionando.",
                pontosCriticos: ["Via apropriada para o paciente", "Termômetro adequado"],
                errosComuns: ["Não verificar funcionamento", "Via inadequada"]
              },
              {
                ordem: 2,
                titulo: "Preparação do paciente",
                descricao: "Explicar procedimento. Para via axilar: secar a axila, posicionar termômetro no centro da axila, pedir para paciente manter braço junto ao corpo.",
                pontosCriticos: ["Axila seca", "Posicionamento correto", "Braço aduzido"],
                errosComuns: ["Não secar axila", "Posicionamento incorreto"]
              },
              {
                ordem: 3,
                titulo: "Tempo de aferição",
                descricao: "Aguardar tempo adequado: termômetro digital até sinal sonoro (3-5 min), termômetro de mercúrio 3-5 minutos.",
                pontosCriticos: ["Tempo adequado", "Aguardar sinal"],
                errosComuns: ["Retirar antes do tempo", "Não aguardar sinal"]
              },
              {
                ordem: 4,
                titulo: "Leitura e registro",
                descricao: "Ler temperatura, registrar valor e via utilizada. Limpar termômetro após uso.",
                pontosCriticos: ["Leitura correta", "Registro da via", "Limpeza do termômetro"],
                errosComuns: ["Não registrar via", "Não limpar termômetro"]
              }
            ],
            checklist: [
              { id: "temp-1", texto: "Higienizou as mãos", pontos: 1, categoria: "obrigatorio" },
              { id: "temp-2", texto: "Explicou procedimento ao paciente", pontos: 1, categoria: "importante" },
              { id: "temp-3", texto: "Selecionou via adequada", pontos: 1, categoria: "importante" },
              { id: "temp-4", texto: "Verificou funcionamento do termômetro", pontos: 1, categoria: "importante" },
              { id: "temp-5", texto: "Secou a axila antes da aferição", pontos: 2, categoria: "obrigatorio" },
              { id: "temp-6", texto: "Posicionou termômetro corretamente", pontos: 2, categoria: "obrigatorio" },
              { id: "temp-7", texto: "Orientou paciente a manter braço aduzido", pontos: 1, categoria: "importante" },
              { id: "temp-8", texto: "Aguardou tempo adequado", pontos: 2, categoria: "obrigatorio" },
              { id: "temp-9", texto: "Leu corretamente o valor", pontos: 1, categoria: "obrigatorio" },
              { id: "temp-10", texto: "Registrou valor e via utilizada", pontos: 1, categoria: "obrigatorio" },
              { id: "temp-11", texto: "Limpou o termômetro após uso", pontos: 1, categoria: "importante" },
            ],
          },
          {
            id: "sv-sat",
            text: "Saturação de oxigênio",
            contextualizacao: "A oximetria de pulso é um método não invasivo essencial para avaliar oxigenação. O avaliador espera conhecimento sobre funcionamento do oxímetro, seleção do local adequado, interpretação dos valores e limitações do método.",
            passoAPasso: [
              {
                ordem: 1,
                titulo: "Preparação do equipamento",
                descricao: "Verificar se oxímetro está funcionando, com bateria adequada e sensor limpo.",
                pontosCriticos: ["Equipamento funcionante", "Sensor limpo"],
                errosComuns: ["Não verificar equipamento"]
              },
              {
                ordem: 2,
                titulo: "Seleção do local",
                descricao: "Escolher local adequado (dedo indicador preferível). Verificar se há esmalte, unhas postiças ou sujidade (remover se necessário).",
                pontosCriticos: ["Dedo sem esmalte", "Unhas limpas", "Boa perfusão"],
                errosComuns: ["Não remover esmalte", "Dedo com má perfusão"]
              },
              {
                ordem: 3,
                titulo: "Posicionamento do sensor",
                descricao: "Posicionar sensor com LED e fotodetector alinhados (um de cada lado da unha). Mão relaxada na altura do coração.",
                pontosCriticos: ["Alinhamento correto", "Mão relaxada"],
                errosComuns: ["Sensor mal posicionado", "Mão em movimento"]
              },
              {
                ordem: 4,
                titulo: "Leitura e interpretação",
                descricao: "Aguardar estabilização do sinal (onda pletismográfica). Ler SpO2 e frequência cardíaca. Valores normais: SpO2 ≥95%.",
                pontosCriticos: ["Aguardar estabilização", "Verificar onda", "Interpretar valores"],
                errosComuns: ["Ler antes de estabilizar", "Não verificar onda"]
              }
            ],
            checklist: [
              { id: "sat-1", texto: "Verificou funcionamento do oxímetro", pontos: 1, categoria: "importante" },
              { id: "sat-2", texto: "Explicou procedimento ao paciente", pontos: 1, categoria: "importante" },
              { id: "sat-3", texto: "Verificou presença de esmalte/unhas postiças", pontos: 2, categoria: "obrigatorio" },
              { id: "sat-4", texto: "Removeu esmalte se necessário", pontos: 1, categoria: "importante" },
              { id: "sat-5", texto: "Selecionou dedo com boa perfusão", pontos: 1, categoria: "importante" },
              { id: "sat-6", texto: "Posicionou sensor corretamente", pontos: 2, categoria: "obrigatorio" },
              { id: "sat-7", texto: "Orientou paciente a manter mão relaxada", pontos: 1, categoria: "importante" },
              { id: "sat-8", texto: "Aguardou estabilização do sinal", pontos: 2, categoria: "obrigatorio" },
              { id: "sat-9", texto: "Verificou onda pletismográfica", pontos: 2, categoria: "importante" },
              { id: "sat-10", texto: "Leu corretamente SpO2 e FC", pontos: 1, categoria: "obrigatorio" },
              { id: "sat-11", texto: "Interpretou valores adequadamente", pontos: 1, categoria: "importante" },
              { id: "sat-12", texto: "Registrou os valores", pontos: 1, categoria: "obrigatorio" },
            ],
          },
        ],
      },
      {
        topico: "Fundamentos da Comunicação Médica",
        categoria: "Comunicação",
        subtopicos: [
          {
            id: "com-apresentacao",
            text: "Apresentação pessoal e profissionalismo",
            contextualizacao: "A primeira impressão é fundamental na relação médico-paciente. O avaliador observa postura, vestimenta, linguagem corporal e verbal. Demonstrar profissionalismo desde o primeiro contato estabelece confiança e facilita a comunicação.",
            checklist: [
              { id: "com-1", texto: "Apresentou-se com nome completo", pontos: 1, categoria: "obrigatorio" },
              { id: "com-2", texto: "Identificou-se como estudante de medicina", pontos: 1, categoria: "obrigatorio" },
              { id: "com-3", texto: "Vestimenta adequada (jaleco limpo, identificação)", pontos: 1, categoria: "importante" },
              { id: "com-4", texto: "Postura profissional", pontos: 1, categoria: "importante" },
              { id: "com-5", texto: "Contato visual adequado", pontos: 1, categoria: "importante" },
            ],
          },
          {
            id: "com-escuta",
            text: "Técnicas de escuta ativa",
            contextualizacao: "Escuta ativa demonstra interesse genuíno pelo paciente e facilita obtenção de informações. Inclui linguagem corporal receptiva, não interromper, fazer perguntas abertas e demonstrar empatia.",
            checklist: [
              { id: "esc-1", texto: "Manteve contato visual durante relato", pontos: 1, categoria: "importante" },
              { id: "esc-2", texto: "Não interrompeu o paciente prematuramente", pontos: 2, categoria: "obrigatorio" },
              { id: "esc-3", texto: "Usou linguagem corporal receptiva", pontos: 1, categoria: "importante" },
              { id: "esc-4", texto: "Fez perguntas abertas", pontos: 1, categoria: "importante" },
              { id: "esc-5", texto: "Demonstrou empatia", pontos: 1, categoria: "diferencial" },
            ],
          },
        ],
      },
    ],
  },
  // Adicionar outros semestres com estrutura similar...
  // Por questão de espaço, vou adicionar apenas estruturas básicas para os demais
  {
    semestre: 2,
    periodo: "Ciclo Básico - Fundamentos",
    progresso: 78,
    horasEstudo: 32,
    atividadesConcluidas: 19,
    totalAtividades: 25,
    conteudos: [
      {
        topico: "Exame Físico Geral",
        categoria: "Semiologia",
        subtopicos: [
          {
            id: "efg-inspecao",
            text: "Inspeção geral do paciente",
            contextualizacao: "A inspeção geral é o primeiro passo do exame físico e fornece informações valiosas sobre o estado geral do paciente antes mesmo do contato físico.",
            checklist: [
              { id: "efg-1", texto: "Avaliou estado geral (bom/regular/mau)", pontos: 2, categoria: "obrigatorio" },
              { id: "efg-2", texto: "Observou nível de consciência", pontos: 2, categoria: "obrigatorio" },
              { id: "efg-3", texto: "Avaliou estado nutricional", pontos: 1, categoria: "importante" },
              { id: "efg-4", texto: "Observou fácies característica", pontos: 1, categoria: "importante" },
            ],
          },
        ],
      },
    ],
  },
  // Semestres 3-12 seguem estrutura similar
  ...Array.from({ length: 10 }, (_, i) => ({
    semestre: i + 3,
    periodo: `Período ${i + 3}`,
    progresso: Math.floor(Math.random() * 30) + 50,
    horasEstudo: Math.floor(Math.random() * 20) + 30,
    atividadesConcluidas: Math.floor(Math.random() * 15) + 20,
    totalAtividades: Math.floor(Math.random() * 20) + 40,
    conteudos: [
      {
        topico: `Tópico exemplo ${i + 3}`,
        categoria: "Categoria",
        subtopicos: [
          {
            id: `top-${i + 3}-1`,
            text: "Subtópico exemplo",
            contextualizacao: "Contextualização exemplo para desenvolvimento futuro.",
            checklist: [
              { id: `check-${i + 3}-1`, texto: "Item checklist exemplo", pontos: 1, categoria: "importante" as const },
            ],
          },
        ],
      },
    ],
  })),
];
