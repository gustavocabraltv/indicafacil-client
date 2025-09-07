// configs/service-categories.ts
import { MultistepConfig } from '@/types/multistep';
import { pinturaConfig } from './categories/pintura';

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
  '3231': pinturaConfig, // Agora importado do arquivo separado
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