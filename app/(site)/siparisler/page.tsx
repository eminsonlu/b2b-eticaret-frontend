import OrdersContainer from '@/containers/site/OrdersContainer';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Siparişlerim',
  };
};

const OrdersPage = async () => {
  return <OrdersContainer />;
};

export default OrdersPage;
