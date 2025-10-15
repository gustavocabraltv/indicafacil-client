// app/service-request/category/[categoryId]/page.tsx - CORRIGIDO
'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DynamicMultistep } from '@/components/DynamicMultistep'
import { getConfigByCategory, serviceCategories } from '@/configs/service-categories'
import { FormData } from '@/types/multistep'
import { MultistepProgressProvider } from '@/contexts/MultistepProgressContext'
import { HeaderStepper } from '@/components/HeaderStepper'
import { FooterStepper } from '@/components/FooterStepper'

// Tipagem específica para os campos injetados via URL
// type InitialData = {
//   'service-description'?: string
//   'estimated-price'?: number
// }



export default function CategoryPage() {
  const router = useRouter()
  const params = useParams<{ categoryId: string }>()
  const searchParams = useSearchParams()
  const categoryId = params?.categoryId

  const [initialData, setInitialData] = useState<Record<string, any>>({})

  // Captura description e price da URL
  useEffect(() => {
    const description = searchParams.get("description")
    const price = searchParams.get("price")

    if (description) {
      setInitialData({
        "service-description": description,
        "estimated-price": price ? parseInt(price) : undefined,
      })
    }
  }, [searchParams])

  // 🔧 CORREÇÃO: Redirecionamentos dentro de useEffect
  useEffect(() => {
    if (!categoryId) {
      router.replace('/service-request')
      return
    }

    const config = getConfigByCategory(categoryId)
      const categoryInfo = serviceCategories.find((cat: { id: string }) => cat.id === categoryId)

    if (!config || !categoryInfo) {
      router.replace('/service-request?e=unknown-category')
    }
  }, [categoryId, router])

  // Se não tiver categoryId, mostra loading enquanto redireciona
  if (!categoryId) {
    return null
  }

  // Config e info da categoria
  const config = getConfigByCategory(categoryId)
  const categoryInfo = serviceCategories.find(cat => cat.id === categoryId)

  // Se não tiver config, mostra loading enquanto redireciona
  if (!config || !categoryInfo) {
    return null
  }

  const handleComplete = async (data: FormData) => {
    try {
      // Ex.: enviar para API
      // await fetch('/api/service-requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ categoryId, formData: data, timestamp: new Date().toISOString() })
      // })

      // Backup local
      localStorage.setItem('lastServiceRequest', JSON.stringify({
        categoryId,
        data,
        timestamp: new Date().toISOString()
      }))

      router.push(`/service-request/success?category=${categoryId}`)
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      alert('Erro ao enviar solicitação. Tente novamente.')
    }
  }

  // const handleBack = () => {
  //   router.push('/service-request')
  // }

  return (
    <MultistepProgressProvider>
      <div className='bg-[#F5F5F2] h-dvh '>
        <HeaderStepper />
        
        <main className="p-8 max-w-2xl mx-auto flex-1">
          {/* <div className="mb-6">
            <button
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1"
            >
              ← Voltar para categorias
            </button>
          </div> */}

          <div>
            <DynamicMultistep
              config={config}
              initialData={initialData}
              onComplete={handleComplete}
            />
          </div>
        </main>
        
      </div>
      <FooterStepper/>
    </MultistepProgressProvider>
  )
}