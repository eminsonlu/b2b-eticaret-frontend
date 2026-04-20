'use client';
import React from 'react';
import IBlog from '@/types/IBlog';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { MdArrowRightAlt } from 'react-icons/md';

interface Props {
  blogs: IBlog[];
}

const BlogsContainer = ({ blogs = [] }: Props) => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog Yazıları</h1>
        <p className="text-gray-600 text-lg">En güncel makaleler ve haberler</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {blog.thumbnail && (
              <Link href={`/blog/${blog.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/c-${blog.thumbnail}`}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                  {DateTime.fromISO(blog.createdAt).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </span>
              </div>
              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-xl font-bold mb-3 line-clamp-2">
                  {blog.title}
                </h2>
              </Link>

              {blog.summary && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.summary}
                </p>
              )}

              <Link
                href={`/blog/${blog.slug}`}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium transition-colors"
              >
                <span>Devamını Oku</span>
                <MdArrowRightAlt size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Henüz blog yazısı bulunmuyor.</p>
        </div>
      )}
    </div>
  );
};

export default BlogsContainer;
