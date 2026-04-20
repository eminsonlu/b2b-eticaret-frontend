import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import EditProductContainer from '@/containers/panel/EditProductContainer';
import { fetchPanelCategories } from '@/services/categoryService';
import { fetchPanelProductById } from '@/services/productService';
import { fetchPanelTags } from '@/services/tagService';
import { fetchPanelVariants } from '@/services/variantService';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Ürün Düzenle',
  };
};

interface ICtx {
  params: Promise<{
    productId: string;
  }>;
}

const EditProductPage = async (ctx: ICtx) => {
  const { productId } = await ctx.params;
  const [productErr, product] = await fetchPanelProductById(productId);

  if (productErr) {
    return 'ERROR';
  }

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
    { title: product?.title, path: `/panel/products/${productId}` },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <EditProductContainer
        categories={categoriesErr ? [] : categories}
        tags={tagsErr ? [] : tags}
        variants={variantsErr ? [] : variants}
        product={product}
      />
    </>
  );
};

export default EditProductPage;
