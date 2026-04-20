import SearchContainer from '@/containers/site/SearchContainer';
import { fetchProducts } from '@/services/productService';
import React, { Suspense } from 'react';

interface ICtx {
  searchParams: Promise<{
    s: string;
  }>;
}

export const revalidate = 0;

export const generateMetadata = async (ctx: ICtx) => {
  const { s } = await ctx.searchParams;

  return {
    title: `Arama Sonuçları: ${s}`,
    description: `Arama Sonuçları: ${s}`,

    openGraph: {
      title: `Arama Sonuçları: ${s}`,
      description: `Arama Sonuçları: ${s}`,
      images: ['https://tekyerde.com/logo.svg'],
      type: 'article',
    },
  };
};

const SearchPage = async (ctx: ICtx) => {
  const { s } = await ctx.searchParams;
  const [productErr, products] = await fetchProducts({ search: s });

  return (
    <Suspense>
      <SearchContainer products={productErr ? [] : products} />
    </Suspense>
  );
};

export default SearchPage;
