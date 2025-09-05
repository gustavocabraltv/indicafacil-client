// app/service-request/page.tsx
import Link from "next/link";
import { serviceCategories } from '@/configs/service-categories';

export default function ServiceRequestPage() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Escolha o serviço</h1>
      <p className="text-muted-foreground mb-6">
        Selecione o tipo de serviço que você precisa
      </p>
      
      <div className="grid gap-4">
        {serviceCategories.map((category) => (
          <Link
            key={category.id}
            href={`/service-request/category/${category.id}`}
            className="block border rounded-lg p-4 hover:bg-gray-50 hover:border-primary/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="font-medium group-hover:text-primary">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getCategoryDescription(category.id)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

// Helper para descrições das categorias
function getCategoryDescription(categoryId: string): string {
  const descriptions: Record<string, string> = {
    '3231': 'Pintura residencial e comercial, textura, reforma',
    '3232': 'Vazamentos, entupimentos, instalações hidráulicas',
    '3233': 'Instalações elétricas, reparos, manutenção preventiva',
  };
  
  return descriptions[categoryId] || 'Serviços profissionais';
}