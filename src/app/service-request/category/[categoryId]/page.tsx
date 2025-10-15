// app/service-request/category/[categoryId]/page.tsx
'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { DynamicMultistep } from '@/components/DynamicMultistep'
import { getConfigByCategory, serviceCategories } from '@/configs/service-categories'
import type { FormData as Answers } from '@/types/multistep'
import { MultistepProgressProvider } from '@/contexts/MultistepProgressContext'
import { HeaderStepper } from '@/components/HeaderStepper'
import { FooterStepper } from '@/components/FooterStepper'

export default function CategoryPage() {
  const router = useRouter()
  const params = useParams<{ categoryId: string }>()
  const searchParams = useSearchParams()
  const categoryId = params?.categoryId

  // Carrega config e info já no topo
  const config = categoryId ? getConfigByCategory(categoryId) : undefined
  const categoryInfo = categoryId
    ? serviceCategories.find(cat => cat.id === categoryId)
    : undefined

  // initialData no formato NESTED (Answers = FormData do seu types/multistep.ts)
  const initialData = useMemo<Answers>(() => {
    // sem config ainda? retorna vazio
    if (!config) return {}

    const description = searchParams.get('description')
    const price = searchParams.get('price')
    const hasPrice = !!price && !Number.isNaN(Number(price))

    // lista de [fieldId, value] que queremos pré-preencher
    const entries: Array<[string, string | string[]]> = []
    if (description) entries.push(['service-description', description])
    if (hasPrice) entries.push(['estimated-price', String(parseInt(price as string, 10))])
    // se esse campo for array no seu schema, use:
    // if (hasPrice) entries.push(['estimated-price', [String(parseInt(price as string, 10))]])

    // Agrupa por stepId conforme o schema do config
    const result: Answers = {}
    for (const [fieldId, value] of entries) {
      // tenta localizar o step que possui esse field
      const step = config.steps.find(s => s.fields.some(f => f.id === fieldId))
      const stepId = step?.id ?? '__prefill__' // fallback opcional

      if (!result[stepId]) result[stepId] = {}
      result[stepId][fieldId] = value
    }
    return result
  }, [searchParams, config])

  // Redirecionamentos/validações
  useEffect(() => {
    if (!categoryId) {
      router.replace('/service-request')
      return
    }
    if (!config || !categoryInfo) {
      router.replace('/service-request?e=unknown-category')
    }
  }, [categoryId, config, categoryInfo, router])

  // Sem dados válidos? nada enquanto redireciona
  if (!categoryId || !config || !categoryInfo) return null

  const handleComplete = async (data: Answers) => {
    try {
      localStorage.setItem(
        'lastServiceRequest',
        JSON.stringify({ categoryId, data, timestamp: new Date().toISOString() })
      )
      router.push(`/service-request/success?category=${categoryId}`)
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      alert('Erro ao enviar solicitação. Tente novamente.')
    }
  }

  return (
    <MultistepProgressProvider>
      <div className="bg-[#F5F5F2] h-dvh">
        <HeaderStepper />
        <main className="p-8 max-w-2xl mx-auto flex-1">
          <DynamicMultistep
            config={config}
            initialData={initialData}
            onComplete={handleComplete}
          />
        </main>
      </div>
      <FooterStepper />
    </MultistepProgressProvider>
  )
}
