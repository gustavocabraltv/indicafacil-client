// types/multistep.ts

// Tipos de campo que o sistema suporta
export type FieldType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'select' | 'phone' | 'terms-checkbox';

// Estrutura de uma opção (para radio, checkbox, select)
export interface Option {
  value: string;
  label: string;
  price?: string;      // Ex: "R$ 800-1.200" 
  badge?: string;      // Ex: "Popular", "Urgente"
}

// Estrutura de validação condicional
export interface StepCondition {
  field: string;                           // ID do campo a verificar
  value: string | string[];                // Valor(es) que ativam a condição
  operator?: 'equals' | 'includes' | 'not_equals';  // Como comparar
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
  
  // Campos específicos para terms-checkbox
  termsText?: string;            // Texto antes dos links (ex: "Li e concordo com a")
  links?: Array<{               // Links para termos e políticas
    text: string;               // Texto do link
    url: string;                // URL do link
  }>;
  
  validation?: {                 // Validações extras (para implementar depois)
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Estrutura de um step/passo (agora com condições)
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
  
  // NOVAS PROPRIEDADES PARA FLUXOS CONDICIONAIS
  condition?: StepCondition;     // Condição simples para mostrar o step
  showIf?: (answers: FormData) => boolean;  // Função customizada mais complexa
}

// Configuração completa do multistep (agora com navegação customizada)
export interface MultistepConfig {
  id: string;                    // ID único da configuração
  title: string;                 // Título geral do formulário
  steps: Step[];                 // Array com todos os steps
  category?: string;             // Categoria associada (ex: "3231")
  
  // NOVA PROPRIEDADE PARA LÓGICA DE NAVEGAÇÃO CUSTOMIZADA
  getNextStep?: (currentStepId: string, answers: FormData) => string | null;
}

// Estrutura dos dados preenchidos pelo usuário (sem alteração)
export interface FormData {
  [stepId: string]: {            // Cada step tem seus dados
    [fieldId: string]: string | string[];  // Cada campo pode ser string ou array (checkbox)
  };
}

// NOVAS FUNÇÕES HELPER PARA TRABALHAR COM CONDIÇÕES

/**
 * Verifica se um step deve ser exibido baseado nas respostas atuais
 */
export function shouldShowStep(step: Step, answers: FormData): boolean {
  // Se tem função showIf customizada, usa ela
  if (step.showIf) {
    return step.showIf(answers);
  }
  
  // Se tem condição simples, verifica
  if (step.condition) {
    return checkStepCondition(step.condition, answers);
  }
  
  // Se não tem condição, sempre mostra
  return true;
}

/**
 * Verifica uma condição simples
 */
export function checkStepCondition(condition: StepCondition, answers: FormData): boolean {
  const { field, value, operator = 'equals' } = condition;
  
  // Busca o valor do campo nas respostas (precisa navegar pelos steps)
  const fieldValue = getFieldValue(field, answers);
  
  switch (operator) {
    case 'equals':
      return fieldValue === value;
    
    case 'includes':
      if (Array.isArray(value)) {
        return Array.isArray(fieldValue) 
          ? value.some(v => fieldValue.includes(v))
          : value.includes(fieldValue as string);
      }
      return Array.isArray(fieldValue) 
        ? fieldValue.includes(value as string)
        : fieldValue === value;
    
    case 'not_equals':
      return fieldValue !== value;
    
    default:
      return fieldValue === value;
  }
}

/**
 * Busca o valor de um campo específico em todas as respostas
 */
export function getFieldValue(fieldId: string, answers: FormData): string | string[] | undefined {
  for (const stepData of Object.values(answers)) {
    if (stepData[fieldId] !== undefined) {
      return stepData[fieldId];
    }
  }
  return undefined;
}

/**
 * Retorna apenas os steps que devem ser exibidos baseado nas respostas
 */
export function getVisibleSteps(allSteps: Step[], answers: FormData): Step[] {
  return allSteps.filter(step => shouldShowStep(step, answers));
}

/**
 * Encontra o próximo step válido usando lógica customizada ou padrão
 */
export function getNextStepId(
  config: MultistepConfig, 
  currentStepId: string, 
  answers: FormData
): string | null {
  // Se tem função customizada, usa ela
  if (config.getNextStep) {
    return config.getNextStep(currentStepId, answers);
  }
  
  // Lógica padrão: próximo step visível na sequência
  const visibleSteps = getVisibleSteps(config.steps, answers);
  const currentIndex = visibleSteps.findIndex(step => step.id === currentStepId);
  
  if (currentIndex >= 0 && currentIndex < visibleSteps.length - 1) {
    return visibleSteps[currentIndex + 1].id;
  }
  
  return null; // Fim do fluxo
}

// Exemplo de como os dados ficam salvos (sem alteração):
// {
//   "paint-type": {
//     "paint-location": "interior"           // radio = string
//   },
//   "interior-areas": {
//     "interior-items": ["paredes", "teto"]  // checkbox = array
//   },
//   "interior-rooms-count": {
//     "room-count": "3-4"                    // radio = string
//   }
// }