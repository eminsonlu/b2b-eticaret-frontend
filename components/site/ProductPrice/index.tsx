import React from 'react';
import { IoIosTrendingDown } from 'react-icons/io';

interface Props {
  price: number;
  discountPrice?: number | null;
}

const ProductPrice = ({ price, discountPrice }: Props) => {
  const listPrice = Number(price);
  const rawSale =
    discountPrice != null && discountPrice !== ''
      ? Number(discountPrice)
      : NaN;

  const hasDiscount =
    Number.isFinite(listPrice) &&
    listPrice > 0 &&
    Number.isFinite(rawSale) &&
    rawSale > 0 &&
    rawSale < listPrice;

  const displayMain = hasDiscount ? rawSale : listPrice;
  const discountPercent = hasDiscount
    ? (100 * (listPrice - rawSale)) / listPrice
    : 0;

  return (
    <div className="flex items-center gap-6 mt-2">
      <div className="flex flex-col">
        <strong className="text-3xl">
          {Number.isFinite(displayMain) ? displayMain.toFixed(2) : '0.00'}TL
        </strong>
        {hasDiscount && (
          <span className="ml-1 line-through text-gray-400">
            {listPrice.toFixed(2)}TL
          </span>
        )}
      </div>

      {hasDiscount && discountPercent >= 20 && (
        <div className="bg-green-200/50 px-3 py-2 flex items-center justify-center gap-1.5 font-bold text-green-400 rounded">
          <IoIosTrendingDown size={20} />%{discountPercent.toFixed(0)}
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
