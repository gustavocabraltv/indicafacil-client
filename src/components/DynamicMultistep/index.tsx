// components/DynamicMultistep.tsx - ATUALIZADO COM CONTEXT
'use client'

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MultistepConfig, FormData, getVisibleSteps, getNextStepId } from '@/types/multistep';
import { DynamicField } from '@/components/DynamicField';
import { LoadingStep } from '@/components/LoadingStep';
import { getStepHeaderComponent, DefaultStepHeader } from '@/components/StepHeaders';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useMultistepProgress } from '@/contexts/MultistepProgressContext'; // 🆕
import Image from 'next/image'

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
  const [currentStepId, setCurrentStepId] = useState(config.steps[0]?.id || '');
  const [formData, setFormData] = useState<FormData>(initialData);

  const { submitForm, loading: submissionLoading, error: submissionError } = useFormSubmission();
  const { updateProgress } = useMultistepProgress(); // 🆕

  // CALCULAR STEPS VISÍVEIS BASEADO NAS RESPOSTAS
  const visibleSteps = useMemo(() => {
    return getVisibleSteps(config.steps, formData);
  }, [config.steps, formData]);

  // ENCONTRAR STEP ATUAL ENTRE OS VISÍVEIS
  const currentStepIndex = visibleSteps.findIndex(step => step.id === currentStepId);
  const currentStepConfig = visibleSteps[currentStepIndex];

  // NAVEGAÇÃO BASEADA EM STEPS VISÍVEIS
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  // 🆕 ATUALIZAR PROGRESSO NO CONTEXTO SEMPRE QUE MUDAR
  useEffect(() => {
    if (visibleSteps.length > 0 && currentStepConfig) {
      updateProgress(
        currentStepIndex,
        visibleSteps.length,
        currentStepConfig.title
      );
    }
  }, [currentStepIndex, visibleSteps.length, currentStepConfig?.title, updateProgress]);

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

  // NAVEGAÇÃO INTELIGENTE PARA PRÓXIMO STEP
  const handleNext = async () => {
    if (!validateStep()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (isLastStep) {
      // Verificar se category existe
      if (!config.category) {
        alert('Erro: Categoria do serviço não encontrada');
        return;
      }

      // Salvar no Supabase
      const result = await submitForm({
        categoryId: config.category,
        formData
      });

      if (result.success) {
        onComplete?.(formData);
        console.log('Formulário salvo no Supabase!', result.data);
      } else {
        alert(`Erro: ${result.error}`);
      }
    } else {
      // USAR LÓGICA CONDICIONAL PARA PRÓXIMO STEP
      const nextStepId = getNextStepId(config, currentStepId, formData);

      if (nextStepId) {
        setCurrentStepId(nextStepId);
      } else {
        // Se não há próximo step, finalizar
        onComplete?.(formData);
      }
    }
  };

  // NAVEGAÇÃO INTELIGENTE PARA STEP ANTERIOR
  const handlePrevious = () => {
    if (!isFirstStep) {
      const previousStepId = visibleSteps[currentStepIndex - 1]?.id;
      if (previousStepId) {
        setCurrentStepId(previousStepId);
      }
    }
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
      const nextStepId = getNextStepId(config, currentStepId, formData);
      if (nextStepId) {
        setCurrentStepId(nextStepId);
      } else {
        onComplete?.(formData);
      }
    }
  };

  // VERIFICAÇÃO DE SEGURANÇA
  if (!currentStepConfig) {
    console.error('Step atual não encontrado:', currentStepId);
    console.log('Steps visíveis:', visibleSteps.map(s => s.id));
    console.log('FormData atual:', formData);
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
        Erro: Step não encontrado. Recarregue a página.
      </div>
    );
  }

  // Renderizar header customizado
  const renderStepHeader = () => {
    if (currentStepConfig.headerComponent) {
      const CustomHeaderComponent = getStepHeaderComponent(currentStepConfig.headerComponent);
      if (CustomHeaderComponent) {
        return <CustomHeaderComponent />;
      }
    }

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
          duration={currentStepConfig.duration || 3000}
        />
      </div>
    );
  }

  return (
    <div>
      {renderStepHeader()}
      <div className="p-6 bg-white rounded-[8px] shadow-lg">


        {/* <div className="mx-auto max-w-4xl space-y-4 text-center mb-6">

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / visibleSteps.length) * 100}%`
              }}
            />
          </div>





          <div className="flex gap-2 items-center justify-center text-sm">
            <Image src="/shield-green.svg" alt="Shield" width={20} height={20} />
            {(() => {
              switch (currentStepIndex) {
                case 0:
                  return "Receba até 3 orçamentos grátis!";
                case 1:
                  return "Orçamentos rápidos e seguros";
                case 2:
                  return "Receba até 3 orçamentos grátis!";
                default:
                  return "Você está indo bem, agora falta pouco!";
              }
            })()}
          </div>

        </div> */}


        {submissionError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {submissionError}
          </div>
        )}

        {/* 🚫 REMOVIDO - Progress bar agora está no header */}
        {/* Progress bar foi movido para HeaderStepper */}

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
            disabled={isFirstStep || submissionLoading}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={submissionLoading}
            className="flex-1"
          >
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




{/* <div className="mx-auto max-w-4xl space-y-4 text-center mb-6">
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{ 
      width: `${((currentStepIndex + 1) / visibleSteps.length) * 100}%` 
    }}
  />
</div>
<p className="text-sm text-gray-600">
  Etapa {currentStepIndex + 1} de {visibleSteps.length}
</p>
</div>  */}