import BlogsContainer from '@/containers/site/BlogsContainer';
import { fetchBlogs } from '@/services/blogService';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: `Blog Yazıları`,
    description: `En güncel makaleler, haberler ve içerikler. Kişiye özel baskılı ürünler ve tasarım hakkında faydalı bilgiler.`,
    openGraph: {
      title: `Blog Yazıları`,
      description: `En güncel makaleler, haberler ve içerikler. Kişiye özel baskılı ürünler ve tasarım hakkında faydalı bilgiler.`,
      images: ['https://tekyerde.com/logo.svg'],
      type: 'website',
    },
    alternates: {
      canonical: `https://tekyerde.com/blog`,
    },
  };
};

const BlogsPage = async () => {
  const [blogError, blogs] = await fetchBlogs();

  if (blogError) {
    return <div>Bir hata oluştu</div>;
  }

  return (
    <>
      <BlogsContainer blogs={blogs || []} />
    </>
  );
};

export default BlogsPage;