"use client"
import Cta from "@/components/Cta";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Wrapper from "@/components/Wrapper";
import Image from 'next/image';
import { useState } from 'react';

export default function Pintura () {
    const [isExpanded, setIsExpanded] = useState(false);

    const testimonialText = "Excelentes profissionais, rápidos, honestos e com bom preços. A plataforma também oferece a opção de parcelar o que é magnifício Recomendo muito...";

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white">
            <Header />



            <Wrapper className="lg:grid lg:grid-cols-3 gap-4 flex flex-col !p-0">
                <div className="bg-gray-200 col-span-2 lg:sticky block top-20 h-[200px] lg:h-[450px] rounded-0 lg:rounded-lg">
                  <span>Oi <br/> oi <br/>oi </span>
                </div>

                <div className="flex flex-col bg-gray-100 lg:bg-white gap-4">

                    <div className="bg-white">
                        <Wrapper className="pt-0">
                            <div className="flex-col flex gap-8">
                                <h1 className="text-black text-lg lg:text-3xl font-semibold lg:mt-4 mt-0">Precisando de Pintor urgente em Criciúma</h1>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 flex-row">
                                        <Image src="/icon-star.svg" alt="Logo" width={17} height={17} />
                                        <span className="text-gray-800 text-base">4.9 (1,242 reviews)</span>
                                    </div>

                                    <div className="flex gap-2 flex-row">
                                        <Image src="/icon-orcamento.svg" alt="Logo" width={17} height={17} />
                                        <span className="text-base text-gray-800">68 pintores contratados no último mês</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="border border-[#DBDBDB] rounded-[8px] flex p-3 items-center gap-4">
                                        <Image src="/prestadores.png" alt="Profissionais" width={70} height={18.88} quality={100} />
                                        <span className="text-sm text-gray-800"><span className="font-bold">+400 profissionais</span> verificados</span>
                                        <Image src="/arrow-right.svg" width={12} height={18} alt="Arrow" className="ml-auto mr-2" />
                                    </div>
                                    <button
                                        className="w-full flex items-center justify-center gap-2 py-[14px] rounded-md bg-green-700 text-white font-semibold"
                                    >
                                        <Image src="/whatsapp-white.svg" width={24} height={24} alt="WhatsApp" />
                                        <span>WhatsApp</span>
                                    </button>
                                </div>
                            </div>

                        </Wrapper>
                    </div>


                    <div className="bg-white">
                        <Wrapper>
                            <Timeline />
                        </Wrapper>
                    </div>

                    <div className="flex flex-col bg-white">

                        <div id="review-header" >
                            <Wrapper>
                                <div className="flex flex-col gap-8">

                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Image src="/icon-star.svg" alt="Logo" width={24} height={24} />
                                            <span className="text-lg font-bold text-black">5,0</span>
                                        </div>

                                        <span className="text-gray-600 text-base ">290 Avaliações</span>
                                    </div>

                                    <div className="bg-gray-100 rounded-[8px] gap-4 flex flex-col  py-6 px-5">
                                        <div className="flex items-center">
                                            <Image src="/user-02.png" alt="Profissionais" width={32} height={32} quality={100} className="mr-2" />
                                            <span className="text-sm text-gray-800 font-semibold">Fernanda Moliner</span>
                                            <div className="ml-auto mr-2">
                                                <Image src="/five-stars.svg" width={60} height={14} alt="Arrow" className="" />
                                                <span className="text-[#5F5F5F] font-normal text-xs">31 de março, 2025</span>
                                            </div>
                                        </div>


                                        <div className="gap-2 flex items-start">
                                            <Image src={"/aspas.svg"} width={12} height={32} alt="aspas" />
                                            <span className="text-base text-black">
                                                Fui muito bem atendida com um trabalho de qualidade. Valeu a pena, orçamento grátis e não é careiro. Obrigada!</span>
                                        </div>
                                    </div>


                                    <h2 className="text-base font-normal text-black"><span className="font-bold">290 Avaliações</span> para serviços de pintura</h2>

                                    <button
                                        className="w-full flex items-center justify-center gap-2 py-[14px] rounded-sm bg-gray-100 text-black font-medium border-[0.2px] border-gray-200"
                                    >

                                        <span className="font-semibold">Deixe uma avaliação</span>
                                    </button>



                                    <div className="flex gap-4">
                                        <div className="flex gap-2">
                                            <Image src="/five-stars.svg" width={60} height={14} alt="Arrow" className="" />
                                            <span className="text-black font-bold">5.0</span>
                                        </div>
                                        <div className=" w-[1px] bg-[#D6D6D6]">&nbsp;</div>
                                        <span className="text-[#374051] text-base">149 reviews</span>

                                    </div>


                                    <div className="flex flex-col gap-4">
                                        <div className="flex text-black">
                                            <span>Capricho e qualidade</span>
                                            <div className="ml-auto flex gap-2">
                                                <Image src="/high-review.svg" width={113} height={5} alt="Arrow" className="" />
                                                <span className="">5.0</span>
                                            </div>
                                        </div>

                                        <div className="flex text-black">
                                            <span>Comunicação</span>
                                            <div className="ml-auto flex gap-2">
                                                <Image src="/high-review.svg" width={113} height={5} alt="Arrow" className="" />
                                                <span className="">5.0</span>
                                            </div>
                                        </div>


                                        <div className="flex text-black">
                                            <span>Prazo</span>
                                            <div className="ml-auto flex gap-2">
                                                <Image src="/high-review.svg" width={113} height={5} alt="Arrow" className="" />
                                                <span className="">5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Wrapper>
                        </div>

                        <div className="flex border-t border-gray-200 ">
                            <Wrapper>

                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <span className="text-black font-bold">Gustavo Cabral</span>
                                        <div className="bg-green-800 px-2 py-1 flex text-white items-center  gap-2 rounded-sm">
                                            <Image src={"/star-white.svg"} width={14} height={12} alt="star" />
                                            5
                                        </div>
                                    </div>

                                    <div className="text-crop">
                                        <span className={`text-base text-black ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                            {testimonialText}
                                        </span>
                                    </div>

                                    <button
                                        className="flex items-center"
                                        onClick={toggleExpanded}
                                    >
                                        <span className="font-bold text-black">
                                            {isExpanded ? 'Ver menos' : 'Ver mais'}
                                        </span>

                                        <Image
                                            src={"/arrow-down.svg"}
                                            width={18}
                                            height={18}
                                            alt="Arrow"
                                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                </div>


                            </Wrapper>
                        </div>


                    </div>
                </div>
            </Wrapper>

            <Cta scroll={400} />





        </div>
    )
}