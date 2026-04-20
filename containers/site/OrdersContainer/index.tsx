'use client';
import MultiSelect from '@/components/shared/MultiSelect/MultiSelect';
import Notification from '@/components/shared/Notification';
import Select from '@/components/shared/Select';
import OrderItem from '@/components/site/OrderItem';
import { fetchOrders } from '@/services/orderService';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { STATUSES } from '@/constants';

const OrdersContainer = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const orderStatus = searchParams.get('success');

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(Object.keys(STATUSES)[0]);

  const handleSelectStatus = (selected: string) => {
    setSelectedStatus(selected);
  };

  useEffect(() => {
    (async () => {
      const [err, results] = await fetchOrders({
        status: selectedStatus || undefined,
      });
      if (err) return;
      setOrders(results);

      if (orderId) {
        const index = results.findIndex((item: any) => item.id === orderId);
        if (index !== -1) {
          setSelectedIndex(index);
        }
      }
    })();
  }, [selectedStatus]);

  return (
    <>
      <div className="container flex items-center justify-center group px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
          Siparişlerim
          <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[960px] flex items-center justify-center gap-4 mt-4 sm:mt-6 md:mt-8 px-4 md:px-0 sm:px-6">
        <Select
          label="Sipariş Durumu"
          value={selectedStatus}
          onSelect={handleSelectStatus}
          options={Object.entries(STATUSES).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        >
          {Object.entries(STATUSES).map(([key, value]) => (
            <Select.Option key={key} value={key}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </div>

      {orderStatus && (
        <div className="mx-auto w-full max-w-[960px] my-6">
          <Notification color={orderStatus === 'true' ? 'orange' : 'red'}>
            {orderStatus === 'true' ? (
              <span className="font-semibold text-lg">
                Siparişiniz başarıyla alındı.
              </span>
            ) : (
              <span className="font-semibold">Siparişiniz alınamadı.</span>
            )}

            <p className="mt-1">
              {orderStatus === 'true'
                ? 'Siparişinizin hazırlanıp kargoya verilmesi için gerekli görselleri yüklemeniz yeterlidir. Görseller yüklendikten sonra en kısa sürede siparişiniz işleme alınacaktır.'
                : 'Lütfen tekrar deneyin veya müşteri hizmetleri ile iletişime geçin.'}
            </p>

            {orderStatus === 'true' && (
              <Link
                href={`/siparisler/${orderId}`}
                className="underline mt-4 inline-block"
              >
                Gerekli dosyaları yüklemek için tıklayın
              </Link>
            )}
          </Notification>
        </div>
      )}

      <div className="mx-auto w-full max-w-[960px] flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 px-4 md:px-0 sm:px-6">
        {orders.length === 0 && (
          <div className="italic text-slate-600 text-center">
            Henüz siparişiniz bulunmamaktadır.
          </div>
        )}

        {orders.map((order: any, index) => (
          <OrderItem
            key={index}
            {...order}
            show={selectedIndex === index}
            onClick={() =>
              setSelectedIndex(selectedIndex === index ? null : index)
            }
            highlight={
              orderId === order.id && orderStatus === 'true' ? true : false
            }
          />
        ))}
      </div>
    </>
  );
};

export default OrdersContainer;
