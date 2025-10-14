// configs/categories/quick/reparo-de-telhados-quick.ts
import { MultistepConfig } from '@/types/multistep';

export const reparo_telhados_quick: MultistepConfig = {
  id: 'reparo-de-telhados-service',
  title: 'Serviço de Reparo de Telhados',
  category: 'reparo-de-telhados',
  steps: [
    // 1) Onde será o serviço? (Casa / Apartamento / Empresa)
    {
      id: 'job-context',
      title: 'Onde será o serviço?',
      fields: [
        {
          id: 'property-context',
          type: 'radio',
          label: 'Selecione uma opção',
          required: true,
          options: [
            { value: 'casa', label: 'Casa' },
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'comercial', label: 'Empresa / Comercial' },
          ],
        },
      ],
    },

    // 2) Prazo (quando precisa)
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
            { value: 'urgente', label: 'Urgente' },
            { value: '1-semana', label: 'Em até 1 semana' },
            { value: '15-dias', label: 'Entre 1 e 2 semanas' },
            { value: '2-semanas-mais', label: 'Mais de 2 semanas' },
            { value: 'sem-data', label: 'Ainda não tenho data' },
          ],
        },
      ],
    },

    // 3) Campo aberto (detalhes livres)
    {
        id: 'extra-details',
        title: 'Quer compartilhar mais algum detalhe?',
        fields: [
          {
            id: 'additional-details',
            type: 'textarea',
            label: 'Detalhes do serviço',
            placeholder: 'Conte um pouco mais sobre o projeto (ex.: vazamentos, telhas quebradas, tipo de telhado, área afetada...)',
            required: false,
          },
        ],
      },

    // 4) Loading -> auto-advance
    {
      id: 'searching-professionals',
      title: '',
      type: 'loading',
      fields: [],
      autoAdvance: true,
      duration: 3000, // 3s
    },

    // 5) Contato (mantido do seu snippet)
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
          placeholder: 'DDD + Telefone',
        },
        {
          id: 'terms-agreement',
          type: 'terms-checkbox',
          label: '',
          required: true,
          termsText: 'Li e concordo com os',
          links: [
            { text: 'termos de uso', url: '/politica-privacidade' },
          ],
        },
      ],
    },
  ],
};