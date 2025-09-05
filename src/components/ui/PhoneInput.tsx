// components/ui/PhoneInput.tsx
'use client'

import { forwardRef, useState, useEffect } from 'react'
import { Input } from './input'

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  required?: boolean
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = '', onChange, placeholder, className, required }, ref) => {
    const [displayValue, setDisplayValue] = useState('')

    // Função para formatar o telefone
    const formatPhone = (phone: string): string => {
      // Remove tudo que não é número
      const numbers = phone.replace(/\D/g, '')
      
      // Limita a 11 dígitos (DDD + 9 dígitos)
      const limitedNumbers = numbers.slice(0, 11)
      
      // Aplica a formatação baseado na quantidade de dígitos
      if (limitedNumbers.length <= 2) {
        return limitedNumbers
      } else if (limitedNumbers.length <= 3) {
        return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
      } else if (limitedNumbers.length <= 7) {
        return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 3)} ${limitedNumbers.slice(3)}`
      } else {
        return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 3)} ${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
      }
    }

    // Função para extrair apenas os números
    const getCleanValue = (formattedValue: string): string => {
      return formattedValue.replace(/\D/g, '')
    }

    // Atualiza o display quando o value prop muda
    useEffect(() => {
      if (value) {
        setDisplayValue(formatPhone(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const formatted = formatPhone(inputValue)
      const cleanValue = getCleanValue(formatted)
      
      setDisplayValue(formatted)
      
      // Chama onChange com o valor limpo (só números)
      if (onChange) {
        onChange(cleanValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permite teclas de navegação e edição
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
        'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'
      ]
      
      // Permite números
      const isNumber = /^\d$/.test(e.key)
      
      if (!allowedKeys.includes(e.key) && !isNumber) {
        e.preventDefault()
      }
    }

    return (
      <Input
        ref={ref}
        type="tel"
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || '(11) 9 9999-9999'}
        className={className}
        required={required}
        maxLength={16} // Máximo para o formato completo
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'