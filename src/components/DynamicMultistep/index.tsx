// components/DynamicMultistep.tsx - COM TRANSIÇÕES SUAVES CORRIGIDAS
'use client'


import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MultistepConfig, FormData, getVisibleSteps, getNextStepId } from '@/types/multistep';
import { DynamicField } from '@/components/DynamicField';
import { LoadingStep } from '@/components/LoadingStep';
import { getStepHeaderComponent, DefaultStepHeader } from '@/components/StepHeaders';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useMultistepProgress } from '@/contexts/MultistepProgressContext';
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
  // Estados para controle de transição melhorado
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [previousStepId, setPreviousStepId] = useState<string>('');


  const { submitForm, loading: submissionLoading, error: submissionError } = useFormSubmission();
  const { updateProgress } = useMultistepProgress();


  // CALCULAR STEPS VISÍVEIS BASEADO NAS RESPOSTAS
  const visibleSteps = useMemo(() => {
    return getVisibleSteps(config.steps, formData);
  }, [config.steps, formData]);


  // ENCONTRAR STEP ATUAL ENTRE OS VISÍVEIS
  const currentStepIndex = visibleSteps.findIndex(step => step.id === currentStepId);
  const currentStepConfig = visibleSteps[currentStepIndex];
  // ENCONTRAR STEP ANTERIOR PARA TRANSIÇÃO
  const previousStepConfig = visibleSteps.find(step => step.id === previousStepId);


  // NAVEGAÇÃO BASEADA EM STEPS VISÍVEIS
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;


  // ATUALIZAR PROGRESSO NO CONTEXTO SEMPRE QUE MUDAR
  useEffect(() => {
    if (visibleSteps.length > 0 && currentStepConfig) {
      updateProgress(
        currentStepIndex,
        visibleSteps.length,
        currentStepConfig.title
      );
    }
  }, [currentStepIndex, visibleSteps.length, currentStepConfig?.title, updateProgress]);


  // FUNÇÃO PARA TRANSIÇÃO ENTRE STEPS - SISTEMA DE DOIS CONTAINERS COM DELAY CORRETO
  const transitionToStep = (newStepId: string, direction: 'forward' | 'backward') => {
    setPreviousStepId(currentStepId); // Salva o step atual como anterior
    setTransitionDirection(direction);
    setIsTransitioning(true);

    // Muda para o novo step imediatamente
    setCurrentStepId(newStepId);

    // Remove a transição após 900ms (300ms saída + 300ms delay + 300ms entrada)
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousStepId(''); // Limpa o step anterior
    }, 900);
  };


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


  // NAVEGAÇÃO INTELIGENTE PARA PRÓXIMO STEP - COM LÓGICA PARA ÚLTIMO STEP
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
      // USAR LÓGICA CONDICIONAL PARA PRÓXIMO STEP COM TRANSIÇÃO
      const nextStepId = getNextStepId(config, currentStepId, formData);


      if (nextStepId) {
        // Verificar se o próximo step é o último - se for, não fazer transição
        const nextStepIndex = visibleSteps.findIndex(step => step.id === nextStepId);
        const isNextStepLast = nextStepIndex === visibleSteps.length - 1;

        if (isNextStepLast) {
          // Último step: mudança direta sem transição
          setCurrentStepId(nextStepId);
        } else {
          // Steps intermediários: com transição
          transitionToStep(nextStepId, 'forward');
        }
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
        transitionToStep(previousStepId, 'backward');
      }
    }
  };


  const getFieldValue = (fieldId: string, stepId: string = currentStepConfig.id) => {
    return formData[stepId]?.[fieldId] ||
      (visibleSteps.find(s => s.id === stepId)?.fields.find(f => f.id === fieldId)?.type === 'checkbox' ? [] : '');
  };


  // Função para avançar step (usado pelo LoadingStep) - COM LÓGICA PARA ÚLTIMO STEP
  const goToNextStep = () => {
    if (isLastStep) {
      onComplete?.(formData);
    } else {
      const nextStepId = getNextStepId(config, currentStepId, formData);
      if (nextStepId) {
        // Verificar se o próximo step é o último - se for, não fazer transição
        const nextStepIndex = visibleSteps.findIndex(step => step.id === nextStepId);
        const isNextStepLast = nextStepIndex === visibleSteps.length - 1;

        if (isNextStepLast) {
          // Último step: mudança direta sem transição
          setCurrentStepId(nextStepId);
        } else {
          // Steps intermediários: com transição
          transitionToStep(nextStepId, 'forward');
        }
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

  // Renderizar header do step anterior (para transição)
  const renderPreviousStepHeader = () => {
    if (!previousStepConfig) return null;
    
    if (previousStepConfig.headerComponent) {
      const CustomHeaderComponent = getStepHeaderComponent(previousStepConfig.headerComponent);
      if (CustomHeaderComponent) {
        return <CustomHeaderComponent />;
      }
    }

    return (
      <DefaultStepHeader
        title={previousStepConfig.title}
        subtitle={previousStepConfig.subtitle}
      />
    );
  };


  // FUNÇÃO PARA RENDERIZAR O CONTEÚDO DE UM STEP
  const renderStepContent = (stepConfig: any, stepId: string) => {
    if (stepConfig.type === 'loading') {
      return (
        <LoadingStep
          onComplete={goToNextStep}
          duration={stepConfig.duration || 3000}
        />
      );
    }


    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {stepConfig.fields.map((field: any) => (
            <DynamicField
              key={field.id}
              field={field}
              value={getFieldValue(field.id, stepId)}
              onChange={(value) => handleFieldChange(field.id, value)}
            />
          ))}
        </div>
      </div>
    );
  };


  // Se for step de loading, renderiza componente especial
  if (currentStepConfig.type === 'loading' && !isTransitioning) {
    return (
      <div>
        {renderStepHeader()}
        <div className="p-6 bg-white rounded-[8px] shadow-lg">
          <LoadingStep
            onComplete={goToNextStep}
            duration={currentStepConfig.duration || 3000}
          />
        </div>
      </div>
    );
  }


  // CLASSES PARA TRANSIÇÃO DO HEADER ATUAL
  const getHeaderClasses = () => {
    if (!isTransitioning) {
      return '';
    }

    if (transitionDirection === 'forward') {
      return 'slide-in-from-right-delayed';
    } else {
      return 'slide-in-from-left-delayed';
    }
  };

  // CLASSES PARA TRANSIÇÃO DO HEADER ANTERIOR
  const getPreviousHeaderClasses = () => {
    if (!isTransitioning) return 'hidden';

    const baseClasses = 'absolute inset-0';

    if (transitionDirection === 'forward') {
      return `${baseClasses} animate-[slideOutToLeft_300ms_ease-in_forwards]`;
    } else {
      return `${baseClasses} animate-[slideOutToRight_300ms_ease-in_forwards]`;
    }
  };

  // CLASSES PARA TRANSIÇÃO DO STEP ANTERIOR (saindo)
  const getPreviousStepClasses = () => {
    if (!isTransitioning) return 'hidden';

    const baseClasses = 'absolute inset-0 p-6 bg-white rounded-[8px]';

    if (transitionDirection === 'forward') {
      return `${baseClasses} animate-[slideOutToLeft_300ms_ease-in_forwards]`;
    } else {
      return `${baseClasses} animate-[slideOutToRight_300ms_ease-in_forwards]`;
    }
  };


  // CLASSES PARA TRANSIÇÃO DO STEP ATUAL (entrando) - COM DELAY
  const getCurrentStepClasses = () => {
    if (!isTransitioning) {
      return 'p-6 bg-white rounded-[8px] shadow-lg';
    }

    const baseClasses = 'p-6 bg-white rounded-[8px] shadow-lg';

    if (transitionDirection === 'forward') {
      return `${baseClasses} slide-in-from-right-delayed`;
    } else {
      return `${baseClasses} slide-in-from-left-delayed`;
    }
  };


  return (
    <div>
      {/* HEADER COM TRANSIÇÃO */}
      <div className="relative">
        {/* Header anterior (saindo) */}
        {isTransitioning && previousStepConfig && (
          <div className={getPreviousHeaderClasses()}>
            {renderPreviousStepHeader()}
          </div>
        )}

        {/* Header atual (entrando ou estático) */}
        <div className={getHeaderClasses()}>
          {renderStepHeader()}
        </div>
      </div>

      <style jsx global>{`
       @keyframes slideOutToLeft {
         from {
           opacity: 1;
           transform: translateX(0);
         }
         to {
           opacity: 0;
           transform: translateX(-32rem);
         }
       }
      
       @keyframes slideOutToRight {
         from {
           opacity: 1;
           transform: translateX(0);
         }
         to {
           opacity: 0;
           transform: translateX(32rem);
         }
       }
      
       @keyframes slideInFromRight {
         from {
           opacity: 0;
           transform: translateX(32rem);
         }
         to {
           opacity: 1;
           transform: translateX(0);
         }
       }
      
       @keyframes slideInFromLeft {
         from {
           opacity: 0;
           transform: translateX(-32rem);
         }
         to {
           opacity: 1;
           transform: translateX(0);
         }
       }

       /* Classes com delay de 300ms - mais rápido */
       .slide-in-from-right-delayed {
         opacity: 0;
         transform: translateX(32rem);
         animation: slideInFromRight 300ms ease-out 300ms forwards;
       }
       
       .slide-in-from-left-delayed {
         opacity: 0;
         transform: translateX(-32rem);
         animation: slideInFromLeft 300ms ease-out 300ms forwards;
       }
     `}</style>

      <div className="relative" style={{ minHeight: '400px' }}>

        {isTransitioning && previousStepConfig && (
          <div className={getPreviousStepClasses()}>
            {submissionError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {submissionError}
              </div>
            )}

            {renderStepContent(previousStepConfig, previousStepId)}

            <div className="flex justify-between gap-4 pt-4 mt-6">
              <Button variant="outline" disabled className="flex-1">
                Voltar
              </Button>
              <Button disabled className="flex-1">
                Próximo
              </Button>
            </div>
          </div>
        )}

        <div className={getCurrentStepClasses()}>
          {submissionError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submissionError}
            </div>
          )}


          {renderStepContent(currentStepConfig, currentStepId)}


          <div className="flex justify-between gap-4 pt-4 mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep || submissionLoading || isTransitioning}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={submissionLoading || isTransitioning}
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
    </div>
  );
}