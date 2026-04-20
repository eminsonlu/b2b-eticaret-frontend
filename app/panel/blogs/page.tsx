import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import BlogsContainer from '@/containers/panel/BlogsContainer';
import { fetchPanelBlogs } from '@/services/blogService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Blog Yazıları',
  };
};

const BlogsPage = async () => {
  const [blogError, blogs] = await fetchPanelBlogs();

  if (blogError?.statusCode == 403) {
    redirect('/403');
  }

  if (blogError) {
    return 'Error';
  }

  const steps = [
    { title: 'Blog Yazıları', path: '/panel/blogs' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <BlogsContainer blogs={blogs} />
    </>
  );
};

export default BlogsPage;