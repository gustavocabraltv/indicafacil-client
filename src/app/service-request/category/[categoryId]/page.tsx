// app/service-request/category/[categoryId]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { DynamicMultistep } from '@/components/DynamicMultistep'
import { getConfigByCategory, serviceCategories } from '@/configs/service-categories'
import { FormData } from '@/types/multistep'

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
    <div className='bg-[#F5F5F2]'>
      <main className="p-8 max-w-2xl mx-auto bg-[#F5F5F2] min-h-screen">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="text-sm text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1"
          >
            ← Voltar para categorias
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{categoryInfo.icon}</span>
            <h1 className="text-2xl font-bold">
              Serviço de {categoryInfo.name}
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            Preencha as informações para receber orçamentos de profissionais qualificados
          </p>
        </div>

        <div className="p-6 bg-white rounded-[8px] shadow-lg">
          <DynamicMultistep
            config={config}
            onComplete={handleComplete}
          />
        </div>
      </main>
    </div>
  )
}
