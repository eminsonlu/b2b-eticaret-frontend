'use client';
import { ISlider } from '@/types/ISlider';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface Props {
  notice: ISlider;
}

const HomePageNotice = ({ notice }: Props) => {
  return (
    <div className="container my-8 sm:my-12 md:my-20">
      {/* Mobile view with Swiper (hidden on md and up) */}
      <div className="md:hidden w-full">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={16}
          slidesPerView={'auto'}
          freeMode={true}
          className="w-full"
        >
          {notice.sliderItems.map((item, index) => (
            <SwiperSlide key={index} className="!w-[80%] !max-w-[320px]">
              <Link
                href={item.link}
                className="w-full bg-slate-50 p-3 rounded-md flex flex-col gap-2 hover:text-primary-500 transition-colors duration-300"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${item.image}`}
                  alt="Thumbnail"
                  title="Thumbnail"
                  width={0}
                  height={0}
                  className="w-full rounded aspect-video mb-1"
                  unoptimized
                />
                <h3 className="text-black text-lg font-semibold text-inherit">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-700 line-clamp-3">
                  {item.description}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop view (hidden on mobile) */}
      <div className="hidden md:flex w-full flex-row gap-4">
        {notice.sliderItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="w-full bg-slate-50 p-4 rounded-md flex-1 flex flex-col gap-2 hover:text-primary-500 transition-colors duration-300"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${item.image}`}
              alt="Thumbnail"
              title="Thumbnail"
              width={0}
              height={0}
              className="w-full rounded aspect-video mb-1"
              unoptimized
            />
            <h3 className="text-black text-xl font-semibold text-inherit">
              {item.title}
            </h3>
            <p className="text-base text-slate-700 line-clamp-3">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePageNotice;
