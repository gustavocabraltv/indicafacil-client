// configs/service-categories.ts
import { MultistepConfig } from '@/types/multistep';

// Configuração para Pintura (3231) - Mantida igual
export const pinturaConfig: MultistepConfig = {
  id: 'pintura-service',
  title: 'Serviço de Pintura',  
  category: '3231',
  steps: [
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
            { value: 'acabamentos', label: 'Acabamentos especiais' },
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
      id: 'rooms-quantity',
      title: 'Quantos cômodos você quer pintar?',
      fields: [
        {
          id: 'room-count',
          type: 'radio',
          label: 'Quantidade de cômodos',
          required: true,
          options: [
            { value: '1-2', label: '1–2 cômodos' },
            { value: '3-4', label: '3–4 cômodos' },
            { value: '5-mais', label: '5 ou mais' },
          ]
        }
      ]
    },

    {
      id: 'room-selection',
      title: 'Quais desses ambientes fazem parte do serviço?',
      fields: [
        {
          id: 'selected-rooms',
          type: 'checkbox',
          label: 'Ambientes (multi-seleção)',
          required: true,
          options: [
            { value: 'quartos', label: 'Quartos' },
            { value: 'sala-convivencia', label: 'Sala / áreas de convivência' },
            { value: 'banheiros', label: 'Banheiros' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'corredores', label: 'Corredores' },
            { value: 'escadas', label: 'Escadas' },
            { value: 'outro', label: 'Outro' },
          ]
        }
      ]
    },

    {
      id: 'property-status',
      title: 'O imóvel está mobiliado e ocupado?',
      fields: [
        {
          id: 'occupancy-status',
          type: 'radio',
          label: 'Status do imóvel',
          required: true,
          options: [
            { value: 'mobiliado-ocupado', label: 'Mobiliado e ocupado' },
            { value: 'mobiliado-vazio', label: 'Mobiliado, mas vazio' },
            { value: 'sem-mobilia', label: 'Sem mobília e vazio' },
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
      id: 'contact-data',
      title: 'Quase lá! Só precisamos dos seus dados para enviar os orçamentos:',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Nome',
          required: true,
        },
        // {
        //   id: 'surname',
        //   type: 'text',
        //   label: 'Sobrenome',
        //   required: true,
        // },
        {
          id: 'phone',
          type: 'phone',
          label: 'WhatsApp',
          required: true,
          placeholder: '(11) 99999-9999'
        },
        {
          id: 'newsletter-opt-in',
          type: 'checkbox',
          label: 'Comunicações opcionais',
          options: [
            { value: 'tips-guides', label: 'Quero receber dicas e guias de pintura no WhatsApp' },
          ]
        }
      ]
    }
  ]
};

