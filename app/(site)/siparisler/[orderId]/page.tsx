import OrderDetailContainer from '@/containers/site/OrderDetailContainer';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Sipariş Detayı',
  };
};

interface ICtx {
  params: Promise<{
    orderId: string;
  }>;
}

const OrderDetail = async (ctx: ICtx) => {
  const { orderId } = await ctx.params;
  return <OrderDetailContainer orderId={orderId} />;
};

export default OrderDetail;
