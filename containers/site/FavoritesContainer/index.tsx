'use client';
import React, { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useWishListStore } from '@/stores/wishListStore';
import Select from '@/components/shared/Select';
import ProductItem from '@/components/site/ProductItem';

const FavoritesContainer = () => {
  const { wishList, removeWishList, updateWishList } = useWishListStore();

  const [order, setOrder] = useState('');

  useEffect(() => {
    updateWishList();
  }, []);

  return (
    <>
      <div className="container flex items-center justify-center group px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
          Favorilerim
          <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
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
        {wishList.length === 0 && (
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-4 text-center italic text-slate-600">
            Henüz favorilere eklenen ürün bulunmamaktadır.
          </div>
        )}
        
        {wishList.map((product, index) => (
          <div key={index} className="relative">
            <div className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] bg-white rounded-md flex items-center justify-center absolute top-3 left-3 sm:top-4 sm:left-4 z-10 shadow-sm">
              <CgClose
                size={16}
                className="text-primary-400 cursor-pointer hover:text-primary-600 sm:text-xl"
                onClick={() => removeWishList(product)}
              />
            </div>
            <ProductItem {...product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoritesContainer;
