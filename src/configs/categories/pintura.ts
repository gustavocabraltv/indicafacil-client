// configs/categories/pintura.ts
import { MultistepConfig } from '@/types/multistep';

export const pinturaConfig: MultistepConfig = {
  id: 'pintura-service',
  title: 'Serviço de Pintura',
  category: '3231',
  steps: [
    // STEP 1: Decisão principal (sempre aparece)
    {
      id: 'paint-type',
      title: 'Que tipo de pintura você precisa?',
      fields: [
        {
          id: 'paint-location',
          type: 'radio',
          label: 'Tipo de pintura',
          required: true,
          options: [
            { value: 'interior', label: 'Interior (dentro de casa)' },
            { value: 'exterior', label: 'Exterior (parte de fora)' },
            { value: 'acabamentos-especiais', label: 'Acabamentos especiais' },
          ]
        },
        {
          id: 'additional-details',
          type: 'textarea',
          label: 'Conte mais detalhes, se quiser...',
          placeholder: 'Descreva detalhes específicos sobre o tipo de pintura que precisa...',
        }
      ]
    },

    // ===== FLUXO A: INTERIOR =====

    // A.1: Tipo de pintura interior
    {
      id: 'interior-paint-type',
      title: 'O que você precisa pintar?',
      condition: { field: 'paint-location', value: 'interior' },
      fields: [
        {
          id: 'interior-type',
          type: 'radio',
          label: 'Tipo de pintura interior',
          required: true,
          options: [
            { value: 'paredes-comodos', label: 'Paredes de cômodos' },
            { value: 'teto', label: 'Teto' },
            { value: 'acabamentos', label: 'Acabamentos (rodapés, molduras, batentes)' },
            { value: 'multiplas-areas', label: 'Múltiplas áreas (paredes + teto + acabamentos)' },
          ]
        }
      ]
    },

    // SUB-FLUXO A1: Paredes de Cômodos
    {
      id: 'paredes-rooms-count',
      title: 'Quantos cômodos você quer pintar?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        if (paintLocation === 'interior' && interiorType === 'paredes-comodos') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'rooms-count',
          type: 'radio',
          label: 'Quantidade de cômodos',
          required: true,
          options: [
            { value: '1', label: '1 cômodo' },
            { value: '2-3', label: '2-3 cômodos' },
            { value: '4-5', label: '4-5 cômodos' },
            { value: '5-mais', label: 'Mais de 5 cômodos' },
          ]
        }
      ]
    },

    {
      id: 'paredes-room-types',
      title: 'Que tipos de cômodos são?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        if (paintLocation === 'interior' && interiorType === 'paredes-comodos') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'room-types',
          type: 'checkbox',
          label: 'Tipos de cômodos (marque todas que se aplicam)',
          required: true,
          options: [
            { value: 'quartos', label: 'Quartos' },
            { value: 'sala-estar', label: 'Sala/estar' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'banheiros', label: 'Banheiros' },
            { value: 'corredores', label: 'Corredores' },
            { value: 'outros', label: 'Outros' },
          ]
        }
      ]
    },

    // SUB-FLUXO A2: Teto
    {
      id: 'teto-ambientes-count',
      title: 'Em quantos ambientes você quer pintar o teto?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        if (paintLocation === 'interior' && interiorType === 'teto') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'teto-count',
          type: 'radio',
          label: 'Quantidade de ambientes',
          required: true,
          options: [
            { value: '1', label: '1 ambiente' },
            { value: '2-3', label: '2-3 ambientes' },
            { value: '4-mais', label: '4+ ambientes' },
            { value: 'casa-toda', label: 'Casa toda' },
          ]
        }
      ]
    },

    {
      id: 'teto-ambiente-types',
      title: 'Quais ambientes?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        const tetoCount = answers['teto-ambientes-count']?.['teto-count'];
        if (paintLocation === 'interior' && 
            interiorType === 'teto' && 
            tetoCount !== 'casa-toda') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'teto-ambiente-types',
          type: 'checkbox',
          label: 'Ambientes (marque todas que se aplicam)',
          required: true,
          options: [
            { value: 'quartos', label: 'Quartos' },
            { value: 'sala-estar', label: 'Sala/estar' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'banheiros', label: 'Banheiros' },
            { value: 'corredores', label: 'Corredores' },
            { value: 'outros', label: 'Outros' },
          ]
        }
      ]
    },

    // SUB-FLUXO A3: Acabamentos
    {
      id: 'acabamentos-extensao',
      title: 'Qual a extensão dos acabamentos?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        if (paintLocation === 'interior' && interiorType === 'acabamentos') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'acabamentos-scope',
          type: 'radio',
          label: 'Extensão dos acabamentos',
          required: true,
          options: [
            { value: '1-comodo', label: 'Apenas 1 cômodo' },
            { value: 'alguns-comodos', label: 'Alguns cômodos específicos' },
            { value: 'casa-toda', label: 'Casa toda' },
            { value: 'nao-sei', label: 'Não tenho certeza' },
          ]
        }
      ]
    },

    // SUB-FLUXO A4: Múltiplas Áreas
    {
      id: 'multiplas-areas-quais',
      title: 'Quais áreas você quer pintar?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        if (paintLocation === 'interior' && interiorType === 'multiplas-areas') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'multiplas-areas',
          type: 'checkbox',
          label: 'Áreas (marque todas que se aplicam)',
          required: true,
          options: [
            { value: 'paredes', label: 'Paredes' },
            { value: 'teto', label: 'Teto' },
            { value: 'rodapes-acabamentos', label: 'Rodapés e acabamentos' },
            { value: 'portas-janelas', label: 'Portas e janelas' },
          ]
        }
      ]
    },

    {
      id: 'multiplas-extensao',
      title: 'Qual a extensão deste projeto?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const interiorType = answers['interior-paint-type']?.['interior-type'];
        if (paintLocation === 'interior' && interiorType === 'multiplas-areas') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'multiplas-scope',
          type: 'radio',
          label: 'Extensão do projeto',
          required: true,
          options: [
            { value: '1-2-comodos', label: '1-2 cômodos' },
            { value: '3-4-comodos', label: '3-4 cômodos' },
            { value: '5-mais-comodos', label: '5+ cômodos' },
            { value: 'casa-completa', label: 'Casa completa' },
          ]
        }
      ]
    },

    // Status da casa (comum para todos os fluxos interior)
    {
      id: 'interior-occupancy',
      title: 'A casa está mobiliada e sendo usada?',
      condition: { field: 'paint-location', value: 'interior' },
      fields: [
        {
          id: 'occupancy-status',
          type: 'radio',
          label: 'Status da casa',
          required: true,
          options: [
            { value: 'mobiliada-ocupada', label: 'Mobiliada e ocupada' },
            { value: 'mobiliada-vazia', label: 'Mobiliada mas vazia' },
            { value: 'sem-moveis', label: 'Sem móveis e vazia' },
          ]
        }
      ]
    },

    // ===== FLUXO B: EXTERIOR =====

    // B.1: Escopo do projeto exterior
    {
      id: 'exterior-scope',
      title: 'Como você descreveria seu projeto?',
      condition: { field: 'paint-location', value: 'exterior' },
      fields: [
        {
          id: 'exterior-project-scope',
          type: 'radio',
          label: 'Escopo do projeto',
          required: true,
          options: [
            { value: 'casa-completa', label: 'Casa completa por fora' },
            { value: 'pintura-parcial', label: 'Pintura parcial (algumas áreas específicas)' },
            { value: 'item-unico', label: 'Item único (portão, porta, janela, etc.)' },
          ]
        }
      ]
    },

    // SUB-FLUXO B1: Casa Completa - apenas material
    {
      id: 'casa-completa-material',
      title: 'Qual é o material principal das paredes externas?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const exteriorScope = answers['exterior-scope']?.['exterior-project-scope'];
        if (paintLocation === 'exterior' && exteriorScope === 'casa-completa') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'wall-material',
          type: 'radio',
          label: 'Material principal',
          required: true,
          options: [
            { value: 'reboco', label: 'Reboco/massa corrida' },
            { value: 'madeira', label: 'Madeira' },
            { value: 'tijolo', label: 'Tijolo aparente' },
            { value: 'metal', label: 'Metal' },
            { value: 'vinil', label: 'Vinil' },
            { value: 'outro', label: 'Outro' },
            { value: 'nao-sei', label: 'Não tenho certeza' },
          ]
        }
      ]
    },

    // SUB-FLUXO B2: Pintura Parcial
    {
      id: 'parcial-areas',
      title: 'Quais áreas você quer pintar?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const exteriorScope = answers['exterior-scope']?.['exterior-project-scope'];
        if (paintLocation === 'exterior' && exteriorScope === 'pintura-parcial') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'parcial-items',
          type: 'checkbox',
          label: 'Áreas específicas (marque todas que se aplicam)',
          required: true,
          options: [
            { value: 'paredes-fachada', label: 'Paredes/fachada' },
            { value: 'portao', label: 'Portão' },
            { value: 'portas-janelas', label: 'Portas e janelas' },
            { value: 'terraco-varanda', label: 'Terraço/varanda' },
            { value: 'garagem', label: 'Garagem' },
            { value: 'cerca', label: 'Cerca' },
            { value: 'outros', label: 'Outros' },
          ]
        }
      ]
    },

    {
      id: 'parcial-faces-count',
      title: 'Quantas faces da casa?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const exteriorScope = answers['exterior-scope']?.['exterior-project-scope'];
        const parcialItems = answers['parcial-areas']?.['parcial-items'];
        if (paintLocation === 'exterior' &&
            exteriorScope === 'pintura-parcial' &&
            Array.isArray(parcialItems) &&
            parcialItems.includes('paredes-fachada')) {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'faces-count',
          type: 'radio',
          label: 'Quantidade de faces',
          required: true,
          options: [
            { value: 'parte-parede', label: 'Parte de uma parede' },
            { value: '1-face', label: '1 face da casa' },
            { value: '2-3-faces', label: '2-3 faces' },
            { value: 'todas-faces', label: 'Todas as faces externas' },
          ]
        }
      ]
    },

    {
      id: 'parcial-material',
      title: 'Qual é o material principal?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const exteriorScope = answers['exterior-scope']?.['exterior-project-scope'];
        const parcialItems = answers['parcial-areas']?.['parcial-items'];
        if (paintLocation === 'exterior' &&
            exteriorScope === 'pintura-parcial' &&
            Array.isArray(parcialItems) &&
            parcialItems.includes('paredes-fachada')) {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'parcial-wall-material',
          type: 'radio',
          label: 'Material principal',
          required: true,
          options: [
            { value: 'reboco', label: 'Reboco/massa corrida' },
            { value: 'madeira', label: 'Madeira' },
            { value: 'tijolo', label: 'Tijolo aparente' },
            { value: 'metal', label: 'Metal' },
            { value: 'vinil', label: 'Vinil' },
            { value: 'outro', label: 'Outro' },
            { value: 'nao-sei', label: 'Não tenho certeza' },
          ]
        }
      ]
    },

    // SUB-FLUXO B3: Item Único
    {
      id: 'item-unico-tipo',
      title: 'Que tipo de item você quer pintar?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const exteriorScope = answers['exterior-scope']?.['exterior-project-scope'];
        if (paintLocation === 'exterior' && exteriorScope === 'item-unico') {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'item-type',
          type: 'radio',
          label: 'Tipo de item',
          required: true,
          options: [
            { value: 'portao', label: 'Portão' },
            { value: 'porta-entrada', label: 'Porta de entrada' },
            { value: 'janelas', label: 'Janelas' },
            { value: 'grade-cerca', label: 'Grade/cerca' },
            { value: 'estrutura-metalica', label: 'Estrutura metálica' },
            { value: 'movel-externo', label: 'Móvel externo' },
            { value: 'outro', label: 'Outro' },
          ]
        }
      ]
    },

    {
      id: 'item-unico-quantidade',
      title: 'Quantos itens aproximadamente?',
      showIf: (answers) => {
        const paintLocation = answers['paint-type']?.['paint-location'];
        const exteriorScope = answers['exterior-scope']?.['exterior-project-scope'];
        const itemType = answers['item-unico-tipo']?.['item-type'];
        if (paintLocation === 'exterior' &&
            exteriorScope === 'item-unico' &&
            itemType && 
            typeof itemType === 'string' &&
            ['janelas', 'grade-cerca', 'movel-externo'].includes(itemType)) {
          return true;
        }
        return false;
      },
      fields: [
        {
          id: 'item-quantity',
          type: 'radio',
          label: 'Quantidade',
          required: true,
          options: [
            { value: '1', label: '1 item' },
            { value: '2-3', label: '2-3 itens' },
            { value: '4-6', label: '4-6 itens' },
            { value: '6-mais', label: 'Mais de 6 itens' },
          ]
        }
      ]
    },

    // ===== FLUXO C: ACABAMENTOS ESPECIAIS =====

    {
      id: 'especiais-tipo',
      title: 'Que tipo de acabamento especial você precisa?',
      condition: { field: 'paint-location', value: 'acabamentos-especiais' },
      fields: [
        {
          id: 'especial-type',
          type: 'radio',
          label: 'Tipo de acabamento especial',
          required: true,
          options: [
            { value: 'telhado', label: 'Telhado (telhas, estrutura metálica)' },
            { value: 'estruturas-ferro', label: 'Estruturas de ferro (grades, portões, corrimãos)' },
            { value: 'madeira-especial', label: 'Madeira especial (decks, pergolados)' },
            { value: 'textura-tecnica', label: 'Textura ou técnica especial' },
            { value: 'restauracao', label: 'Restauração/recuperação' },
            { value: 'outro-especial', label: 'Outro tipo especial' },
          ]
        }
      ]
    },

    {
      id: 'especiais-area',
      title: 'Como você descreveria a área?',
      condition: { field: 'paint-location', value: 'acabamentos-especiais' },
      fields: [
        {
          id: 'especial-area-size',
          type: 'radio',
          label: 'Tamanho da área',
          required: true,
          options: [
            { value: 'pequena', label: 'Pequena (até 20m²)' },
            { value: 'media', label: 'Média (20-50m²)' },
            { value: 'grande', label: 'Grande (50-100m²)' },
            { value: 'muito-grande', label: 'Muito grande (mais de 100m²)' },
            { value: 'nao-sei', label: 'Não sei estimar' },
          ]
        }
      ]
    },

    {
      id: 'especiais-material',
      title: 'Qual o material/superfície atual?',
      condition: { field: 'paint-location', value: 'acabamentos-especiais' },
      fields: [
        {
          id: 'especial-current-material',
          type: 'radio',
          label: 'Material atual',
          required: true,
          options: [
            { value: 'metal', label: 'Metal (ferro, alumínio)' },
            { value: 'madeira', label: 'Madeira' },
            { value: 'concreto', label: 'Concreto/reboco' },
            { value: 'ja-pintado', label: 'Já pintado (repintura)' },
            { value: 'misto', label: 'Misto/vários materiais' },
            { value: 'nao-sei', label: 'Não tenho certeza' },
          ]
        }
      ]
    },

    // ===== STEPS COMUNS (todos os fluxos) =====

    {
      id: 'property-type',
      title: 'Qual é o tipo de imóvel?',
      fields: [
        {
          id: 'property-category',
          type: 'radio',
          label: 'Tipo de imóvel',
          required: true,
          options: [
            { value: 'residencial', label: 'Residencial' },
            { value: 'comercial', label: 'Comercial' },
            { value: 'outro', label: 'Outro' },
          ]
        }
      ]
    },

    {
      id: 'material-preference',
      title: 'Sobre os materiais, como você prefere?',
      fields: [
        {
          id: 'material-included',
          type: 'radio',
          label: 'Material incluído',
          required: true,
          options: [
            { value: 'profissional-fornece', label: 'Profissional fornece o material' },
            { value: 'cliente-fornece', label: 'Eu forneço o material' },
            { value: 'orcamento-separado', label: 'Orçar material separadamente' },
          ]
        }
      ]
    },

    {
      id: 'timing',
      title: 'Para quando você precisa do serviço?',
      fields: [
        {
          id: 'urgency',
          type: 'radio',
          label: 'Prazo desejado',
          required: true,
          options: [
            { value: 'urgente', label: 'Urgente (o quanto antes)' },
            { value: '1-semana', label: 'Dentro de 1 semana' },
            { value: '15-dias', label: 'Nos próximos 15 dias' },
            { value: 'sem-data', label: 'Sem data definida' },
          ]
        }
      ]
    },

    {
      id: 'project-stage',
      title: 'Em que etapa você está?',
      fields: [
        {
          id: 'stage',
          type: 'radio',
          label: 'Etapa do projeto',
          required: true,
          options: [
            { value: 'pronto-contratar', label: 'Pronto para contratar' },
            { value: 'planejando', label: 'Só planejando / fazendo orçamento' },
          ]
        }
      ]
    },

    {
      id: 'searching-professionals',
      title: '',
      type: 'loading',
      fields: [],
      autoAdvance: true,
      duration: 3000
    },

    {
      id: 'contact-data',
      title: 'Quase lá! Só precisamos dos seus dados para enviar os orçamentos:',
      headerComponent: 'contact-data',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Nome',
          required: true,
        },
        {
          id: 'phone',
          type: 'phone',
          label: 'WhatsApp',
          required: true,
          placeholder: 'DDD + Telefone'
        },
        {
          id: 'newsletter-opt-in',
          type: 'checkbox',
          label: 'Comunicações opcionais',
          options: [
            { value: 'tips-guides', label: 'Quero receber orçamentos pelo WhatsApp' },
          ]
        }
      ]
    }
  ]
};