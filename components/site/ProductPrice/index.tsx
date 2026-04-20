import React from 'react';
import { IoIosTrendingDown } from 'react-icons/io';

interface Props {
  price: number;
  discountPrice: number;
}

const ProductPrice = ({ price, discountPrice }: Props) => {
  const discountPercent = 100 * ((price - discountPrice) / price);

  return (
    <div className="flex items-center gap-6 mt-2">
      <div className="flex flex-col">
        <strong className="text-3xl">
          {Number(discountPrice).toFixed(2)}TL
        </strong>
        <span className="ml-1 line-through text-gray-400">
          {Number(price).toFixed(2)}TL
        </span>
      </div>

      {discountPercent >= 20 && (
        <div className="bg-green-200/50 px-3 py-2 flex items-center justify-center gap-1.5 font-bold text-green-400 rounded">
          <IoIosTrendingDown size={20} />%{discountPercent.toFixed(0)}
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
