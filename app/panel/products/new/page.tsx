import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import NewProductContainer from '@/containers/panel/NewProductContainer';
import { fetchPanelCategories } from '@/services/categoryService';
import { fetchPanelTags } from '@/services/tagService';
import { fetchPanelVariants } from '@/services/variantService';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Yeni Ürün',
  };
};

const NewProductPage = async () => {
  const response = await Promise.all([
    fetchPanelCategories(),
    fetchPanelTags(),
    fetchPanelVariants(),
  ]);

  const [categoriesResponse, tagsResponse, variantsResponse] = response;

  const [categoriesErr, categories] = categoriesResponse;
  const [tagsErr, tags] = tagsResponse;
  const [variantsErr, variants] = variantsResponse;

  const steps = [
    { title: 'Ürünler', path: '/panel/products' },
    { title: 'Yeni Ürün', path: '/panel/products/new' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <NewProductContainer
        categories={categoriesErr ? [] : categories}
        tags={tagsErr ? [] : tags}
        variants={variantsErr ? [] : variants}
      />
    </>
  );
};

export default NewProductPage;
