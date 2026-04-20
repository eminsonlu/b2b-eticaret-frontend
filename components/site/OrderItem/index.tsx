'use client';
import { IOrder } from '@/types/IOrder';
import cn from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { STATUSES } from '@/constants';

interface Props extends IOrder {
  show?: boolean;
  onClick?: () => void;
  highlight?: boolean;
}

const OrderItem = ({
  show = false,
  onClick,
  highlight = false,
  ...order
}: Props) => {
  return (
    <div
      className={cn('flex flex-col border rounded-md', {
        'border-slate-200': !show,
        'border-primary-100': show,
        '!border-primary-200': highlight && !show,
      })}
    >
      <div
        className={cn(
          'w-full p-3 box-border cursor-pointer',
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3',
          {
            'bg-slate-100 rounded-md': !show,
            'bg-primary-100': show,
            '!bg-primary-100': highlight && !show,
          }
        )}
        onClick={onClick}
      >
        <div className="flex flex-col gap-0.5 text-sm sm:col-span-1">
          <span className="font-semibold text-xs sm:text-sm">
            Sipariş Tarihi:
          </span>
          <span className="text-xs">
            {DateTime.fromISO(order.createdAt).toFormat('yyyy-MM-dd hh:mm')}
          </span>
        </div>

        <div className="flex flex-col gap-0.5 text-sm">
          <span className="font-semibold text-xs sm:text-sm">
            Sipariş Özeti:
          </span>
          <span className="text-xs">{order.items.length} Ürün</span>
        </div>

        <div className="flex flex-col gap-0.5 text-sm sm:flex">
          <span className="font-semibold text-xs sm:text-sm">
            Sipariş Durumu
          </span>
          <span className="text-xs">{STATUSES[order.status]}</span>
        </div>

        <div className="flex flex-col gap-0.5 text-sm">
          <span className="font-semibold text-xs sm:text-sm">Tutar:</span>
          <span className="text-xs">{Number(order.total).toFixed(2)}TL</span>
        </div>

        <div>
          <Link
            href={`/siparisler/${order.id}`}
            className={cn(
              'text-black font-medium',
              'text-xs sm:text-sm hover:underline ml-auto my-auto',
              'inline-flex items-center gap-1 sm:gap-2'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            Sipariş Detayı
            <FaLongArrowAltRight className="text-sm sm:text-base" />
          </Link>
        </div>
      </div>

      {show && (
        <div className="p-2 sm:p-3 w-full flex flex-col gap-1.5 sm:gap-2">
          {order.items.map((item: any, itemIndex: number) => (
            <div
              key={itemIndex}
              className="w-full p-2 sm:p-3 bg-primary-100/50 flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <span className="font-medium w-full sm:w-auto">{item.title}</span>
              <span className="ml-auto mt-1 sm:mt-0">
                {Number(item.price).toFixed(2)} TL
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderItem;
