import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import CouponsContainer from '@/containers/panel/CouponsContainer';
import { fetchPanelCoupons } from '@/services/couponService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Kupon Kodu Yönetimi',
  };
};

const CouponsPage = async () => {
  const [reqErr, coupons] = await fetchPanelCoupons();

  if (reqErr?.statusCode == 403) {
    redirect('/403');
  }

  if (reqErr) {
    return 'Error';
  }

  const steps = [{ title: 'Kupon Kodu Yönetimi', path: '/panel/coupons' }];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <CouponsContainer coupons={coupons} />
    </>
  );
};

export default CouponsPage;
