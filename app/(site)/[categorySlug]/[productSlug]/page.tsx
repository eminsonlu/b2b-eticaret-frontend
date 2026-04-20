import ProductContainer from '@/containers/site/ProductContainer';
import { fetchProductBySlug, fetchProducts } from '@/services/productService';
import React from 'react';

export const revalidate = 0;

interface ICtx {
  params: Promise<{
    productSlug: string;
    categorySlug: string;
  }>;
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export const generateMetadata = async (ctx: ICtx) => {
  const { productSlug, categorySlug } = await ctx.params;
  const searchParams = await ctx.searchParams;

  const [productErr, product] = await fetchProductBySlug(productSlug);

  if (productErr || !product) {
    return {
      title: 'Ürün Bulunamadı',
      description: 'Ürün Bulunamadı',
    };
  }

  const initialSelecteds = (product.variants || []).reduce((acc: any, variant: any) => {
    if (variant && variant.values && Array.isArray(variant.values) && variant.values.length > 0 && variant.values[0]) {
      acc[variant.title] = searchParams[variant.title] ?? variant.values[0]?.title;
    }
    return acc;
  }, {});

  // fetch variant data
  const [variantProductErr, variantProduct] = await fetchProductBySlug(
    productSlug,
    initialSelecteds
  );

  return {
    title: productErr
      ? 'Ürün Bulunamadı'
      : `${product?.type === 'SIMPLE' ? product.title : variantProduct?.title || product.title}`,
    description: productErr ? 'Ürün Bulunamadı' : product.summary || '',

    openGraph: {
      title: productErr
        ? 'Ürün Bulunamadı'
        : `${
            product?.type === 'SIMPLE' ? product.title : variantProduct?.title || product.title
          }`,
      description: productErr ? 'Ürün Bulunamadı' : product.summary || '',
      images: productErr
        ? []
        : product.thumbnail
        ? [`${process.env.NEXT_PUBLIC_CDN_URL}/images/${product.thumbnail}`]
        : [],
      type: 'article',
    },
    alternates: {
      canonical: `https://tekyerde.com/${categorySlug}/${productSlug}`,
    },
  };
};

const ProductPage = async (ctx: ICtx) => {
  const { productSlug } = await ctx.params;
  const searchParams = await ctx.searchParams;

  const [productErr, product] = await fetchProductBySlug(productSlug);

  if (productErr || !product) {
    return (
      <div className="container px-4 sm:px-6 mt-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h1>
          <p className="text-slate-600">Aradığınız ürün bulunamadı.</p>
        </div>
      </div>
    );
  }

  const initialSelecteds = (product.variants || []).reduce((acc: any, variant: any) => {
    if (variant && variant.values && Array.isArray(variant.values) && variant.values.length > 0 && variant.values[0]) {
      acc[variant.title] = searchParams[variant.title] ?? variant.values[0]?.title;
    }
    return acc;
  }, {});

  const [recommendedProductErr, recommendedProducts] = await fetchProducts({
    category: product.categories?.[0]?.id,
  });

  // fetch variant data
  const [variantProductErr, variantProduct] = await fetchProductBySlug(
    productSlug,
    initialSelecteds
  );

  return (
    <ProductContainer
      product={product?.type === 'SIMPLE' ? product : variantProduct || product}
      initialSelectedVariants={initialSelecteds}
      recommendedProducts={recommendedProducts ? recommendedProducts : []}
    />
  );
};

export default ProductPage;
