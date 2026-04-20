import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import CategoriesContainer from '@/containers/panel/CategoriesContainer';
import { fetchPanelCategories } from '@/services/categoryService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Kategoriler',
  };
};

const CategoriesPage = async () => {
  const [error, categories] = await fetchPanelCategories();

  if (error?.statusCode == 403) {
    redirect('/403');
  }

  if (error) {
    return 'Error';
  }

  const steps = [
    { title: 'Ürünler', path: '/panel/products' },
    { title: 'Kategoriler', path: '/panel/products/categories' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <CategoriesContainer categories={categories} />
    </>
  );
};

export default CategoriesPage;
