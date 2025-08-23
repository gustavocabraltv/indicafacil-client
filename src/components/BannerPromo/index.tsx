'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerPromo() {
  return (
    <div className="mt-40"> {/* leve o margin/top pra fora */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView="auto"
        centeredSlides
        pagination={{ clickable: true, dynamicBullets: true }}
        style={{ paddingBottom: '32px' }}
      >
        <SwiperSlide className="!w-auto">
          <div className="bg-blue-200 flex items-center gap-2 rounded-xl border border-black p-4 w-[230px]">
            <Image src="/discount.svg" alt="discount" width={18} height={18} />
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!w-auto">
          <div className="bg-blue-200 flex items-center gap-2 rounded-xl border border-black p-4 w-[230px]">
            <Image src="/discount.svg" alt="discount" width={18} height={18} />
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!w-auto">
          <div className="bg-blue-200 flex items-center gap-2 rounded-xl border border-black p-4 w-[230px]">
            <Image src="/discount.svg" alt="discount" width={18} height={18} />
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!w-auto">
          <div className="bg-blue-200 flex items-center gap-2 rounded-xl border border-black p-4 w-[230px]">
            <Image src="/discount.svg" alt="discount" width={18} height={18} />
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
