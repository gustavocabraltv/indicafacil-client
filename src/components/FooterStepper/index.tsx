import Wrapper from "../Wrapper";
import Image from 'next/image'

export function FooterStepper() {
    return (
        <div className="w-full absolute bottom-0 py-6 bg-[#e3e3de] hidden">
            <Wrapper>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600 font-semibold">Chama no zap e pede um profissional.</span>
                    <div className="flex gap-2">
                        <Image src='/whatsapp-green.svg' alt="" width={32} height={0} />
                        <span className="text-2xl text-black font-bold">48 9 99919-7518</span>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}