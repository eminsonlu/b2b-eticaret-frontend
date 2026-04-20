import BlogContainer from '@/containers/site/BlogContainer';
import { fetchBlogBySlug } from '@/services/blogService';
import { notFound } from 'next/navigation';
import React from 'react';

interface ICtx {
  params: Promise<{
    blogSlug: string;
  }>;
}

export const revalidate = 0;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) => {
  const { blogSlug } = await params;
  const [blogError, blog] = await fetchBlogBySlug(blogSlug);

  if (blogError || !blog) {
    return {
      title: 'Blog Yazısı Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.',
    };
  }

  return {
    title: blog.title,
    description:
      blog.summary || blog.description?.substring(0, 160) || 'Blog yazısı',
    openGraph: {
      title: blog.title,
      description:
        blog.summary || blog.description?.substring(0, 160) || 'Blog yazısı',
      images: blog.thumbnail
        ? [`${process.env.NEXT_PUBLIC_CDN_URL}/images/c-${blog.thumbnail}`]
        : ['https://tekyerde.com/logo.svg'],
      type: 'article',
    },
    alternates: {
      canonical: `https://tekyerde.com/blog/${blog.slug}`,
    },
  };
};

const BlogDetailPage = async (ctx: ICtx) => {
  const { blogSlug } = await ctx.params;
  const [blogError, blog] = await fetchBlogBySlug(blogSlug);

  if (blogError || !blog) {
    notFound();
  }

  return (
    <>
      <BlogContainer blog={blog} />
    </>
  );
};

export default BlogDetailPage;
