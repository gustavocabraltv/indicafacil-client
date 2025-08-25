'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Wrapper from '../Wrapper';

export default function Banner() {
  const [ready, setReady] = useState(false);

  return (
    <div className="py-4 md:h-72">
      <Wrapper className="!p-0">
        <Swiper
          modules={[Pagination]}
          spaceBetween={12}
          pagination={{ clickable: true, dynamicBullets: true }}
          style={{ paddingBottom: '32px' }}
          centeredSlides
          loop
          slidesPerView={1.15}
          className={`!h-full transition-opacity duration-150 ${ready ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          // Estabiliza antes de exibir
          onInit={() => setReady(true)}
          allowTouchMove
          simulateTouch
          touchRatio={1}
          threshold={5}
          resistanceRatio={0.85}
          longSwipesRatio={0.5}
          longSwipes
          shortSwipes
          breakpoints={{
            768: { slidesPerView: 2.5, spaceBetween: 16, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false }
          }}
        >
          <SwiperSlide>
            <div className="bg-blue-200 aspect-video h-full w-full flex items-center justify-center rounded-xl text-white font-bold text-lg">
              Slide 1
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-green-200 aspect-video h-full w-full flex items-center justify-center rounded-xl text-gray-800 font-bold text-lg">
              Slide 2
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-green-500 aspect-video h-full w-full flex items-center justify-center rounded-xl text-white font-bold text-lg">
              Slide 3
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-black aspect-video h-full w-full flex items-center justify-center rounded-xl text-white font-bold text-lg">
              Slide 4
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-pink-700 aspect-video h-full w-full flex items-center justify-center rounded-xl text-white font-bold text-lg">
              Slide 5
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-orange-400 aspect-video h-full w-full flex items-center justify-center rounded-xl text-white font-bold text-lg">
              Slide 6
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-purple-600 aspect-video h-full w-full flex items-center justify-center rounded-xl text-white font-bold text-lg">
              Slide 7
            </div>
          </SwiperSlide>
        </Swiper>
      </Wrapper>
    </div>
  );
}
