import OrderDetailContainer from '@/containers/panel/OrderDetailContainer';
import { fetchPanelOrderById } from '@/services/orderService';
import { redirect } from 'next/navigation';
import React from 'react';

interface ICtx {
  params: Promise<{
    orderId: string;
  }>;
}

const OrderDetailPage = async (ctx: ICtx) => {
  const { orderId } = await ctx.params;
  const [err, order] = await fetchPanelOrderById(orderId);

  if (err?.statusCode == 403) {
    redirect('/403');
  }

  if (err) {
    return 'Error';
  }

  return <OrderDetailContainer order={order} />;
};

export default OrderDetailPage;
