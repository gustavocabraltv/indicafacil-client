'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '../Wrapper';

type SearchFullProps = {
    onClose?: () => void;
};

const TRENDS = [
    { label: 'Pintura de parede', href: '/pintura' },
    { label: 'Pedreiro', href: '/pedreiro' },
    { label: 'Marido de aluguel', href: '/marido-de-aluguel' },
    { label: 'Eletricista em Criciúma', href: '/eletricista' },
    { label: 'Reforma de telhado', href: '/pedreiro' },
    { label: 'Faxineira em Criciúma', href: '/diarista' },
    { label: 'Limpeza de sofás', href: '/diarista' },
    { label: 'Limpeza pós-obra', href: '/pedreiro' },
    { label: 'Instalação de ar-condicionado', href: '/marido-de-aluguel' },
];

export default function SearchFull({ onClose }: SearchFullProps) {
    const [query, setQuery] = useState('');

    return (
        <div className='bg-white absolute top-0 h-dvh z-20 left-0 right-0 flex flex-col text-black gap-4'>
            <Wrapper className='w-full pt-4'>
                <div className="flex items-center gap-1 text-[15px] rounded-full p-3 border border-gray-900 text-gray-700 beautifull-shadow w-full">
                    <Image
                        src="/arrow-left.svg"
                        width={24}
                        height={24}
                        alt="Voltar"
                        className='mr-1 cursor-pointer'
                        onClick={onClose}
                    />
                    <input
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="O que você precisa?"
                        className="bg-transparent outline-none font-medium flex-1 ml-1
                         text-[16px] placeholder:text-[16px] leading-tight"

                    />
                </div>
            </Wrapper>

            <Wrapper className='flex flex-col gap-4'>
                <h2 className='text-2xl'>Buscas mais feitas</h2>
                <div className="flex flex-wrap gap-2">
                    {TRENDS.map(({ label, href }, index) => (
                        <Link
                            key={`${href}-${index}`}
                            href={href}
                            aria-label={label}
                            className="pl-2 pr-3 py-2 border-[0.5px] border-gray-300 rounded-[8px] inline-flex items-center gap-2 text-gray-700 text-xs hover:bg-gray-100 transition"
                        >
                            <Image src="/trending.svg" alt="" width={18} height={18} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </Wrapper>

            <div id='services-1' className="overflow-hidden flex flex-col mt-4">
                <h2 className='text-2xl px-4'>Explore outros serviços</h2>
                <div id='scroll' className="flex overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide p-4">
                    <div className="card-base justify-end min-w-40 h-48">
                        <span className="text-xs">⭐ 4.9</span>
                        <h1>Limpeza <br /> de banheiro</h1>
                    </div>
                    <div className="card-base justify-end min-w-40 h-48">
                        <span className="text-xs">⭐ 4.9</span>
                        <h1>Serviços <br /> Elétricos</h1>
                    </div>
                    <div className="card-base justify-end min-w-40 h-48">
                        <span className="text-xs">⭐ 4.9</span>
                        <h1>Pequenos <br /> reparos</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
