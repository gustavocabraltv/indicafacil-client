// configs/categories/service-mapping.ts
export const serviceToConfigMap: Record<string, string> = {
  "Pintura de paredes e tetos": "pintura",           // ✅ SEM -service
  "Pedreiro": "pedreiro",                            // ✅ SEM -service
  "Pequenos reparos": "servico-de-reparo",          // ✅ Igual ao service-categories
  "Serviço de limpeza": "diarista",                 // ✅ SEM -service
  "Reparo de telhado": "reparo-de-telhados",        // ✅ Igual ao service-categories
  "Serviços de encanamento": "servico-de-encanamento", // ✅ Igual ao service-categories
  "Ar Condicionado": "faz-tudo",                    // ✅ Ou crie categoria específica
  "Decks & varandas": "faz-tudo",                   // ✅ Ou crie categoria específica
  "Pintura de Desocupação": "pintura",              // ✅ SEM -service
};