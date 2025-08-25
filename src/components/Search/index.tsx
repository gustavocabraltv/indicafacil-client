'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Wrapper from '../Wrapper';

type SearchProps = {
  onOpen?: () => void;
  variant?: 'default' | 'alt';
};

const searchVariants = {
  default: "flex items-center gap-1 text-[15px] rounded-full p-3 border border-gray-200 text-gray-700 beautifull-shadow bg-white cursor-pointer",
  alt: "flex items-center gap-1 text-[15px] rounded-full p-3 border border-gray-200 text-gray-700  bg-gray-200 cursor-pointer"
};


export default function Search({ onOpen, variant = 'default' }: SearchProps) {
  const terms = useMemo(
    () => ['pintores em Criciúma', 'diarista em Criciúma', 'pedreiro em Criciúma'],
    []
  );

  const [loop, setLoop] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const TYPE_SPEED = 100;
  const DELETE_SPEED = 35;
  const HOLD_AFTER_TYPE = 1200;
  const HOLD_AFTER_DELETE = 300;

  useEffect(() => {
    const full = terms[loop % terms.length];
    const delay = deleting ? DELETE_SPEED : TYPE_SPEED;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), HOLD_AFTER_TYPE);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setLoop((prev) => (prev + 1) % terms.length);
          setTimeout(() => {}, HOLD_AFTER_DELETE);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, loop, terms]);

  return (
    <div className='mt-4'>
      <div
        onClick={onOpen}
        className={searchVariants[variant]} 
        aria-label={`Buscar ${text || terms[loop % terms.length]}`}
      >
        <Image src="/search.svg" width={24} height={24} alt="Buscar" className='mr-1'/>
        <span>Buscar</span>
        <span className="font-medium inline-flex items-center" aria-live="polite">
          {text}
          <span className="inline-block w-[1px] h-[1em] ml-[2px] bg-current animate-pulse" />
        </span>
      </div>
    </div>
  );
}
