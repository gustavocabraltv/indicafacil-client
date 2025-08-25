'use client';

import { useState } from 'react';
import Search from "@/components/Search";
import SearchFull from "@/components/SearchFull";
import Shortcut from "@/components/TabServices";
import Wrapper from "@/components/Wrapper";
import Image from 'next/image'
import Banner from '@/components/Banner';
import BannerPromo from '@/components/BannerPromo';
import Container from '@/components/Container'
import LocationSearch from '@/components/LocationSearch';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import TabServices2 from '@/components/TabServices2';
import TabServices from '@/components/TabServices';


export default function Home4() {
    // const [showFullSearch, setShowFullSearch] = useState(false);

    return (
        <div className='bg-[#F3F4F6] flex flex-col gap-0'>

       

            <Container>
                <TabServices2 />
            </Container>

            <Container>
                <LocationSearch />
            </Container>

            <Container>
                <Wrapper>
                    <div className=' grid grid-cols-2 text-xs text-gray-950 gap-4 font-semibold'>

                        <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-end relative'>
                            <Image className='absolute right-0' src='/marido-de-aluguel-3d.png' width={77} height={74} alt='Pintor' />
                            <span>Marido de aluguel</span>
                        </div>

                        <Link href="/pintura">
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-end relative'>
                                <Image className='absolute right-0' src='/pintor-3d.png' width={77} height={74} alt='Pintor' />
                                <span>Pintor</span>
                            </div>
                        </Link>


                    </div>
                </Wrapper>
            </Container>

            {/* <Container className='pt-4'>


                <Wrapper>
                    <div className=' grid grid-cols-4 text-xs text-gray-950 gap-4 font-semibold'>

                        <div className='flex flex-col gap-2 items-center'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/encanador-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Encanador</span>
                        </div>

                        <div className='flex flex-col gap-2 items-center'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/limpeza-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Limpeza</span>
                        </div>

                        <div className='flex flex-col gap-2 items-center'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/montagem-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Montagem</span>
                        </div>

                        <div className='flex flex-col gap-2 items-center'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>



                    </div>
                </Wrapper>

            </Container> */}


            <Container>
                <Swiper
                    spaceBetween={12}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    slidesPerView={4.4}
                    style={{ padding: "24px 16px" }}
                >

                    <SwiperSlide>
                        <div className='flex flex-col gap-2 items-center text-black text-xs font-semibold'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col gap-2 items-center text-black text-xs font-semibold'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col gap-2 items-center text-black text-xs font-semibold'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col gap-2 items-center text-black text-xs font-semibold'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col gap-2 items-center text-black text-xs font-semibold'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col gap-2 items-center text-black text-xs font-semibold'>
                            <div className='flex w-full h-[86px] bg-gray-100 rounded-md p-3 items-center justify-center'>
                                <Image src='/martelo-3d.png' alt='encanador' width={50} height={50} />
                            </div>
                            <span>Pedreiro</span>
                        </div>
                    </SwiperSlide>




                </Swiper>
            </Container>

            <Container>
                <Banner />
            </Container>


            <div className='bg-white py-4'>
                <BannerPromo />
            </div>

        </div>
    );
}
