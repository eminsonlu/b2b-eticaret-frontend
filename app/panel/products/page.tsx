import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import ProductsContainer from '@/containers/panel/ProductsContainer';
import { fetchPanelProducts } from '@/services/productService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;
export const generateMetadata = async () => {
  return {
    title: 'Ürünler',
  };
};

const ProductsPage = async () => {
  const [error, products] = await fetchPanelProducts();

  if (error?.statusCode == 403) {
    redirect('/403');
  }

  if (error) {
    return 'Error';
  }

  const steps = [{ title: 'Ürünler', path: '/panel/products' }];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <ProductsContainer products={products} />
    </>
  );
};

export default ProductsPage;
