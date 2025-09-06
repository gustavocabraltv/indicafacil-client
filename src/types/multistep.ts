// types/multistep.ts

// Tipos de campo que o sistema suporta
export type FieldType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'select' | 'phone';

// Estrutura de uma opção (para radio, checkbox, select)
export interface Option {
  value: string;
  label: string;
  price?: string;      // Ex: "R$ 800-1.200" 
  badge?: string;      // Ex: "Popular", "Urgente"
}

// Estrutura de um campo individual
export interface StepField {
  id: string;                    // Identificador único do campo
  type: FieldType;               // Tipo do campo
  label: string;                 // Label que aparece para o usuário
  description?: string;          // Descrição adicional (opcional)
  required?: boolean;            // Se é obrigatório
  options?: Option[];            // Opções para radio/checkbox/select
  placeholder?: string;          // Placeholder para text/textarea
  validation?: {                 // Validações extras (para implementar depois)
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Estrutura de um step/passo
export interface Step {
  id: string;                    // Identificador único do step
  title: string;                 // Título que aparece no topo
  description?: string;          // Descrição opcional do step
  fields: StepField[];           // Array com os campos deste step
  type?: 'form' | 'loading';     // Tipo do step (form normal ou loading)
  autoAdvance?: boolean;         // Para steps que avançam automaticamente
  duration?: number;             // Duração do loading em ms
  headerComponent?: string;      // ID do componente de header customizado
  subtitle?: string;             // Subtitle para o header padrão (se não usar headerComponent)
}

// Configuração completa do multistep
export interface MultistepConfig {
  id: string;                    // ID único da configuração
  title: string;                 // Título geral do formulário
  steps: Step[];                 // Array com todos os steps
  category?: string;             // Categoria associada (ex: "3231")
}

// Estrutura dos dados preenchidos pelo usuário
export interface FormData {
  [stepId: string]: {            // Cada step tem seus dados
    [fieldId: string]: string | string[];  // Cada campo pode ser string ou array (checkbox)
  };
}

// Exemplo de como os dados ficam salvos:
// {
//   "location-type": {
//     "property-type": ["apartamento", "casa"]  // checkbox = array
//   },
//   "paint-details": {
//     "room-types": ["sala", "quartos"],        // checkbox = array  
//     "paint-type": "latex",                    // radio = string
//     "area-size": "media"                      // radio = string
//   },
//   "timing-contact": {
//     "urgency": "duas-semanas",                // radio = string
//     "additional-info": "Prefiro tinta branca", // textarea = string
//     "name": "João Silva",                     // text = string
//     "phone": "(11) 99999-9999"               // text = string
//   }
// }