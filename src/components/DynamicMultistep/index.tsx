// components/DynamicMultistep.tsx
'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MultistepConfig, FormData } from '@/types/multistep';
import { DynamicField } from '@/components/DynamicField';

interface DynamicMultistepProps {
  config: MultistepConfig;
  onComplete?: (data: FormData) => void;
  initialData?: FormData;
}

export function DynamicMultistep({ 
  config, 
  onComplete,
  initialData = {} 
}: DynamicMultistepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);

  const currentStepConfig = config.steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === config.steps.length - 1;

  const handleFieldChange = (fieldId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [currentStepConfig.id]: {
        ...prev[currentStepConfig.id],
        [fieldId]: value
      }
    }));
  };

  const validateStep = () => {
    const stepData = formData[currentStepConfig.id] || {};
    
    for (const field of currentStepConfig.fields) {
      if (field.required && !stepData[field.id]) {
        return false;
      }
      
      // Validação para checkbox (pelo menos uma opção)
      if (field.type === 'checkbox' && field.required) {
        const values = stepData[field.id] as string[];
        if (!values || values.length === 0) {
          return false;
        }
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (isLastStep) {
      onComplete?.(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const getFieldValue = (fieldId: string) => {
    return formData[currentStepConfig.id]?.[fieldId] || 
           (currentStepConfig.fields.find(f => f.id === fieldId)?.type === 'checkbox' ? [] : '');
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Passo {currentStep + 1} de {config.steps.length}</span>
        <span>{Math.round(((currentStep + 1) / config.steps.length) * 100)}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / config.steps.length) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{currentStepConfig.title}</h2>
          {currentStepConfig.description && (
            <p className="text-muted-foreground mt-2">{currentStepConfig.description}</p>
          )}
        </div>

        <div className="space-y-4">
          {currentStepConfig.fields.map(field => (
            <DynamicField
              key={field.id}
              field={field}
              value={getFieldValue(field.id)}
              onChange={(value) => handleFieldChange(field.id, value)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4 pt-4">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1"
        >
          {isLastStep ? 'Finalizar' : 'Próximo'}
        </Button>
      </div>
    </div>
  );
}