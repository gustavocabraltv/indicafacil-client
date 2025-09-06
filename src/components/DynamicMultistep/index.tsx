// components/DynamicMultistep.tsx - VERSÃO SIMPLIFICADA
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
import { LoadingStep } from '@/components/LoadingStep';
import { getStepHeaderComponent, DefaultStepHeader } from '@/components/StepHeaders';
import { useFormSubmission } from '@/hooks/useFormSubmission'; // 👈 ÚNICA ADIÇÃO

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
  
  // 👈 ÚNICA ADIÇÃO - Hook do Supabase
  const { submitForm, loading: submissionLoading, error: submissionError } = useFormSubmission();

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
    // Skip validation for loading steps
    if (currentStepConfig.type === 'loading') {
      return true;
    }

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

  // 👈 ÚNICA MUDANÇA PRINCIPAL - handleNext agora salva no Supabase
  const handleNext = async () => {
    if (!validateStep()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (isLastStep) {
      // Verificar se category existe
      if (!config.category) {
        alert('❌ Erro: Categoria do serviço não encontrada');
        return;
      }

      // 👈 SALVAR NO SUPABASE
      const result = await submitForm({
        categoryId: config.category,
        formData
      });

      if (result.success) {
        // Sucesso - chamar callback original
        onComplete?.(formData);
        console.log('✅ Formulário salvo no Supabase!', result.data);
      } else {
        // Erro - mostrar para o usuário
        alert(`❌ Erro: ${result.error}`);
      }
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

  // Função para avançar step (usado pelo LoadingStep)
  const goToNextStep = () => {
    if (isLastStep) {
      onComplete?.(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Convert config steps to stepper format
  const stepperSteps = config.steps.map((step, index) => ({
    step: index + 1,
    title: step.title,
  }));

  // Renderizar header customizado
  const renderStepHeader = () => {
    // Primeiro tenta buscar componente customizado
    if (currentStepConfig.headerComponent) {
      const CustomHeaderComponent = getStepHeaderComponent(currentStepConfig.headerComponent);
      if (CustomHeaderComponent) {
        return <CustomHeaderComponent />;
      }
    }
    
    // Fallback para header padrão
    return (
      <DefaultStepHeader 
        title={currentStepConfig.title} 
        subtitle={currentStepConfig.subtitle}
      />
    );
  };

  // Se for step de loading, renderiza componente especial
  if (currentStepConfig.type === 'loading') {
    return (
      <div className="p-6 bg-white rounded-[8px] shadow-lg">
        {renderStepHeader()}
        <LoadingStep
          onComplete={goToNextStep}
          duration={currentStepConfig.duration || 5000}
        />
      </div>
    );
  }

  return (
    <div>
      {renderStepHeader()}
      <div className="p-6 bg-white rounded-[8px] shadow-lg">
        {/* 👈 Mostrar erro de submissão se houver */}
        {submissionError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {submissionError}
          </div>
        )}

        {/* OriginUI Stepper - Horizontal Progress Bar Style */}
        <div className="mx-auto max-w-4xl space-y-4 text-center hidden">
          {/* Progress percentage */}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
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
            disabled={isFirstStep || submissionLoading} // 👈 Desabilitar durante submit
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={submissionLoading} // 👈 Desabilitar durante submit
            className="flex-1"
          >
            {/* 👈 Mostrar loading */}
            {submissionLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Salvando...
              </div>
            ) : (
              isLastStep ? 'Finalizar' : 'Próximo'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}