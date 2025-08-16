// ./src/components/Timeline/index.tsx
import React from "react";

type Status = "completed" | "current" | "pending";

interface TimelineItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  status?: Status;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  description,
  status = "pending",
  isLast = false,
}) => {
  const getIconStyles = (): string => {
    switch (status) {
      case "completed":
        return "bg-blue-500 border-blue-500";
      case "current":
        return "bg-black border-black";
      case "pending":
      default:
        return "bg-gray-300 border-gray-300";
    }
  };

  const getLineColor = (): string => {
    switch (status) {
      case "completed":
        return "bg-black";
      case "current":
      case "pending":
      default:
        return "bg-gray-300";
    }
  };

  const getTitleStyles = (): string => {
    switch (status) {
      case "completed":
      case "current":
        return "text-black font-semibold";
      case "pending":
      default:
        return "text-gray-400 font-normal";
    }
  };

  const getDescriptionStyles = (): string => {
    switch (status) {
      case "completed":
      case "current":
        return "text-gray-600";
      case "pending":
      default:
        return "text-gray-400";
    }
  };

  const getIconSize = (): string => {
    switch (status) {
      case "current":
        return "w-4 h-4";
      case "completed":
      case "pending":
      default:
        return "w-2 h-2";
    }
  };

  return (
    <div className="relative flex items-start pb-8 last:pb-0">
      {!isLast && (
        <div
          className={`absolute left-2 w-0.5 ${getLineColor()}`}
          style={{ top: "20px", height: "calc(100% - 24px)" }}
        />
      )}

      <div className="relative z-10 w-4 h-4 flex items-center justify-center flex-shrink-0">
        <div className={`${getIconSize()} rounded-full border-2 ${getIconStyles()}`}>
          {icon && <div className="w-full h-full flex items-center justify-center">{icon}</div>}
        </div>
      </div>

      <div className="ml-6">
        <h3 className={`text-base leading-tight ${getTitleStyles()}`}>{title}</h3>
        {description && (
          <p className={`text-sm mt-1 leading-relaxed ${getDescriptionStyles()}`}>{description}</p>
        )}
      </div>
    </div>
  );
};

interface TimelineItemData {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  status?: Status;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
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

// ——— Exemplo de uso local (remova em produção ou mova para uma página) ———
const App: React.FC = () => {
  const timelineData: TimelineItemData[] = [
    { title: "Chama no WhatsApp", status: "completed" },
    {
      title: "Peça um orçamento grátis",
      description: "Receba um orçamento detalhado com custos de mão de obra e materiais.",
      status: "current",
    },
    { title: "Contrate apenas se quiser", status: "pending" },
  ];

  return (
    <div>
      <Timeline items={timelineData} />
    </div>
  );
};

export default App;
