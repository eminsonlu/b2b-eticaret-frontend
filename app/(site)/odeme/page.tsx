import PaymentContainer from '@/containers/site/PaymentContainer';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Ödemeyi Tamamla',
  };
};

const PaymentPage = () => {
  return <PaymentContainer />;
};

export default PaymentPage;
