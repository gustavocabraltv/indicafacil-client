// configs/service-categories.ts
import { MultistepConfig } from '@/types/multistep';

// Configuração para Pintura (3231)
export const pinturaConfig: MultistepConfig = {
  id: 'pintura-service',
  title: 'Serviço de Pintura',
  category: '3231',
  steps: [
    {
      id: 'location-type',
      title: 'Onde será a pintura?',
      fields: [
        {
          id: 'property-type',
          type: 'radio',
          label: 'Tipo de imóvel',
          required: true,
          options: [
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'casa', label: 'Casa' },
            { value: 'comercial', label: 'Comercial/Escritório' },
            { value: 'condominio', label: 'Condomínio (área comum)' },
          ]
        }
      ]
    },
    {
      id: 'paint-details',
      title: 'Detalhes da Pintura',
      fields: [
        {
          id: 'room-types',
          type: 'checkbox',
          label: 'Quais cômodos serão pintados?',
          required: true,
          options: [
            { value: 'sala', label: 'Sala' },
            { value: 'quartos', label: 'Quartos' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'banheiro', label: 'Banheiro' },
            { value: 'area-externa', label: 'Área externa' },
            { value: 'todos', label: 'Casa/apartamento inteiro' },
          ]
        },
        {
          id: 'paint-type',
          type: 'radio',
          label: 'Tipo de pintura',
          required: true,
          options: [
            { value: 'latex', label: 'Tinta látex (parede comum)' },
            { value: 'acrilica', label: 'Tinta acrílica (área externa)' },
            { value: 'esmalte', label: 'Esmalte (madeira/metal)' },
            { value: 'textura', label: 'Textura decorativa' },
          ]
        },
        {
          id: 'area-size',
          type: 'radio',
          label: 'Tamanho aproximado da área',
          required: true,
          options: [
            { value: 'pequena', label: 'Pequena (até 30m²)', price: 'R$ 800-1.200' },
            { value: 'media', label: 'Média (30-60m²)', price: 'R$ 1.200-2.000' },
            { value: 'grande', label: 'Grande (60-100m²)', price: 'R$ 2.000-3.500' },
            { value: 'muito-grande', label: 'Muito grande (100m²+)', price: 'R$ 3.500+' },
          ]
        }
      ]
    },
    {
      id: 'additional-services',
      title: 'Serviços Adicionais',
      fields: [
        {
          id: 'extras',
          type: 'checkbox',
          label: 'Precisa de algum serviço extra?',
          options: [
            { value: 'preparacao-parede', label: 'Preparação da parede (massa corrida)' },
            { value: 'remocao-papel', label: 'Remoção de papel de parede' },
            { value: 'pintura-moveis', label: 'Pintura de móveis' },
            { value: 'limpeza-pos', label: 'Limpeza pós-serviço' },
          ]
        },
        {
          id: 'material-included',
          type: 'radio',
          label: 'Material incluído?',
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
      id: 'timing-contact',
      title: 'Prazo e Contato',
      fields: [
        {
          id: 'urgency',
          type: 'radio',
          label: 'Quando precisa do serviço?',
          required: true,
          options: [
            { value: 'flexivel', label: 'Flexível - posso esperar' },
            { value: 'duas-semanas', label: 'Nas próximas 2 semanas' },
            { value: 'uma-semana', label: 'Na próxima semana' },
            { value: 'urgente', label: 'Urgente - esta semana' },
          ]
        },
        {
          id: 'additional-info',
          type: 'textarea',
          label: 'Informações adicionais',
          placeholder: 'Descreva detalhes específicos, preferências de cor, horários disponíveis...',
        },
        {
          id: 'name',
          type: 'text',
          label: 'Seu nome',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'WhatsApp',
          required: true,
          placeholder: '(11) 99999-9999'
        }
      ]
    }
  ]
};

// Configuração para Encanador (3232)
export const encanadorConfig: MultistepConfig = {
  id: 'encanador-service',
  title: 'Serviço de Encanamento',
  category: '3232',
  steps: [
    {
      id: 'location-problem',
      title: 'Onde está o problema?',
      fields: [
        {
          id: 'property-type',
          type: 'radio',
          label: 'Tipo de imóvel',
          required: true,
          options: [
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'casa', label: 'Casa' },
            { value: 'comercial', label: 'Comercial/Escritório' },
          ]
        },
        {
          id: 'problem-location',
          type: 'checkbox',
          label: 'Quais locais?',
          required: true,
          options: [
            { value: 'banheiro', label: 'Banheiro' },
            { value: 'cozinha', label: 'Cozinha' },
            { value: 'area-servico', label: 'Área de serviço' },
            { value: 'quintal', label: 'Quintal/área externa' },
            { value: 'toda-casa', label: 'Casa toda' },
          ]
        }
      ]
    },
    {
      id: 'problem-type',
      title: 'Qual o problema?',
      fields: [
        {
          id: 'service-type',
          type: 'checkbox',
          label: 'Tipo de serviço necessário',
          required: true,
          options: [
            { value: 'vazamento', label: 'Vazamento', badge: 'Urgente' },
            { value: 'entupimento', label: 'Entupimento' },
            { value: 'instalacao', label: 'Instalação nova' },
            { value: 'manutencao', label: 'Manutenção preventiva' },
            { value: 'troca-pecas', label: 'Troca de peças' },
          ]
        },
        {
          id: 'specific-items',
          type: 'checkbox',
          label: 'Itens específicos',
          options: [
            { value: 'torneira', label: 'Torneira' },
            { value: 'chuveiro', label: 'Chuveiro' },
            { value: 'vaso-sanitario', label: 'Vaso sanitário' },
            { value: 'pia', label: 'Pia' },
            { value: 'canos', label: 'Canos/tubulação' },
            { value: 'ralo', label: 'Ralo' },
          ]
        }
      ]
    },
    {
      id: 'urgency-details',
      title: 'Urgência e Detalhes',
      fields: [
        {
          id: 'urgency',
          type: 'radio',
          label: 'Qual a urgência?',
          required: true,
          options: [
            { value: 'emergencia', label: 'Emergência - vazamento grave', price: 'Taxa urgência' },
            { value: 'hoje', label: 'Preciso hoje' },
            { value: 'amanha', label: 'Até amanhã' },
            { value: 'semana', label: 'Esta semana' },
            { value: 'flexivel', label: 'Posso aguardar' },
          ]
        },
        {
          id: 'problem-description',
          type: 'textarea',
          label: 'Descreva o problema',
          required: true,
          placeholder: 'Ex: Torneira pingando, água vazando pelo teto, vaso entupido...'
        },
        {
          id: 'name',
          type: 'text',
          label: 'Seu nome',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'WhatsApp',
          required: true,
        }
      ]
    }
  ]
};

