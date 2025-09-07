// components/HeaderStepper.tsx
'use client'

import { useMultistepProgress } from '@/contexts/MultistepProgressContext';

import {
    Stepper,
    StepperDescription,
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
    const { currentStep, totalSteps, stepTitle } = useMultistepProgress();

    // Não renderizar se não há dados de progresso
    if (totalSteps === 0) {
        return <div className='bg-white h-18 w-full'></div>;
    }

    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className='bg-white h-24 w-full px-8 py-4 shadow-sm border-b'>


            <div className="space-y-8 text-center">
                <Stepper defaultValue={2}>
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


            {/* <div className="max-w-2xl mx-auto space-y-3">
   
        {stepTitle && (
          <h2 className="text-lg font-medium text-gray-800 text-center">
            {stepTitle}
          </h2>
        )}
        
  
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 text-center">
          Etapa {currentStep + 1} de {totalSteps}
        </p>
      </div> */}
        </div>
    );
}