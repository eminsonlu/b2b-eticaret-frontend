import CartContainer from '@/containers/site/CartContainer';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Sepetim',
  };
};

const CartPage = () => {
  return <CartContainer />;
};

export default CartPage;
