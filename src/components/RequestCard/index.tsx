import { useMemo } from "react";
import Image from "next/image";

type Submission = {
    id: string;
    created_at: string;
    category_id: string | null;
    user_name?: string | null;
    user_phone?: string | null;
    user_email?: string | null;
    form_data?: Record<string, any> | string | null;
};

function formatCategory(category: string | null) {
    if (!category) return "Sem categoria";
    return category
        .replace(/-/g, " ") // substitui hífens por espaço
        .replace(/\b\w/g, (char) => char.toUpperCase()); // primeira letra maiúscula
}

export function RequestCard({ submission }: { submission: Submission }) {
    const formData = useMemo(() => {
        const raw = submission.form_data;
        if (!raw) return {};
        if (typeof raw === "string") {
            try {
                return JSON.parse(raw);
            } catch {
                return { _raw: raw };
            }
        }
        return raw;
    }, [submission.form_data]);

    const contact = [
        submission.user_name && `Nome: ${submission.user_name}`,
        submission.user_phone && `Telefone: ${submission.user_phone}`,
        submission.user_email && `Email: ${submission.user_email}`,
    ].filter(Boolean).join(" · ");

    const date = new Date(submission.created_at);

    // Acessando campos específicos
    const urgency = formData?.timing?.urgency;
    const paintLocation = formData?.["paint-type"]?.["paint-location"];
    const userName = formData?.["contact-data"]?.name;

    // Função para obter as cores baseado na urgência
    const getUrgencyStyles = (urgency: string | undefined) => {
        switch (urgency) {
            case 'urgente':
                return 'bg-red-100 text-red-700';
            case '1-semana':
                return 'bg-yellow-100 text-yellow-700';
            case '15-dias':
                return 'bg-blue-100 text-blue-700';
            case 'sem-data':
            default:
                return 'bg-gray-100 text-black';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden p-6 gap-4 flex flex-col relative cursor-pointer">
            <Image className="absolute top-1/2 right-4 -translate-y-1/2" src="/arrow-right.svg" alt="category" width={20} height={20} />
            <h1 className="text-base font-bold">{formatCategory(submission.category_id)}</h1>

            <h1 className="font-semibold text-sm flex gap-2">Para quando? <span className="font-normal">
                <div className={`text-xs w-fit p-1 rounded-full px-2 font-semibold ${getUrgencyStyles(urgency)}`}>
                    {urgency}
                </div>
            </span></h1>

            <div className="flex gap-2">
                <Image src="/user-alt.svg" alt="location" width={20} height={20} />
                <h1>{submission.user_name}</h1>
            </div>

            <div className="flex gap-2">
                <Image src="/location.svg" alt="location" width={20} height={20} />
                <h1>Criciúma</h1>
            </div>

            <div className="flex gap-2 text-xs text-green-700 font-semibold">
                SEJA O PRIMEIRO A RESPONDER ESSE CONTATO!
            </div>
        </div>
    );
}