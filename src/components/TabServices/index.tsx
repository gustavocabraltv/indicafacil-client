'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useId, KeyboardEvent } from 'react';

const CATEGORIES = [
    {
        id: 'pintor',
        label: 'Pintor',
        icon: '/pintura.svg',
        services: [
            { label: 'Pintura Residencial', href: '/pintura' },
            { label: 'Pintura Comercial', href: '/servicos/pintura-comercial' },
            { label: 'Pintura Texturizada', href: '/servicos/pintura-texturizada' },
            { label: 'Desocupação de imóveis', href: '/servicos/desocupacao' },
            { label: 'Papel de parede', href: '/servicos/papel-de-parede' },
            { label: 'Pintura de muros', href: '/servicos/pintura-muros' },
        ],
    },
    {
        id: 'eletricista',
        label: 'Eletricista',
        icon: '/eletricista.svg',
        services: [
            { label: 'Instalação de tomadas', href: '/servicos/tomadas' },
            { label: 'Troca de disjuntores', href: '/servicos/disjuntores' },
            { label: 'Instalação de luminárias', href: '/servicos/luminarias' },
        ],
    },
    {
        id: 'pedreiro',
        label: 'Pedreiro',
        icon: '/pedreiro.svg',
        services: [
            { label: 'Assentamento de pisos', href: '/servicos/pisos' },
            { label: 'Reboco e alvenaria', href: '/servicos/reboco' },
            { label: 'Pequenos reparos', href: '/servicos/reparos' },
        ],
    },
    {
        id: 'diarista',
        label: 'Diarista',
        icon: '/diarista.svg',
        services: [
            { label: 'Limpeza residencial', href: '/servicos/limpeza-residencial' },
            { label: 'Limpeza pós-obra', href: '/servicos/limpeza-pos-obra' },
            { label: 'Organização de ambientes', href: '/servicos/organizacao' },
        ],
    },
    {
        id: 'marido',
        label: 'Marido de Aluguel',
        icon: '/marido-de-aluguel.svg',
        services: [
            { label: 'Montagem de móveis', href: '/servicos/montagem' },
            { label: 'Fixação de prateleiras', href: '/servicos/prateleiras' },
            { label: 'Reparos gerais', href: '/servicos/reparos-gerais' },
        ],
    },
    {
        id: 'encanador',
        label: 'Encanador',
        icon: '/eletricista.svg',
        services: [
            { label: 'Desentupimento', href: '/servicos/desentupimento' },
            { label: 'Troca de torneiras', href: '/servicos/torneiras' },
            { label: 'Instalação de chuveiro', href: '/servicos/chuveiro' },
        ],
    },
    {
        id: 'jardineiro',
        label: 'Jardineiro',
        icon: '/eletricista.svg',
        services: [
            { label: 'Corte de grama', href: '/servicos/grama' },
            { label: 'Poda de árvores', href: '/servicos/poda' },
            { label: 'Manutenção de jardim', href: '/servicos/jardim' },
        ],
    },
];

export default function TabServices() {
    const [active, setActive] = useState(CATEGORIES[0].id);
    const baseId = useId();

    const onKey = (e: KeyboardEvent<HTMLUListElement>) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const idx = CATEGORIES.findIndex(c => c.id === active);
        const next =
            e.key === 'ArrowRight'
                ? (idx + 1) % CATEGORIES.length
                : (idx - 1 + CATEGORIES.length) % CATEGORIES.length;
        setActive(CATEGORIES[next].id);
    };

    const current = CATEGORIES.find(c => c.id === active)!;

    return (
        <div className="overflow-hidden">
            {/* NAV */}
            <nav aria-label="Categorias de serviços" className="border-b">
                <ul
                    role="tablist"
                    onKeyDown={onKey}
                    className="flex overflow-x-auto whitespace-nowrap p-4 scrollbar-hide"
                >
                    {CATEGORIES.map(cat => {
                        const selected = active === cat.id;
                        const tabId = `${baseId}-tab-${cat.id}`;
                        const panelId = `${baseId}-panel-${cat.id}`;
                        return (
                            <li key={cat.id} className="shrink-0">
                                <button
                                    id={tabId}
                                    role="tab"
                                    aria-selected={selected}
                                    aria-controls={panelId}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => setActive(cat.id)}
                                    className={[
                                        'flex flex-col items-center gap-1 outline-none relative px-4 pb-4 cursor-pointer',
                                        selected ? 'text-black' : 'text-gray-500',
                                    ].join(' ')}
                                >
                                    <Image src={cat.icon} alt="" width={36} height={36} aria-hidden />
                                    <span className="text-sm">{cat.label}</span>
                                    <span
                                        className={[
                                            'absolute bottom-0 left-0 block h-[2px] w-full',
                                            selected ? 'bg-black' : 'bg-transparent',
                                        ].join(' ')}
                                        aria-hidden
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* PANEL */}
            <section
                id={`${baseId}-panel-${current.id}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${current.id}`}
                className="w-full  p-4"
            >
                <ul className="flex flex-wrap content-start items-start gap-x-3 gap-y-3">
                    {current.services.map(s => (
                        <li key={s.label}>
                            <Link href={s.href} className="btn-services inline-flex">
                                {s.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

/* tailwind (ex: globals.css)
.btn-services {
  @apply text-[#505561] text-sm px-4 py-2 border border-gray-400 rounded-full cursor-pointer;
}
.btn-services:hover { @apply border-gray-600; }
*/
