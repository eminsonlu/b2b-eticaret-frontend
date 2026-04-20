'use client';
import React, { useEffect } from 'react';
import IBlog from '@/types/IBlog';
import { DateTime } from 'luxon';
import ProductItem from '@/components/site/ProductItem';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

interface Props {
  blog: IBlog;
}

const BlogContainer = ({ blog }: Props) => {
  const { setSteps } = useBreadcrumbStore();

 useEffect(() => {
     setSteps([
       {
         title: 'Bloglar',
         path: `/blog`,
       },
       {
         title: blog.title,
         path: `/blog/${blog.slug}`,
       },
     ]);
   }, [blog, setSteps]);

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-6 md:gap-12 px-4 sm:px-6 md:px-8">
      <Breadcrumb className="-mb-2 md:-mb-4" />

      <article className="max-w-4xl mx-auto">
        {blog.thumbnail && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${blog.thumbnail}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-500">
              {DateTime.fromISO(blog.createdAt).toLocaleString(
                DateTime.DATE_MED
              )}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {blog.title}
          </h1>

          {blog.summary && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {blog.summary}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: blog.description || '' }}
            className="leading-relaxed"
          />
        </div>

        {blog.products && blog.products.length > 0 && (
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">İlgili Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {blog.products.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogContainer;
