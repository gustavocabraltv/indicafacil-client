// configs/service-categories.ts
import { MultistepConfig } from '@/types/multistep';
import { pinturaConfig } from './categories/pintura';
import {pintura_quick} from './categories/quick/pintura-quick'
import { encanador_quick } from './categories/quick/encanador-quick'
import { marido_de_aluguel_quick } from './categories/quick/marido-de-aluguel-quick'
import { diarista_quick } from './categories/quick/diarista-quick'
import { jardineiro_quick } from './categories/quick/jardineiro-quick'
import { faz_tudo_quick } from './categories/quick/faz-tudo-quick'
import { arquiteto_quick } from './categories/quick/arquiteto-quick'
import { limpeza_quick } from './categories/quick/limpeza-domestica-quick'
import { calhas_quick } from './categories/quick/servico-de-calhas-quick'
import { encanamento_quick } from './categories/quick/servico-de-encanamento-quick'
import { servicos_de_reparo_quick } from './categories/quick/servico-de-reparo-quick'
import { reparo_telhados_quick } from './categories/quick/reparo-de-telhados-quick'



// Configurações que ainda precisam ser movidas para arquivos separados
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
    // ... resto dos steps do encanador permanecem iguais
  ]
};

export const eletricistaConfig: MultistepConfig = {
  id: 'eletricista-service',
  title: 'Serviço Elétrico',
  category: '3233',
  steps: [
    // ... steps do eletricista permanecem iguais
  ]
};

// Mapeamento das configurações por categoria
export const categoryConfigs: Record<string, MultistepConfig> = {
  'pintura': pintura_quick, // Agora importado do arquivo separado
  'encanador': encanador_quick, 
  'marido-de-aluguel': marido_de_aluguel_quick,
  'eletricista': marido_de_aluguel_quick,
  'pedreiro': marido_de_aluguel_quick,
  'diarista': diarista_quick,
  'jardineiro': jardineiro_quick,
  'faz-tudo': faz_tudo_quick,
  'arquiteto': arquiteto_quick,

  'limpeza-domestica': limpeza_quick,
  'servico-de-calhas': calhas_quick,
  'servico-de-encanamento': encanamento_quick,
  'servico-de-reparo': servicos_de_reparo_quick,
  'reparo-de-telhados': reparo_telhados_quick
  
};

// Função helper para buscar config por categoria
export const getConfigByCategory = (categoryId: string): MultistepConfig | null => {
  return categoryConfigs[categoryId] || null;
};

// Lista de categorias (pode vir de uma API depois)
export const serviceCategories = [
  { id: "pintura", name: "Pintura", icon: "🎨" },
  { id: "encanador", name: "Encanador", icon: "🔧" },
  { id: "marido-de-aluguel", name: "Marido de Aluguel", icon: "🔧" },
  { id: "eletricista", name: "Eletricista", icon: "🔧" },
  { id: "pedreiro", name: "Pedreiro", icon: "🔧" },
  { id: "diarista", name: "Diarista", icon: "🔧" },
  { id: "jardineiro", name: "Jardineiro", icon: "🔧" },
  { id: "faz-tudo", name: "Faz Tudo", icon: "🔧" },

  { id: "arquiteto", name: "Arquiteto", icon: "🔧" },
  { id: "limpeza-domestrica", name: "Limpeza Doméstica", icon: "🔧" },
  { id: "servico-de-calhas", name: "Serviços de Calha", icon: "🔧" },
  { id: "servico-de-encanamento", name: "Serviços de Encanamento", icon: "🔧" },
  { id: "servicos-de-reparo", name: "Serviços de Reparo", icon: "🔧" },
   { id: "reparo-de-telhados", name: "Reparo de Telhados", icon: "🔧" },
];