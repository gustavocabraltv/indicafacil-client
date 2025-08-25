'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerPromo() {
  return (
    <div> {/* leve o margin/top pra fora */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView="auto"
        centeredSlides
        // pagination={{ clickable: true, dynamicBullets: true }}
        // style={{ paddingBottom: '32px' }}
      >


  

        <SwiperSlide className="!w-auto">
          <div className="bg-white flex items-start gap-2 rounded-xl border border-gray-300 py-3 pr-6 pl-4 ">
            <Image src="/discount.svg" alt="discount" width={18} height={18} className='pt-1' />
            <div className="flex flex-col ">
              <h2 className="text-sm font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide className="!w-auto">
          <div className="bg-white flex items-start gap-2 rounded-xl border border-gray-300 py-3 pr-6 pl-4 ">
            <Image src="/discount.svg" alt="discount" width={18} height={18} className='pt-1' />
            <div className="flex flex-col ">
              <h2 className="text-sm font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>



        <SwiperSlide className="!w-auto">
          <div className="bg-white flex items-start gap-2 rounded-xl border border-gray-300 py-3 pr-6 pl-4 ">
            <Image src="/discount.svg" alt="discount" width={18} height={18} className='pt-1' />
            <div className="flex flex-col ">
              <h2 className="text-sm font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>



        <SwiperSlide className="!w-auto">
          <div className="bg-white flex items-start gap-2 rounded-xl border border-gray-300 py-3 pr-6 pl-4 ">
            <Image src="/discount.svg" alt="discount" width={18} height={18} className='pt-1' />
            <div className="flex flex-col ">
              <h2 className="text-sm font-semibold text-black">15% OFF dia de Faxina</h2>
              <span className="text-xs text-gray-400">Use o código: CRICIUMA15</span>
            </div>
          </div>
        </SwiperSlide>


   
 
      </Swiper>
    </div>
  );
}
