'use client';
import OrderAttachments from '@/components/site/OrderAttachements';
import { PAYMENT_METHODS, PAYMENT_STATUSES, STATUSES } from '@/constants';
import { fetchOrderById } from '@/services/orderService';
import { IOrder } from '@/types/IOrder';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

interface Props {
  orderId: string;
}

const OrderDetailContainer = ({ orderId }: Props) => {
  const [order, setOrder] = useState<null | IOrder>(null);

  useEffect(() => {
    (async () => {
      const [err, result] = await fetchOrderById(orderId);
      if (err) return;
      setOrder(result);
    })();
  }, [orderId]);

  return (
    <>
      <div className="container flex items-center justify-center group px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
          Sipariş Detayı
          <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      {order && (
        <div className="mx-auto w-full max-w-[960px] flex flex-col gap-6 sm:gap-8 md:gap-12 mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6">
          <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 box-border">
            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-3 sm:p-4 box-border rounded-md bg-slate-100">
              <span className="text-xs sm:text-sm text-slate-600">
                Sipariş Tarihi
              </span>
              <span className="font-semibold text-sm sm:text-base text-center">
                {DateTime.fromISO(order.createdAt).toFormat('yyyy-MM-dd hh:mm')}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-3 sm:p-4 box-border rounded-md bg-slate-100">
              <span className="text-xs sm:text-sm text-slate-600">
                Sipariş Özeti
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {order.items.length} Ürün
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-3 sm:p-4 box-border rounded-md bg-slate-100">
              <span className="text-xs sm:text-sm text-slate-600">
                Sipariş Durumu
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {STATUSES[order.status]}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-3 sm:p-4 box-border rounded-md bg-slate-100">
              <span className="text-xs sm:text-sm text-slate-600">
                Ödeme Durumu
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {PAYMENT_STATUSES[order.paymentStatus]}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-3 sm:p-4 box-border rounded-md bg-slate-100">
              <span className="text-xs sm:text-sm text-slate-600">Tutar</span>
              <span className="font-semibold text-sm sm:text-base">
                {Number(order.total).toFixed(2)}TL
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold border-b border-slate-200 pr-4 sm:pr-8 mr-auto pb-1 sm:pb-2">
              Sipariş Detayları
            </h3>

            <div className="flex flex-col">
              <span className="text-sm text-slate-600">Ödeme Türü: </span>
              <strong className="font-semibold text-sm sm:text-base">
                {PAYMENT_METHODS[order.paymentMethod]}
              </strong>
            </div>

            {order.paymentMethod === 'BANK_TRANSFER' && (
              <div className="flex flex-col">
                <span className="text-sm text-slate-600">
                  Havale/EFT yapılacak banka hesabı:{' '}
                </span>
                <strong className="font-semibold text-sm sm:text-base">
                  {order.bankAccount}
                </strong>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-sm text-slate-600">Kargo Adresi: </span>
              <strong className="font-semibold text-sm sm:text-base">
                {order.address}
              </strong>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-600">Kargo Ücreti: </span>
              <strong className="font-semibold text-sm sm:text-base">
                {order.shippingCost.toFixed(2)}TL
              </strong>
            </div>

            {order.notes && (
              <div className="flex flex-col">
                <span className="text-sm text-slate-600">Kargo Notları: </span>
                <div 
                  className="prose prose-sm max-w-none text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: order.notes }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold border-b border-slate-200 pr-4 sm:pr-8 mr-auto pb-1 sm:pb-2">
              Ürünler
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4">
              {order.items.map((item) => (
                <OrderAttachments key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailContainer;
