'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Wrapper from '../Wrapper';

export default function Search() {
    // palavras que irão rotacionar
    const terms = useMemo(
        () => ['pintores em Criciúma', 'diarista em Criciúma', 'pedreiro em Criciúma'],
        []
    );

    const [loop, setLoop] = useState(0);       // índice da palavra atual
    const [text, setText] = useState('');      // texto parcialmente digitado
    const [deleting, setDeleting] = useState(false);

    // velocidades (ms) — ajuste se quiser
    const TYPE_SPEED = 100;
    const DELETE_SPEED = 35;
    const HOLD_AFTER_TYPE = 1200;  // pausa quando termina de digitar
    const HOLD_AFTER_DELETE = 300; // pausa quando termina de apagar

    useEffect(() => {
        const full = terms[loop % terms.length];

        // define o delay conforme está digitando ou apagando
        const delay = deleting
            ? DELETE_SPEED
            : TYPE_SPEED;

        const timer = setTimeout(() => {
            if (!deleting) {
                // digitando
                const next = full.slice(0, text.length + 1);
                setText(next);

                // terminou de digitar → segura e começa a apagar
                if (next === full) {
                    setTimeout(() => setDeleting(true), HOLD_AFTER_TYPE);
                }
            } else {
                // apagando
                const next = full.slice(0, text.length - 1);
                setText(next);

                // terminou de apagar → segura e vai para próxima palavra
                if (next === '') {
                    setDeleting(false);
                    setLoop((prev) => (prev + 1) % terms.length);
                    setTimeout(() => { }, HOLD_AFTER_DELETE);
                }
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [text, deleting, loop, terms]);

    return (
        <>
            
                <div    
                    // shadow-2xl
                    className="flex items-center gap-1 text-[15px] rounded-full p-3 border border-gray-200 text-gray-700 beautifull-shadow"
                    aria-label={`Buscar ${text || terms[loop % terms.length]}`}
                >
                    <Image src="/search.svg" width={24} height={24} alt="Buscar" className='mr-1'/>
                    <span>Buscar</span>
                    <span
                        className="font-medium  inline-flex items-center"
                        // acessibilidade: anuncia mudanças do texto
                        aria-live="polite"
                    >
                        {text}
                        {/* cursor piscando */}
                        <span className="inline-block w-[1px] h-[1em] ml-[2px] bg-current animate-pulse" />
                    </span>
                </div>
            
        </>
    );
}