// Configuração para Eletricista (3233)
export const eletricistaConfig: MultistepConfig = {
  id: 'eletricista-service',
  title: 'Serviço Elétrico',
  category: '3233',
  steps: [
    {
      id: 'service-type',
      title: 'Que tipo de serviço elétrico?',
      fields: [
        {
          id: 'service-category',
          type: 'radio',
          label: 'Categoria do serviço',
          required: true,
          options: [
            { value: 'emergencia', label: 'Emergência - sem luz', badge: 'Urgente' },
            { value: 'instalacao', label: 'Instalação nova' },
            { value: 'manutencao', label: 'Manutenção/reparo' },
            { value: 'melhorias', label: 'Melhorias/upgrades' },
          ]
        }
      ]
    },
    {
      id: 'specific-service',
      title: 'Serviços específicos',
      fields: [
        {
          id: 'services-needed',
          type: 'checkbox',
          label: 'O que precisa ser feito?',
          required: true,
          options: [
            { value: 'tomadas', label: 'Instalar/trocar tomadas' },
            { value: 'interruptores', label: 'Instalar/trocar interruptores' },
            { value: 'lampadas-lustres', label: 'Instalar lâmpadas/lustres' },
            { value: 'chuveiro-eletrico', label: 'Instalar/trocar chuveiro elétrico' },
            { value: 'quadro-eletrico', label: 'Quadro elétrico/disjuntores' },
            { value: 'fiacao', label: 'Fiação/cabeamento' },
            { value: 'ventilador-teto', label: 'Ventilador de teto' },
          ]
        },
        {
          id: 'problem-description',
          type: 'textarea',
          label: 'Descreva o problema ou o que precisa',
          required: true,
          placeholder: 'Ex: Tomada sem energia, disjuntor desarmando, preciso instalar ar condicionado...'
        }
      ]
    },
    {
      id: 'location-urgency',
      title: 'Local e Urgência',
      fields: [
        {
          id: 'property-type',
          type: 'radio',
          label: 'Tipo de imóvel',
          required: true,
          options: [
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'casa', label: 'Casa' },
            { value: 'comercial', label: 'Comercial' },
          ]
        },
        {
          id: 'urgency',
          type: 'radio',
          label: 'Urgência',
          required: true,
          options: [
            { value: 'emergencia', label: 'Emergência - sem energia', price: 'Taxa urgência' },
            { value: 'hoje', label: 'Hoje' },
            { value: 'amanha', label: 'Até amanhã' },
            { value: 'semana', label: 'Esta semana' },
            { value: 'flexivel', label: 'Flexível' },
          ]
        },
        {
          id: 'name',
          type: 'text',
          label: 'Seu nome',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'WhatsApp',
          required: true,
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