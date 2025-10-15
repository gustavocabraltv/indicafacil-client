// components/HeaderStepper.tsx
'use client'

import { useMultistepProgress } from '@/contexts/MultistepProgressContext';

import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"

const steps = [
    {
        step: 1,
        title: "Serviço",
    },
    {
        step: 2,
        title: "Detalhes",
    },
    {
        step: 3,
        title: "Contato",
    },
]

export function HeaderStepper() {
    const { currentStep, totalSteps } = useMultistepProgress();

    // Não renderizar se não há dados de progresso
    if (totalSteps === 0) {
        return <div className='bg-white h-18 w-full'></div>;
    }

    // Lógica: sempre step 2 (Detalhes), exceto no penúltimo step que vai para step 3 (Contato)
    const getStepperValue = () => {
        // Se está no penúltimo step, mostrar step 3 (Contato)
        if (currentStep === totalSteps - 1) {
            return 3;
        }
        // Caso contrário, sempre step 2 (Detalhes)
        return 2;
    };

    const stepperValue = getStepperValue();
    // const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className='bg-white h-24 w-full px-8 py-4 shadow-sm border-b sticky top-0 z-50'>
            <div className="space-y-8 text-center">
                <Stepper defaultValue={2} value={stepperValue}>
                    {steps.map(({ step, title }) => (
                        <StepperItem
                            key={step}
                            step={step}
                            className="relative flex-1 flex-col!"
                        >
                            <StepperTrigger className="flex-col gap-3 rounded">
                                <StepperIndicator />
                                <div className="space-y-0.5 px-2">
                                    <StepperTitle>{title}</StepperTitle>
                                </div>
                            </StepperTrigger>
                            {step < steps.length && (
                                <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                            )}
                        </StepperItem>
                    ))}
                </Stepper>
            </div>
        </div>
    );
}