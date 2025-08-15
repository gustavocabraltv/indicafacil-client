import React from 'react';

const TimelineItem = ({ 
  icon, 
  title, 
  description, 
  status = 'pending', // 'completed', 'current', 'pending'
  isLast = false 
}) => {
  const getIconStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-blue-500 border-blue-500';
      case 'current':
        return 'bg-black border-black';
      case 'pending':
        return 'bg-gray-300 border-gray-300';
      default:
        return 'bg-gray-300 border-gray-300';
    }
  };

  const getLineColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-black';
      case 'current':
        return 'bg-gray-300';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getTitleStyles = () => {
    switch (status) {
      case 'completed':
      case 'current':
        return 'text-black font-semibold';
      case 'pending':
        return 'text-gray-400 font-normal';
      default:
        return 'text-gray-400 font-normal';
    }
  };

  const getDescriptionStyles = () => {
    switch (status) {
      case 'completed':
      case 'current':
        return 'text-gray-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getIconSize = () => {
    switch (status) {
      case 'current':
        return 'w-4 h-4'; // Bolinha preta mantém tamanho original
      case 'completed':
      case 'pending':
        return 'w-2 h-2'; // Outras bolinhas ficam menores
      default:
        return 'w-2 h-2';
    }
  };

  return (
    <div className="relative flex items-start pb-8 last:pb-0">
      {/* Vertical line - positioned absolutely to connect circles */}
      {!isLast && (
        <div className={`absolute left-2 w-0.5 ${getLineColor()}`} 
             style={{ top: '20px', height: 'calc(100% - 24px)' }}>
        </div>
      )}
      
      {/* Icon circle container - SEMPRE w-4 h-4 para manter alinhamento */}
      <div className="relative z-10 w-4 h-4 flex items-center justify-center flex-shrink-0">
        {/* A bolinha real com tamanho variável DENTRO do container fixo */}
        <div className={`${getIconSize()} rounded-full border-2 ${getIconStyles()}`}>
          {icon && (
            <div className="w-full h-full flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="ml-6">
        <h3 className={`text-base leading-tight ${getTitleStyles()}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm mt-1 leading-relaxed ${getDescriptionStyles()}`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const Timeline = ({ items }) => {
  return (
    <div className="max-w-md mx-auto px-6 bg-white">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          status={item.status}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

// Exemplo de uso
const App = () => {
  const timelineData = [
    {
      title: "Chama no WhatsApp",
      status: "completed"
    },
    {
      title: "Peça um orçamento grátis",
      description: "Receba um orçamento detalhado com custos de mão de obra e materiais.",
      status: "current"
    },
    {
      title: "Contrate apenas se quiser",
      status: "pending"
    }
  ];

  return (
    <div>
      <Timeline items={timelineData} />
      
      {/* Exemplo com customização adicional */}
      {/* <div className="mt-12 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Exemplo Customizável</h2>
        <Timeline 
          items={[
            {
              title: "Primeiro passo",
              description: "Descrição do primeiro passo do processo",
              status: "completed"
            },
            {
              title: "Segundo passo",
              description: "Este é o passo atual em andamento",
              status: "current"
            },
            {
              title: "Terceiro passo",
              description: "Passo ainda não iniciado",
              status: "pending"
            },
            {
              title: "Quarto passo",
              status: "pending"
            }
          ]} 
        />
      </div> */}
    </div>

    
  );
};

export default App;