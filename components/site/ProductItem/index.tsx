'use client';
import React from 'react';
import Link from 'next/link';
import { IoIosTrendingDown } from 'react-icons/io';
import { getImageUrl } from '@/utils/imageUtils';

const ProductItem = ({
  thumbnail,
  title,
  slug,
  categories,
  price,
  discountPrice,
  variantValues = [],
}: any) => {
  let query = '';
  if (variantValues.length > 0) {
    query = '?';
    variantValues.forEach((variantValue: any) => {
      query += `${variantValue?.variant?.title}=${variantValue?.title}&`;
    });
    query = query.slice(0, -1);
  }

  const categorySlug = categories?.[0]?.slug;
  const href = categorySlug ? `/${categorySlug}/${slug}${query}` : null;

  const content = (
    <>
      <img
        src={getImageUrl(thumbnail)}
        alt={title || ''}
        title={title || ''}
        className="w-full aspect-square object-cover rounded-md"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <h3 className="text-base sm:text-base font-semibold hover:text-primary-400 hover:underline line-clamp-2">
        {title}
      </h3>

      <div className="flex items-center gap-2 mt-auto">
        <div className="flex flex-col">
          <strong className="text-base sm:text-xl">
            {Number(discountPrice).toFixed(2)}TL
          </strong>
          <span className="ml-1 line-through text-gray-400 text-xs sm:text-sm">
            {Number(price).toFixed(2)}TL
          </span>
        </div>

        {100 * ((price - discountPrice) / price) >= 20 && (
          <div className="absolute top-2 sm:top-5 right-2 sm:right-5 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-green-400 flex items-center justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-white rounded">
            <IoIosTrendingDown size={16} className="sm:text-xl" />%
            {(100 * ((price - discountPrice) / price)).toFixed(0)}
          </div>
        )}
      </div>
    </>
  );

  if (!href) {
    return (
      <div className="w-full h-full flex flex-col gap-1 sm:gap-2 bg-white p-2 sm:p-3 rounded-lg shadow relative group">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="w-full h-full flex flex-col gap-1 sm:gap-2 bg-white p-2 sm:p-3 rounded-lg shadow relative group"
    >
      {content}
    </Link>
  );
};

export default ProductItem;
