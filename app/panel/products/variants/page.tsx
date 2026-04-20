import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import VariantsContainer from '@/containers/panel/VariantsContainer';
import { fetchPanelVariants } from '@/services/variantService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Varyantlar',
  };
};

const VariantsPage = async () => {
  const [error, variants] = await fetchPanelVariants();

  if (error?.statusCode == 403) {
    redirect('/403');
  }

  if (error) {
    return 'Error';
  }

  const steps = [
    { title: 'Ürünler', path: '/panel/products' },
    { title: 'Varyantlar', path: '/panel/products/variants' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <VariantsContainer variants={variants} />
    </>
  );
};

export default VariantsPage;
