// hooks/useFormSubmission.ts
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FormData } from '@/types/multistep'

interface SubmissionData {
  categoryId: string
  formData: FormData
}

interface ContactData {
  name?: string
  phone?: string
  email?: string
  [key: string]: unknown
}

export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitForm = async ({ categoryId, formData }: SubmissionData) => {
    setLoading(true)
    setError(null)

    try {
      // Extrair dados de contato do último step
      const contactStep = Object.values(formData).find(step => 
        step && 
        typeof step === 'object' && 
        step !== null &&
        ('name' in step || 'phone' in step)
      ) as ContactData | undefined

      // Preparar dados para inserção
      const submissionData = {
        category_id: categoryId,
        user_name: contactStep?.name || null,
        user_phone: contactStep?.phone || null,
        user_email: contactStep?.email || null,
        form_data: formData
      }

      const { data, error: supabaseError } = await supabase
        .from('form_submissions')
        .insert([submissionData])
        .select()
        .single()

      if (supabaseError) {
        throw supabaseError
      }

      return { success: true, data }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar formulário'
      setError(errorMessage)
      console.error('Erro na submissão:', err)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    submitForm,
    loading,
    error
  }
}