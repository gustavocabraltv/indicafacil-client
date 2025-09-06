// components/StepHeaders.tsx
import React from 'react';
import Image from 'next/image';

// Componente para o step de dados de contato
export const ContactDataHeader = () => (
  <div className="text-center mb-8">
    <div className="mb-4 flex justify-center">
      {/* Você pode usar uma imagem local ou um ícone */}
     
      <Image src='/profissionais-2.png' width={118} height='0' alt='profissionais'/>
      {/* Ou use uma imagem real: */}
      {/* 
      <img 
        src="/images/contact-step.png" 
        alt="Quase lá!" 
        className="w-20 h-20 mx-auto mb-4"
      />
      */}
    </div>


    
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
    Encontramos profissionais perto de você em Criciúma
    </h2>
    
    <p className="text-gray-600 max-w-md mx-auto">
      Só precisamos dos seus dados para conectar você com os melhores profissionais da sua região
    </p>
  </div>
);

// Componente para step de loading
export const LoadingHeader = () => (
  <div className="text-center mb-8">
    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
      <svg 
        className="w-8 h-8 text-blue-600 animate-spin" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
    
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
      Buscando Profissionais...
    </h2>
    
    <p className="text-gray-600">
      Estamos conectando você com os melhores profissionais
    </p>
  </div>
);

// Componente genérico para outros steps
export const DefaultStepHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-600">
        {subtitle}
      </p>
    )}
  </div>
);

// Mapeamento de componentes por step ID
export const stepHeaderComponents: Record<string, React.ComponentType> = {
  'contact-data': ContactDataHeader,
  'searching-professionals': LoadingHeader,
};

// Função helper para obter o componente do header
export const getStepHeaderComponent = (stepId: string) => {
  return stepHeaderComponents[stepId] || null;
};