import CategoryContainer from '@/containers/site/CategoryContainer';
import { fetchCategoryBySlug } from '@/services/categoryService';
import { fetchProducts } from '@/services/productService';
import { notFound } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

interface ICtx {
  params: Promise<{
    categorySlug: string;
  }>;
}

export const generateMetadata = async (ctx: ICtx) => {
  const { categorySlug } = await ctx.params;
  const [categoryErr, category] = await fetchCategoryBySlug(categorySlug);

  if (categoryErr || !category) {
    return {
      title: 'Bulunamadı',
      description: 'Kategori bulunamadı',
    };
  }

  return {
    title: `${category?.title || 'Kategori'} Kategorisi`,
    description: category?.description || 'Kategori bulunamadı',

    openGraph: {
      title: `${category?.title || 'Kategori'} Kategorisi`,
      description: category?.description || `${category?.title || 'Kategori'} Kategorisi`,
      images: category?.thumbnail
        ? [`${process.env.NEXT_PUBLIC_CDN_URL}/images/${category.thumbnail}`]
        : [],
      type: 'article',
    },
    alternates: {
      canonical: `https://tekyerde.com/${categorySlug}`,
    },
  };
};

const CategoryPage = async (ctx: ICtx) => {
  const { categorySlug } = await ctx.params;

  const [categoryErr, category] = await fetchCategoryBySlug(categorySlug);

  if (categoryErr || !category) {
    notFound();
  }

  const [productErr, products] = await fetchProducts({ category: category?.id });

  return (
    <CategoryContainer
      category={category}
      products={!productErr && products ? products : []}
    />
  );
};

export default CategoryPage;
