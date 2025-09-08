// app/service-request/category/[categoryId]/page.tsx - ATUALIZADO
'use client'

import { useParams, useRouter } from 'next/navigation'
import { DynamicMultistep } from '@/components/DynamicMultistep'
import { getConfigByCategory, serviceCategories } from '@/configs/service-categories'
import { FormData } from '@/types/multistep'
import { MultistepProgressProvider } from '@/contexts/MultistepProgressContext' // 🆕
import { HeaderStepper } from '@/components/HeaderStepper' // 🆕
import { FooterStepper } from '@/components/FooterStepper'

export default function CategoryPage() {
  const router = useRouter()
  const params = useParams<{ categoryId: string }>()
  const categoryId = params?.categoryId

  // Se não tiver param, redireciona (notFound é server-only)
  if (!categoryId) {
    router.replace('/service-request')
    return null
  }

  // Config e info da categoria
  const config = getConfigByCategory(categoryId)
  const categoryInfo = serviceCategories.find(cat => cat.id === categoryId)

  if (!config || !categoryInfo) {
    router.replace('/service-request?e=unknown-category')
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

  const handleBack = () => {
    router.push('/service-request')
  }

  return (
    <MultistepProgressProvider> {/* 🆕 Provider envolvendo tudo */}
     <FooterStepper/>
      <div className='bg-[#F5F5F2] h-screen '>
        <HeaderStepper /> {/* 🆕 Progress bar no header */}
       
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
              onComplete={handleComplete}
            />
          </div>
        </main>
        
      
      </div>
      
    </MultistepProgressProvider>
    
  )
}