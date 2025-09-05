// components/DynamicMultistep.tsx
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger
} from "@/components/ui/stepper";
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

  // Convert config steps to stepper format
  const stepperSteps = config.steps.map((step, index) => ({
    step: index + 1,
    title: step.title,
  }));

  return (
    <div className="space-y-8">
      {/* OriginUI Stepper - Horizontal Progress Bar Style */}
      <div className="mx-auto max-w-4xl space-y-4 text-center hidden">
        {/* <Stepper value={currentStep + 1} className="items-start gap-4">
          {stepperSteps.map(({ step, title }, index) => (
            <StepperItem key={step} step={step} className="flex-1">
              <StepperTrigger 
                className="w-full flex-col items-start gap-2 rounded cursor-pointer"
                onClick={() => {
                  // Allow navigation to previous steps only
                  if (index < currentStep) {
                    setCurrentStep(index);
                  }
                }}
                disabled={index > currentStep}
              >
                <StepperIndicator asChild className="bg-border h-1 w-full">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
                <div className="space-y-0.5">
                  <StepperTitle className="text-sm font-medium">
                    {title}
                  </StepperTitle>
                </div>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper> */}

        {/* Progress percentage */}
        {/* <p className="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
          {Math.round(((currentStep + 1) / config.steps.length) * 100)}% concluído
        </p> */}
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