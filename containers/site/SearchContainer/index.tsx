'use client';
import IProduct from '@/types/IProduct';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Select from '@/components/shared/Select';
import ProductItem from '@/components/site/ProductItem';

interface Props {
  products: IProduct[];
}

const SearchContainer = ({ products = [] }: Props) => {
  const searchParams = useSearchParams();
  const s = searchParams.get('s') || '';

  const [order, setOrder] = useState('');

  return (
    <>
      <div className="container flex items-center justify-center group px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
          &lsquo;{s}&lsquo; Arama Sonuçları
          <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h1>
      </div>

      <div className="container flex justify-center sm:justify-end mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6">
        <Select
          options={[
            {
              label: 'Önerilen Sıralama',
              value: '',
            },
            {
              label: 'Fiyata Göre (Önce En Yüksek)',
              value: 'price-desc',
            },
            {
              label: 'Fiyata Göre (Önce En Düşük)',
              value: 'price-asc',
            },
            {
              label: 'En Çok Satanlar',
              value: 'best-selling',
            },
            {
              label: 'Yeniden Eskiye',
              value: 'created-desc',
            },
          ]}
          value={order}
          onSelect={setOrder}
          className="w-full max-w-[265px]"
        />
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6">
        {products.length === 0 && (
          <div className="col-span-2 sm:col-span-3 md:col-span-4 text-center italic text-slate-600">
            "{s}" aramasına uygun ürün bulunamadı.
          </div>
        )}

        {products.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>
    </>
  );
};

export default SearchContainer;
