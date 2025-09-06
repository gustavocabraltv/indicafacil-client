// components/LoadingStep.tsx
'use client'

import { useEffect, useState } from 'react'

interface LoadingStepProps {
  onComplete: () => void
  duration?: number
}

export const LoadingStep = ({ onComplete, duration = 5000 }: LoadingStepProps) => {
  const [showSecondMessage, setShowSecondMessage] = useState(false)

  useEffect(() => {
    // Troca a mensagem após 2 segundos
    const messageTimer = setTimeout(() => {
      setShowSecondMessage(true)
    }, 2000)

    // Completa o loading após a duração total
    const completeTimer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => {
      clearTimeout(messageTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete, duration])

  return (
    <div className="text-center py-12">
      {/* Spinner simples - depois você pode trocar por Lottie */}
      <div className="mb-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">
        Buscando Profissionais...
      </h3>
      
      <p className="text-muted-foreground">
        {showSecondMessage 
          ? "Aguarde mais alguns segundos" 
          : "Buscando profissionais perto de você"
        }
      </p>
    </div>
  )
}