// Configuração para Encanador (3232) - Melhorada
export const encanadorConfig: MultistepConfig = {
  id: 'encanador-service',
  title: 'Serviço de Encanamento',
  category: '3232',
  steps: [
    {
      id: 'service-type',
      title: 'Qual tipo de serviço de encanamento você precisa?',
      fields: [
        {
          id: 'service-category',
          type: 'radio',
          label: 'Tipo de serviço',
          required: true,
          options: [
            { value: 'vazamento', label: 'Vazamento (emergência)', badge: 'Urgente' },
            { value: 'entupimento', label: 'Desentupimento' },
            { value: 'instalacao', label: 'Instalação nova' },
            { value: 'manutencao', label: 'Manutenção e reparos' },
            { value: 'troca-equipamentos', label: 'Troca de equipamentos' },
          ]
        },
        {
          id: 'additional-details',
          type: 'textarea',
          label: 'Conte mais detalhes sobre o problema...',
          placeholder: 'Ex: Torneira pingando, água vazando pelo teto, vaso entupido, preciso instalar chuveiro...',
        }
      ]
    },

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
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'casa', label: 'Casa' },
            { value: 'comercial', label: 'Comercial/Escritório' },
            { value: 'outro', label: 'Outro' },
          ]
        }
      ]
    },

    {
      id: 'problem-locations',
      title: 'Em quais ambientes está o problema?',
      fields: [
        {
          id: 'affected-locations',
          type: 'checkbox',
          label: 'Locais afetados (multi-seleção)',
          required: true,
          options: [
            { value: 'banheiro', label: 'Banheiro' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'area-servico', label: 'Área de serviço / lavanderia' },
            { value: 'quintal', label: 'Quintal / área externa' },
            { value: 'toda-casa', label: 'Casa / apartamento todo' },
            { value: 'outro', label: 'Outro local' },
          ]
        }
      ]
    },

    {
      id: 'specific-items',
      title: 'Quais equipamentos ou itens precisam de atenção?',
      fields: [
        {
          id: 'equipment-items',
          type: 'checkbox',
          label: 'Equipamentos e itens',
          options: [
            { value: 'torneira', label: 'Torneira' },
            { value: 'chuveiro', label: 'Chuveiro' },
            { value: 'vaso-sanitario', label: 'Vaso sanitário' },
            { value: 'pia', label: 'Pia / lavatório' },
            { value: 'canos-tubulacao', label: 'Canos / tubulação' },
            { value: 'ralo', label: 'Ralo' },
            { value: 'registro', label: 'Registro' },
            { value: 'outro', label: 'Outro item' },
          ]
        }
      ]
    },

    {
      id: 'material-preference',
      title: 'Sobre peças e materiais, como prefere?',
      fields: [
        {
          id: 'material-included',
          type: 'radio',
          label: 'Fornecimento de material',
          required: true,
          options: [
            { value: 'profissional-fornece', label: 'Profissional traz as peças' },
            { value: 'cliente-fornece', label: 'Eu forneço as peças' },
            { value: 'orcamento-separado', label: 'Orçar peças separadamente' },
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
          label: 'Urgência do serviço',
          required: true,
          options: [
            { value: 'emergencia', label: 'Emergência - vazamento grave', badge: 'Taxa urgência' },
            { value: 'hoje', label: 'Preciso hoje' },
            { value: 'amanha', label: 'Até amanhã' },
            { value: 'semana', label: 'Esta semana' },
            { value: 'flexivel', label: 'Posso aguardar' },
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
      id: 'contact-data',
      title: 'Quase lá! Só precisamos dos seus dados para conectar com encanadores:',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Nome',
          required: true,
        },
        {
          id: 'surname',
          type: 'text',
          label: 'Sobrenome',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'WhatsApp',
          required: true,
          placeholder: '(11) 99999-9999'
        },
        {
          id: 'newsletter-opt-in',
          type: 'checkbox',
          label: 'Comunicações opcionais',
          options: [
            { value: 'tips-guides', label: 'Quero receber dicas de manutenção hidráulica no WhatsApp' },
          ]
        }
      ]
    }
  ]
};

