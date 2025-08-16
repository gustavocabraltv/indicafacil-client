import { useState, useEffect } from 'react';
import Image from 'next/image';
import Wrapper from "@/components/Wrapper";

// Fora do componente
const suggestions = [
  "Pintor",
  "Pedreiro", 
  "Marido de Aluguel",
  "Encanador",
  "Truck Assisted Help Moving",
  "Help Moving",
  "Cleaning",
  "Door, Cabinet, & Furniture Repair"
];

export default function Cta({ scroll = 0 }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition >= scroll);
        };

        // Adiciona o listener de scroll
        window.addEventListener('scroll', handleScroll);

        // Verifica a posição inicial
        handleScroll();

        // Remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scroll]);

    // Se não deve ser visível, não renderiza nada
    if (!isVisible) return null;

    return (
        <div className='fixed bottom-0 bg-white z-50 block md:hidden'>
            <div className='bg-[#305FF5] flex px-2 py-3 gap-4'>
                <Image src="/wallet.svg" alt="Wallet" width={50} height={50} quality={100} />
                <span className='text-base text-white leading-tight'>
                    <span className='font-bold'>Economize tempo e dinheiro</span> contratando o profissional certo para a sua reforma!
                </span>
            </div>
            <Wrapper className='gap-4 flex flex-col'>
                <div className='flex gap-2 items-center'>
                    <Image src="/prestadores.png" alt="Profissionais" width={80} height={30.3} quality={100} />
                    <h4 className='text-[#000000] leading-tight text-lg'>
                        Encontramos os <span className='font-bold'>melhores pintores</span> disponíveis em Criciúma
                    </h4>
                </div>

                <div className='flex gap-2 items-center'>
                    <Image src="/icon-orcamento.svg" alt="Profissionais" width={21} height={21} quality={100} />
                    <h4 className='text-[#000000] leading-tight text-base'>
                        Receba um orçamento gratuito em <span className='font-bold'>até 5 min</span>
                    </h4>
                </div>

                <button
                    className="w-full flex items-center justify-center gap-2 py-[14px] rounded-md bg-green-700 text-white font-semibold"
                >
                    <Image src="/whatsapp-white.svg" width={24} height={24} alt="WhatsApp" />
                    <span>WhatsApp</span>
                </button>
            </Wrapper>
        </div>
    );
}