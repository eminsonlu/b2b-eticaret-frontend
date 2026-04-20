'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import classnames from 'classnames/bind';
import Link from 'next/link';
import { ISliderItem } from '@/types/ISlider';

const cn = classnames.bind({
  'top-left': 'top-4 left-4 sm:top-8 sm:left-8',
  'top-right': 'top-4 right-4 sm:top-8 sm:right-8',
  'bottom-left': 'bottom-4 left-4 sm:bottom-8 sm:left-8',
  'bottom-right': 'bottom-4 right-4 sm:bottom-8 sm:right-8',
});

const HomepageSlider = ({ sliders }: { sliders: ISliderItem[] }) => {
  return (
    <Swiper
      modules={[Navigation, EffectFade, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      className="mb-8 md:mb-12"
      autoplay={{ delay: 5000 }}
      loop={true}
      navigation={{
        nextEl: '.image-swiper-button-next',
        prevEl: '.image-swiper-button-prev',
      }}
    >
      <div className="image-swiper-button-prev absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-20">
        <MdKeyboardArrowLeft
          size={32}
          className="cursor-pointer text-white/70 hover:text-white md:text-4xl lg:text-5xl"
        />
      </div>
      <div className="image-swiper-button-next absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-20">
        <MdKeyboardArrowRight
          size={32}
          className="cursor-pointer text-white/70 hover:text-white md:text-4xl lg:text-5xl"
        />
      </div>

      {sliders.map((slider, index) => (
        <SwiperSlide
          key={index}
          className="w-full aspect-[2.4/1] bg-center bg-cover relative"
          style={{
            backgroundImage: `url("${process.env.NEXT_PUBLIC_CDN_URL}/images/${slider.image}")`,
          }}
        >
          {slider.link && (
            <Link
              href={slider.link}
              className="absolute top-0 left-0 w-full h-full z-10"
              target="_blank"
            ></Link>
          )}

          {(slider.title || slider.description) && (
            <div
              className={cn(
                'w-full max-w-[90%] sm:max-w-[80%] md:max-w-[550px]',
                'absolute',
                'flex flex-col gap-2 md:gap-4',
                'box-border rounded-md bg-primary-100/70 p-3 sm:p-4 md:p-6',
                slider.position
              )}
            >
              {slider.title && (
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{slider.title}</h3>
              )}
              {slider.description && (
                <p className="text-sm sm:text-base max-w-[95%] sm:max-w-[90%] md:max-w-[85%]">{slider.description}</p>
              )}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomepageSlider;
