// components/DynamicMultistep.tsx - COM VALIDAÇÃO VISUAL (ajustes de lint aplicados)
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MultistepConfig,
  FormData,
  getVisibleSteps,
  getNextStepId,
} from "@/types/multistep";
import { DynamicField } from "@/components/DynamicField";
import { LoadingStep } from "@/components/LoadingStep";
import {
  getStepHeaderComponent,
  DefaultStepHeader,
} from "@/components/StepHeaders";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useMultistepProgress } from "@/contexts/MultistepProgressContext";

interface DynamicMultistepProps {
  config: MultistepConfig;
  onComplete?: (data: FormData) => void;
  initialData?: FormData;
}

export function DynamicMultistep({
  config,
  onComplete,
  initialData = {},
}: DynamicMultistepProps) {
  const [currentStepId, setCurrentStepId] = useState(config.steps[0]?.id || "");
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [previousStepId, setPreviousStepId] = useState<string>("");

  const {
    submitForm,
    loading: submissionLoading,
    error: submissionError,
  } = useFormSubmission();
  const { updateProgress } = useMultistepProgress();

  const visibleSteps = useMemo(() => {
    return getVisibleSteps(config.steps, formData);
  }, [config.steps, formData]);

  const currentStepIndex = visibleSteps.findIndex(
    (step) => step.id === currentStepId
  );
  const currentStepConfig = visibleSteps[currentStepIndex];
  const previousStepConfig = visibleSteps.find(
    (step) => step.id === previousStepId
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  // ✅ Corrigido: deps estáveis usando propriedades do objeto
  useEffect(() => {
    if (visibleSteps.length > 0 && currentStepConfig?.id) {
      updateProgress(
        currentStepIndex,
        visibleSteps.length,
        currentStepConfig?.title || ""
      );
    }
  }, [
    currentStepIndex,
    visibleSteps.length,
    currentStepConfig?.id,
    currentStepConfig?.title,
    updateProgress,
  ]);

  // ✅ Validação em tempo real (mantida)
  const isCurrentStepValid = useMemo(() => {
    if (!currentStepConfig || currentStepConfig.type === "loading") {
      return true;
    }

    const stepData = formData[currentStepConfig.id] || {};

    for (const field of currentStepConfig.fields) {
      if (field.required && !stepData[field.id]) {
        return false;
      }

      if (field.type === "checkbox" && field.required) {
        const values = stepData[field.id] as string[];
        if (!values || values.length === 0) {
          return false;
        }
      }
    }

    return true;
  }, [currentStepConfig, formData]);

  const transitionToStep = (
    newStepId: string,
    direction: "forward" | "backward"
  ) => {
    setPreviousStepId(currentStepId);
    setTransitionDirection(direction);
    setIsTransitioning(true);
    setCurrentStepId(newStepId);

    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousStepId("");
    }, 900);
  };

  const handleFieldChange = (fieldId: string, value: string | string[]) => {
    if (!currentStepConfig?.id) return;
    setFormData((prev) => ({
      ...prev,
      [currentStepConfig.id]: {
        ...prev[currentStepConfig.id],
        [fieldId]: value,
      },
    }));
  };

  // ❌ Removido: validateStep não era usado (resolvido o warning)

  // ✅ Usa validação visual
  const handleNext = async () => {
    if (!isCurrentStepValid) {
      return;
    }

    if (isLastStep) {
      if (!config.category) {
        console.error("Erro: Categoria do serviço não encontrada");
        return;
      }

      const result = await submitForm({
        categoryId: config.category,
        formData,
      });

      if (result.success) {
        onComplete?.(formData);
        console.log("Formulário salvo no Supabase!", result.data);
      } else {
        console.error(`Erro: ${result.error}`);
      }
    } else {
      const nextStepId = getNextStepId(config, currentStepId, formData);

      if (nextStepId) {
        const nextStepIndex = visibleSteps.findIndex(
          (step) => step.id === nextStepId
        );
        const isNextStepLast = nextStepIndex === visibleSteps.length - 1;

        if (isNextStepLast) {
          setCurrentStepId(nextStepId);
        } else {
          transitionToStep(nextStepId, "forward");
        }
      } else {
        onComplete?.(formData);
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      if (isLastStep) {
        let targetIndex = currentStepIndex - 1;

        while (
          targetIndex >= 0 &&
          visibleSteps[targetIndex]?.type === "loading"
        ) {
          targetIndex--;
        }

        if (targetIndex >= 0) {
          const targetStepId = visibleSteps[targetIndex]?.id;
          if (targetStepId) {
            transitionToStep(targetStepId, "backward");
          }
        }
      } else {
        const previousStepId = visibleSteps[currentStepIndex - 1]?.id;
        if (previousStepId) {
          transitionToStep(previousStepId, "backward");
        }
      }
    }
  };

  const getFieldValue = (
    fieldId: string,
    stepId: string = currentStepConfig?.id || ""
  ) => {
    if (!stepId) return "";
    const currentValue = formData[stepId]?.[fieldId];

    if (
      currentValue !== undefined &&
      currentValue !== null &&
      currentValue !== ""
    ) {
      return currentValue;
    }

    const field = visibleSteps
      .find((s) => s.id === stepId)
      ?.fields.find((f) => f.id === fieldId);

    if (!field) {
      return "";
    }

    if (field.type === "terms-checkbox") {
      if (formData[stepId]?.[fieldId] === undefined) {
        setFormData((prev) => ({
          ...prev,
          [stepId]: {
            ...prev[stepId],
            [fieldId]: "accepted",
          },
        }));

        return "accepted";
      }

      return currentValue || "";
    }

    if (field.type === "radio" && field.options && field.options.length > 0) {
      const firstOption = field.options[0];

      setFormData((prev) => ({
        ...prev,
        [stepId]: {
          ...prev[stepId],
          [fieldId]: firstOption.value,
        },
      }));

      return firstOption.value;
    }

    if (field.type === "checkbox") {
      return [];
    }

    return "";
  };

  const goToNextStep = () => {
    if (isLastStep) {
      onComplete?.(formData);
    } else {
      const nextStepId = getNextStepId(config, currentStepId, formData);
      if (nextStepId) {
        const nextStepIndex = visibleSteps.findIndex(
          (step) => step.id === nextStepId
        );
        const isNextStepLast = nextStepIndex === visibleSteps.length - 1;

        if (isNextStepLast) {
          setCurrentStepId(nextStepId);
        } else {
          transitionToStep(nextStepId, "forward");
        }
      } else {
        onComplete?.(formData);
      }
    }
  };

  if (!currentStepConfig) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
        Erro: Step não encontrado. Recarregue a página.
      </div>
    );
  }

  const renderStepHeader = () => {
    if (currentStepConfig.headerComponent) {
      const CustomHeaderComponent = getStepHeaderComponent(
        currentStepConfig.headerComponent
      );
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

  const renderPreviousStepHeader = () => {
    if (!previousStepConfig) return null;

    if (previousStepConfig.headerComponent) {
      const CustomHeaderComponent = getStepHeaderComponent(
        previousStepConfig.headerComponent
      );
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

  const renderStepContent = (
    stepConfig: typeof currentStepConfig,
    stepId: string
  ) => {
    if (stepConfig.type === "loading") {
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
          {stepConfig.fields.map((field) => (
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

  const shouldShowBackButton = () => {
    if (isFirstStep) return false;

    if (isLastStep) {
      let targetIndex = currentStepIndex - 1;
      while (
        targetIndex >= 0 &&
        visibleSteps[targetIndex]?.type === "loading"
      ) {
        targetIndex--;
      }
      return targetIndex >= 0;
    }

    return true;
  };

  // ✅ Botões com validação
  const renderStepButtons = (
    stepConfig: typeof currentStepConfig,
    isPrevious = false
  ) => {
    if (stepConfig.type === "loading") {
      return null;
    }

    if (isFirstStep) {
      return (
        <div className="pt-4 mt-6">
          <Button
            onClick={handleNext}
            disabled={
              !isCurrentStepValid ||
              submissionLoading ||
              isTransitioning ||
              isPrevious
            }
            className="w-full"
          >
            {submissionLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Salvando...
              </div>
            ) : isLastStep ? (
              "Finalizar"
            ) : (
              "Próximo"
            )}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex justify-between gap-4 pt-4 mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={
            !shouldShowBackButton() ||
            submissionLoading ||
            isTransitioning ||
            isPrevious
          }
          className="flex-1"
          style={{
            opacity: !shouldShowBackButton() ? 0.5 : 1,
            cursor: !shouldShowBackButton() ? "not-allowed" : "pointer",
          }}
        >
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            !isCurrentStepValid ||
            submissionLoading ||
            isTransitioning ||
            isPrevious
          }
          className="flex-1"
        >
          {submissionLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Salvando...
            </div>
          ) : isLastStep ? (
            "Finalizar"
          ) : (
            "Próximo"
          )}
        </Button>
      </div>
    );
  };

  if (currentStepConfig.type === "loading" && !isTransitioning) {
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

  const getHeaderClasses = () => {
    if (!isTransitioning) {
      return "";
    }

    if (transitionDirection === "forward") {
      return "slide-in-from-right-delayed";
    } else {
      return "slide-in-from-left-delayed";
    }
  };

  const getPreviousHeaderClasses = () => {
    if (!isTransitioning) return "hidden";

    const baseClasses = "absolute inset-0";

    if (transitionDirection === "forward") {
      return `${baseClasses} animate-[slideOutToLeft_300ms_ease-in_forwards]`;
    } else {
      return `${baseClasses} animate-[slideOutToRight_300ms_ease-in_forwards]`;
    }
  };

  const getCurrentStepClasses = () => {
    if (!isTransitioning) {
      return "p-6 bg-white rounded-[8px] shadow-lg";
    }

    const baseClasses = "p-6 bg-white rounded-[8px] shadow-lg";

    if (transitionDirection === "forward") {
      return `${baseClasses} slide-in-from-right-delayed`;
    } else {
      return `${baseClasses} slide-in-from-left-delayed`;
    }
  };

  return (
    <div>
      <div className="relative">
        {isTransitioning && previousStepConfig && (
          <div className={getPreviousHeaderClasses()}>
            {renderPreviousStepHeader()}
          </div>
        )}

        <div className={getHeaderClasses()}>{renderStepHeader()}</div>
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

      <div className="relative" style={{ minHeight: "400px" }}>
        {isTransitioning && previousStepConfig && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <div
              className="p-6 bg-white rounded-[8px] shadow-lg"
              style={{
                animation:
                  transitionDirection === "forward"
                    ? "slideOutToLeft 300ms ease-in forwards"
                    : "slideOutToRight 300ms ease-in forwards",
              }}
            >
              {submissionError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {submissionError}
                </div>
              )}

              {renderStepContent(previousStepConfig, previousStepId)}
              {renderStepButtons(previousStepConfig, true)}
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
          {renderStepButtons(currentStepConfig)}
        </div>
      </div>
    </div>
  );
}