// Configuração para Eletricista (3233) - Melhorada
export const eletricistaConfig: MultistepConfig = {
  id: 'eletricista-service',
  title: 'Serviço Elétrico',
  category: '3233',
  steps: [
    {
      id: 'service-type',
      title: 'Que tipo de serviço elétrico você precisa?',
      fields: [
        {
          id: 'service-category',
          type: 'radio',
          label: 'Tipo de serviço',
          required: true,
          options: [
            { value: 'emergencia', label: 'Emergência - sem energia', badge: 'Urgente' },
            { value: 'instalacao', label: 'Instalação nova' },
            { value: 'manutencao', label: 'Manutenção e reparos' },
            { value: 'melhorias', label: 'Melhorias e upgrades' },
            { value: 'revisao', label: 'Revisão elétrica completa' },
          ]
        },
        {
          id: 'additional-details',
          type: 'textarea',
          label: 'Conte mais detalhes sobre o que precisa...',
          placeholder: 'Ex: Tomada sem energia, disjuntor desarmando, preciso instalar ar condicionado, chuveiro elétrico...',
        }
      ]
    },

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
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'casa', label: 'Casa' },
            { value: 'comercial', label: 'Comercial / escritório' },
            { value: 'outro', label: 'Outro tipo' },
          ]
        }
      ]
    },

    {
      id: 'problem-locations',
      title: 'Em quais ambientes você precisa do serviço?',
      fields: [
        {
          id: 'affected-locations',
          type: 'checkbox',
          label: 'Locais do serviço (multi-seleção)',
          required: true,
          options: [
            { value: 'quartos', label: 'Quartos' },
            { value: 'sala', label: 'Sala / áreas de convivência' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'banheiros', label: 'Banheiros' },
            { value: 'area-externa', label: 'Área externa / quintal' },
            { value: 'toda-casa', label: 'Casa / apartamento todo' },
            { value: 'outro', label: 'Outro local' },
          ]
        }
      ]
    },

    {
      id: 'specific-services',
      title: 'Quais serviços específicos você precisa?',
      fields: [
        {
          id: 'services-needed',
          type: 'checkbox',
          label: 'Serviços necessários (multi-seleção)',
          required: true,
          options: [
            { value: 'tomadas', label: 'Instalar / trocar tomadas' },
            { value: 'interruptores', label: 'Instalar / trocar interruptores' },
            { value: 'lustres-lampadas', label: 'Instalar lustres / lâmpadas' },
            { value: 'chuveiro-eletrico', label: 'Chuveiro elétrico' },
            { value: 'ventilador-teto', label: 'Ventilador de teto' },
            { value: 'quadro-eletrico', label: 'Quadro elétrico / disjuntores' },
            { value: 'fiacao', label: 'Fiação / cabeamento' },
            { value: 'outro', label: 'Outro serviço' },
          ]
        }
      ]
    },

    {
      id: 'material-preference',
      title: 'Sobre materiais elétricos, como prefere?',
      fields: [
        {
          id: 'material-included',
          type: 'radio',
          label: 'Fornecimento de material',
          required: true,
          options: [
            { value: 'profissional-fornece', label: 'Profissional traz os materiais' },
            { value: 'cliente-fornece', label: 'Eu forneço os materiais' },
            { value: 'orcamento-separado', label: 'Orçar materiais separadamente' },
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
          label: 'Urgência do serviço',
          required: true,
          options: [
            { value: 'emergencia', label: 'Emergência - sem energia', badge: 'Taxa urgência' },
            { value: 'hoje', label: 'Preciso hoje' },
            { value: 'amanha', label: 'Até amanhã' },
            { value: 'semana', label: 'Esta semana' },
            { value: 'flexivel', label: 'Flexível com datas' },
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
      id: 'contact-data',
      title: 'Quase lá! Só precisamos dos seus dados para conectar com eletricistas:',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Nome',
          required: true,
        },
        {
          id: 'surname',
          type: 'text',
          label: 'Sobrenome',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'WhatsApp',
          required: true,
          placeholder: '(11) 99999-9999'
        },
        {
          id: 'newsletter-opt-in',
          type: 'checkbox',
          label: 'Comunicações opcionais',
          options: [
            { value: 'tips-guides', label: 'Quero receber dicas de segurança elétrica no WhatsApp' },
          ]
        }
      ]
    }
  ]
};

// Mapeamento das configurações por categoria
export const categoryConfigs: Record<string, MultistepConfig> = {
  '3231': pinturaConfig,
  '3232': encanadorConfig, 
  '3233': eletricistaConfig,
};

// Função helper para buscar config por categoria
export const getConfigByCategory = (categoryId: string): MultistepConfig | null => {
  return categoryConfigs[categoryId] || null;
};

// Lista de categorias (pode vir de uma API depois)
export const serviceCategories = [
  { id: "3231", name: "Pintura", icon: "🎨" },
  { id: "3232", name: "Encanador", icon: "🔧" },
  { id: "3233", name: "Eletricista", icon: "⚡" },
];