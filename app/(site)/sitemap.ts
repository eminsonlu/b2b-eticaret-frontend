import { fetchProducts } from '@/services/productService';
import { fetchCategories } from '@/services/categoryService';
import { fetchTags } from '@/services/tagService';
import ICategory from '@/types/ICategory';
import type { MetadataRoute } from 'next';
import ITag from '@/types/ITag';
import IProduct from '@/types/IProduct';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002'
    : 'https://tekyerde.com';

const generateVariantUrls = (
  baseUrl: string,
  variants: Array<any>,
  updatedAt: string
): MetadataRoute.Sitemap => {
  const variantObjects = variants
    .map((v) => v.variantValues)
    .filter((arr) => Array.isArray(arr) && arr.length > 0)
    .map((arr) =>
      arr.reduce((obj: any, item: any) => {
        if (item?.variant?.title && item?.value) {
          obj[item.variant.title] = item.title;
        }
        return obj;
      }, {} as Record<string, string>)
    )
    .filter((vo) => Object.keys(vo).length > 0);

  return variantObjects.map((vo: any) => {
    const query = Object.entries(vo)
      .map(([k, v]: any) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&amp;');
    return {
      url: `${baseUrl}?${query}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    };
  });
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date();
  const baseList: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  const [[catErr, categories], [prodErr, products], [tagErr, tags]] =
    await Promise.all([fetchCategories(), fetchProducts(), fetchTags()]);

  // Kategoriler
  const categoryUrls = !catErr
    ? categories.map((c: ICategory) => ({
        url: `${BASE_URL}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }))
    : [];

  // Ürünler + varyantlar
  const productUrls = !prodErr
    ? products.flatMap((product: IProduct) => {
        const baseUrls = product.categories.map((cat) => ({
          url: `${BASE_URL}/${cat.slug}/${product.slug}`,
          lastModified: new Date(product.updatedAt),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        }));
        const variantUrls = product.categories.flatMap((cat) =>
          generateVariantUrls(
            `${BASE_URL}/${cat.slug}/${product.slug}`,
            product.variants || [],
            product.updatedAt
          )
        );
        return [...baseUrls, ...variantUrls];
      })
    : [];

  // Etiketler
  const tagUrls = !tagErr
    ? tags.map((t: ITag) => ({
        url: `${BASE_URL}/ara?s=${t.slug}`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }))
    : [];

  return [...baseList, ...categoryUrls, ...productUrls, ...tagUrls];
};

export default sitemap;
