'use client';
import IProduct from '@/types/IProduct';
import Link from 'next/link';
import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { ISlider } from '@/types/ISlider';
import ICategory from '@/types/ICategory';
import HomePageNotice from '@/components/site/HomepageNotice';
import HomepageSlider from '@/components/site/HomepageSlider';
import ProductItem from '@/components/site/ProductItem';
import ProductStories from '@/components/site/ProductStories';

interface ExtendedCategory extends ICategory {
  products: IProduct[];
}
interface Props {
  storyProducts: IProduct[];
  slider: ISlider;
  notice: ISlider;
  featuredCategories: ExtendedCategory[];
}

const HomeContainer = ({
  storyProducts = [],
  slider,
  notice,
  featuredCategories,
}: Props) => {
  return (
    <>
      <h1 className="hidden">Tekyerde.com</h1>
      <ProductStories products={storyProducts} />

      {slider && <HomepageSlider sliders={slider.sliderItems} />}

      {/* {notice && <HomePageNotice notice={notice} />} */}

      <div className="container flex flex-col gap-8 sm:gap-12 md:gap-16">
        {featuredCategories.map((category, index) => (
          <section key={index} className="flex flex-col gap-2 sm:gap-4 group">
            <div className="w-full flex items-center">
              <h2 className="text-2xl font-bold relative">
                {category.title}
                <div className="w-[30px] sm:w-[50px] h-[2px] bg-primary-400 mt-1 transition-all duration-500 absolute top-full left-0 group-hover:w-full"></div>
              </h2>

              <Link
                href={`/${category.slug}`}
                className="flex items-center gap-1 text-xs sm:text-sm text-primary-400 font-medium ml-auto hover:underline"
              >
                <span>Hepsini Gör</span>
                <MdArrowRightAlt size={16} className="sm:text-xl" />
              </Link>
            </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
              {(category?.products || []).map((product, index) => (
                product && <ProductItem key={index} {...product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default HomeContainer;
