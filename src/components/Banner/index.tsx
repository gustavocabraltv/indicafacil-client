'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Banner() {
    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={12}
            
            pagination={{ clickable: true, dynamicBullets: true}}
            style={{ paddingBottom: "32px" }} 

            slidesPerView={1.15}
            centeredSlides
            


        >
            <div className='mt-40'>
                <SwiperSlide>
                    <div className="bg-blue-200 aspect-video flex items-center justify-center rounded-xl">
                        Slide 1
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-green-200 aspect-video flex items-center justify-center rounded-xl">
                        Slide 2
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="bg-green-500 aspect-video flex items-center justify-center rounded-xl">
                        Slide 3
                    </div>
                </SwiperSlide>
            </div>
        </Swiper>
    );
}
