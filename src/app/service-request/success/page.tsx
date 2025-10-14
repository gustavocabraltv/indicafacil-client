// app/service-request/success/page.tsx
import Link from "next/link";
import { serviceCategories } from "@/configs/service-categories";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Em Next 15, searchParams é Promise<...>, então a page precisa ser async
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const raw = sp?.category;
  const categoryId = Array.isArray(raw) ? raw[0] : raw ?? "";
  const categoryInfo = serviceCategories.find((cat) => cat.id === categoryId);

  return (
    <div className="bg-[#F5F5F2]">
      <header className="sticky top-0 z-[100] bg-white">
        <nav className="w-full border-b border-gray-300 bg-white">
          <div className="max-w-6xl mx-auto w-full">
            <div className="px-4 py-4 flex justify-between items-center">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  className="h-8"
                  width={190}
                  height={50}
                />
              </Link>
              <Link href="/login" className="text-gray-700">
                Entrar
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="p-8 max-w-2xl mx-auto bg-[#F5F5F2] min-h-screen">
        <div className="bg-white rounded-[8px] shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-green-800 mb-2">
            Solicitação Enviada!
          </h1>

          <p className="text-gray-600 mb-6">
            Sua solicitação para{" "}
            <strong>{categoryInfo?.name ?? "Serviço"}</strong> foi enviada com
            sucesso. Profissionais qualificados entrarão em contato em breve!
          </p>

          <div className="bg-[#F3F3F3] border rounded-lg p-4 mb-6 flex flex-col justify-start items-start">
            <h3 className="font-semibold text-black mb-2">Próximos passos:</h3>
            <ul className="text-sm text-black text-left space-y-1">
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
    </div>
  );
}
