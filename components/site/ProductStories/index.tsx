'use client';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { getImageUrl } from '@/utils/imageUtils';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

interface Props {
  products: any[];
}

const ProductStories = ({ products }: Props) => {
  return (
    <div className="container mb-8">
      <Swiper
        modules={[A11y]}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={Math.floor(products.length / 2)}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          1024: {
            autoplay: false,
            loop: false,
          },
        }}
        className="w-full relative"
      >
        <div className="h-full aspect-square absolute top-0 left-0 z-10 bg-gradient-to-r from-white to-transparent hidden lg:block"></div>
        <div className="h-full aspect-square absolute top-0 right-0 z-10 bg-gradient-to-l from-white to-transparent hidden lg:block"></div>
        {products.map((product, index) => (
          <SwiperSlide key={index} style={{ width: 94 }}>
            <Link
              href={`/${product.categories[0].slug}/${product.slug}`}
              className="flex flex-col gap-1 p-1"
              title={product.title}
            >
              <div
                className={classNames(
                  'w-[86px] h-[86px]',
                  'rounded-full gradient',
                  'flex items-center justify-center',
                  'hover:scale-110 transition-transform origin-center duration-300'
                )}
              >
                <img
                  src={getImageUrl(product.thumbnail)}
                  alt={product.title || ''}
                  title={product.title || ''}
                  className="rounded-full object-cover w-[80px] h-[80px] border-2 border-white"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <p className="text-[10px] text-center max-w-[85px] line-clamp-2 text-slate-700">
                {product.title}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductStories;
