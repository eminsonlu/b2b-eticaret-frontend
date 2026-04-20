import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import OrdersContainer from '@/containers/panel/OrdersContainer';
import { fetchPanelOrders } from '@/services/orderService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Siparişler',
  };
};

interface ICtx {
  searchParams: Promise<{
    status: string;
  }>;
}

const OrdersPage = async (ctx: ICtx) => {
  const { status } = await ctx.searchParams;

  const [err, orders] = await fetchPanelOrders({
    status,
  });

  if (err?.statusCode == 403) {
    redirect('/403');
  }

  if (err) {
    return 'Error';
  }

  const steps = [{ title: 'Siparişler', path: '/panel/orders' }];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <OrdersContainer orders={orders} />
    </>
  );
};

export default OrdersPage;
