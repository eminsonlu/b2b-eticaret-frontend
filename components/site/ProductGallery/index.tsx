'use client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { RiPokerHeartsLine, RiPokerHeartsFill } from 'react-icons/ri';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useWishListStore } from '@/stores/wishListStore';
import IProduct from '@/types/IProduct';
import { getImageUrl } from '@/utils/imageUtils';

interface Props {
  thumbnail: string;
  images: string[];
  title: string;
  product: IProduct;
}

const ProductGallery = ({ product, thumbnail, images, title }: Props) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { wishList, addWishList, removeWishList } = useWishListStore();

  const [selectedImage, setSelectedImage] = useState<string>(thumbnail);

  useEffect(() => {
    setSelectedImage(thumbnail);
  }, [thumbnail]);

  return (
    <div className="max-w-[450px] flex flex-col gap-2">
      <div className="w-full relative">
        <div className="w-[43px] h-[43px] bg-white rounded-md flex items-center justify-center absolute top-2 right-2 z-10">
          {wishList.findIndex((i) => i.id == product.id) === -1 ? (
            <RiPokerHeartsLine
              size={28}
              className="text-primary-400 cursor-pointer hover:text-primary-600"
              onClick={() =>
                user ? addWishList(product) : router.push('/giris-yap')
              }
            />
          ) : (
            <RiPokerHeartsFill
              size={28}
              className="text-primary-400 cursor-pointer hover:text-primary-600"
              onClick={() =>
                user ? removeWishList(product) : router.push('/giris-yap')
              }
            />
          )}
        </div>
        <img
          src={getImageUrl(selectedImage)}
          alt={title || ''}
          title={title || ''}
          className="w-full rounded-xl"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="w-full grid grid-cols-6 gap-2">
        <img
          src={getImageUrl(thumbnail)}
          alt={title || ''}
          title={title || ''}
          className={classNames(
            'w-full cursor-pointer',
            'transition-all duration-300',
            'rounded-md',
            {
              'scale-75': selectedImage === thumbnail,
            }
          )}
          onClick={() => setSelectedImage(thumbnail)}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {images.map((image: string, index: number) => (
          <img
            key={index}
            src={getImageUrl(image)}
            alt={title || ''}
            title={title || ''}
            className={classNames(
              'w-full cursor-pointer',
              'transition-all duration-300',
              'rounded-md',
              {
                'scale-75': selectedImage === image,
              }
            )}
            onClick={() => setSelectedImage(image)}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
