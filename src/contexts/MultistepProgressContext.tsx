// contexts/MultistepProgressContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface MultistepProgressContextType {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  updateProgress: (current: number, total: number, title?: string) => void;
}

const MultistepProgressContext = createContext<MultistepProgressContextType | undefined>(undefined);

interface MultistepProgressProviderProps {
  children: ReactNode;
}

export function MultistepProgressProvider({ children }: MultistepProgressProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [stepTitle, setStepTitle] = useState('');

  const updateProgress = (current: number, total: number, title = '') => {
    setCurrentStep(current);
    setTotalSteps(total);
    setStepTitle(title);
  };

  return (
    <MultistepProgressContext.Provider 
      value={{ 
        currentStep, 
        totalSteps, 
        stepTitle, 
        updateProgress 
      }}
    >
      {children}
    </MultistepProgressContext.Provider>
  );
}

export function useMultistepProgress() {
  const context = useContext(MultistepProgressContext);
  if (context === undefined) {
    throw new Error('useMultistepProgress must be used within a MultistepProgressProvider');
  }
  return context;
}
