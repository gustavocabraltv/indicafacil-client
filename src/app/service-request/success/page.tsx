// app/service-request/success/page.tsx
import Link from 'next/link'
import { serviceCategories } from '@/configs/service-categories'
import { Button } from '@/components/ui/button'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const categoryId = searchParams?.category ?? ''
  const categoryInfo = serviceCategories.find((cat) => cat.id === categoryId)

  return (
    <main className="p-8 max-w-2xl mx-auto bg-[#F5F5F2] min-h-screen">
      <div className="bg-white rounded-[8px] shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-green-800 mb-2">Solicitação Enviada!</h1>

        <p className="text-gray-600 mb-6">
          Sua solicitação para <strong>{categoryInfo?.name ?? 'Serviço'}</strong> foi enviada com sucesso.
          <br />
          Profissionais qualificados entrarão em contato em breve!
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Próximos passos:</h3>
          <ul className="text-sm text-blue-700 text-left space-y-1">
            <li>• Você receberá contato via WhatsApp em até 2 horas</li>
            <li>• Os profissionais farão uma avaliação mais detalhada</li>
            <li>• Você receberá orçamentos personalizados</li>
            <li>• Escolha o melhor profissional para seu projeto</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/service-request">Nova Solicitação</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/">Voltar ao Início</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
