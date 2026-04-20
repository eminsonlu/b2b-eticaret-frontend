import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import TagsContainer from '@/containers/panel/TagsContainer';
import { fetchPanelTags } from '@/services/tagService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Etiketler',
  };
};

const TagsPage = async () => {
  const [tagError, tags] = await fetchPanelTags();

  if (tagError?.statusCode == 403) {
    redirect('/403');
  }

  if (tagError) {
    return 'Error';
  }

  const steps = [
    { title: 'Ürünler', path: '/panel/products' },
    { title: 'Etiketler', path: '/panel/products/tags' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <TagsContainer tags={tags} />
    </>
  );
};

export default TagsPage;
