'use client';

import { useMemo, useState } from 'react';
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

const SUGGESTIONS = [
  { label: 'Pintor', href: '/pintura' },
  { label: 'Pedreiro', href: '/pedreiro' },
  { label: 'Marido de Aluguel', href: '/marido-de-aluguel' },
  { label: 'Encanador', href: '/encanador' },
  { label: 'Diarista', href: '/diarista' },
  { label: 'Faxineira', href: '/diarista' },
  { label: 'Marido de aluguel', href: '/marido-de-aluguel' },
  { label: 'Eletricista', href: '/eletricista' },
];

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function SearchFull({ onClose }: SearchFullProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return SUGGESTIONS.filter(({ label }) => normalize(label).includes(q));
  }, [query]);

  const isTyping = query.trim().length > 0;

  return (
    <div className="bg-white absolute top-0 h-dvh z-20 left-0 right-0 flex flex-col text-black gap-4">
      <Wrapper className="w-full pt-4">
        <div className="flex items-center gap-1 text-[15px] rounded-full p-3 border border-gray-900 text-gray-700 beautifull-shadow w-full">
          <Image
            src="/arrow-left.svg"
            width={24}
            height={24}
            alt="Voltar"
            className="mr-1 cursor-pointer"
            onClick={onClose}
          />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você precisa?"
            aria-label="Buscar serviços"
            className="bg-transparent outline-none font-medium flex-1 ml-1 text-[16px] placeholder:text-[16px] leading-tight"
          />
        </div>
      </Wrapper>

      {/* Quando digitando, mostrar apenas sugestões */}
      {isTyping ? (
        <Wrapper className="flex flex-col gap-2  w-full">
          <h2 className="text-sm text-gray-500">Sugestões</h2>
          <ul className="flex flex-col">
            {filtered.length > 0 ? (
              filtered.map(({ label, href }, i) => (
                <li key={`${href}-${i}`}>
                  <Link
                    href={href}
                    className="flex items-center justify-between px-3 py-3 border-b border-gray-100 hover:bg-gray-50"
                    aria-label={`Ir para ${label}`}
                  >
                    <div className="flex items-center gap-2">
                      <Image src="/search.svg" alt="" width={18} height={18} />
                      <span className="text-sm text-gray-800">{label}</span>
                    </div>
                    <Image src="/arrow-right.svg" alt="" width={18} height={18} />
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-3 py-4 text-sm text-gray-500">
                Não encontramos resultados para “{query.trim()}”.
              </li>
            )}
          </ul>
        </Wrapper>
      ) : (
        <>
          {/* Corpo padrão quando não está digitando */}
          <Wrapper className="flex flex-col gap-4">
            <h2 className="text-sm text-gray-500">Buscas mais feitas</h2>
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

          <Wrapper className="w-full">
            <div id="services-1" className="overflow-hidden flex flex-col mt-4">
              <h2 className="text-lg font-semibold pb-4">Explore outros serviços</h2>
              <div id="scroll" className="flex overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide">
                <div className="card-base justify-end min-w-40 h-48">
                  <span className="text-xs">⭐ 4.9</span>
                  <h1>
                    Limpeza <br /> de banheiro
                  </h1>
                </div>
                <div className="card-base justify-end min-w-40 h-48">
                  <span className="text-xs">⭐ 4.9</span>
                  <h1>
                    Serviços <br /> Elétricos
                  </h1>
                </div>
                <div className="card-base justify-end min-w-40 h-48">
                  <span className="text-xs">⭐ 4.9</span>
                  <h1>
                    Pequenos <br /> reparos
                  </h1>
                </div>
              </div>
            </div>
          </Wrapper>
        </>
      )}
    </div>
  );
}
