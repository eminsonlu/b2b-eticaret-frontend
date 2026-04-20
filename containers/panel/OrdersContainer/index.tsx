'use client';
import React from 'react';
import { FiEye } from 'react-icons/fi';
import { IOrder } from '@/types/IOrder';
import { DateTime } from 'luxon';
import { useRouter, useSearchParams } from 'next/navigation';
import { PAYMENT_METHODS, PAYMENT_STATUSES, STATUSES } from '@/constants';
import Select from '@/components/shared/Select';
import Table from '@/components/shared/Table';
import { useAuthStore } from '@/stores/authStore';

const OrdersContainer = ({ orders = [] }: { orders: IOrder[] }) => {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const order = searchParams.get('status') || '';
  const router = useRouter();

  const COLUMNS = [
    {
      title: 'Ad Soyad',
      content: (row: IOrder) => `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      title: 'Fiyat',
      content: (row: IOrder) => `${(row.total).toFixed(2)}TL`,
      className: 'w-[125px] max-w-[125px]',
    },
    {
      title: 'Ürün Adedi',
      content: (row: IOrder) => `${row.items.length} Adet`,
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'Durum',
      content: (row: IOrder) => STATUSES[row.status],
      className: 'w-[175px] max-w-[175px]',
    },
    {
      title: 'Ödeme Durumu',
      content: (row: IOrder) => PAYMENT_STATUSES[row.paymentStatus],
      className: 'w-[175px] max-w-[175px]',
    },
    {
      title: 'Ödeme Tipi',
      content: (row: IOrder) => PAYMENT_METHODS[row.paymentMethod],
      className: 'w-[175px] max-w-[175px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: IOrder) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[175px] max-w-[175px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: IOrder) => DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[175px] max-w-[175px]',
    },
  ];

  const actions = [
    {
      icon: <FiEye size={16} />,
      title: 'Detay',
      action: (row: IOrder) => router.push(`/panel/orders/${row.id}`),
      hidden: !user?.role?.order?.includes('UPDATE'),
    },
  ];

  const handleOnChangeFilter = (value: string) => {
    router.push(`/panel/orders${value ? `?status=${value}` : ''}`);
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Siparişler</h1>
      </div>

      <Select
        options={[
          {
            label: 'Hepsini Göster',
            value: '',
          },
          ...Object.keys(STATUSES).map((status) => ({
            label: STATUSES[status],
            value: status,
          })),
        ]}
        value={order}
        onSelect={handleOnChangeFilter}
        className="max-w-[265px] ml-auto"
      />
      <Table columns={COLUMNS} actions={actions} data={orders} />
    </>
  );
};

export default OrdersContainer;
