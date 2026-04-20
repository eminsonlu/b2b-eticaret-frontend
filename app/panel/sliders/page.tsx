import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import SlidersContainer from '@/containers/panel/SlidersContainer';
import { fetchPanelSliders } from '@/services/sliderService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Slider Yönetimi',
  };
};

const SliderManagementPage = async () => {
  const [sliderError, sliders] = await fetchPanelSliders();

  if (sliderError?.statusCode == 403) {
    redirect('/403');
  }

  if (sliderError) {
    return 'Error';
  }

  const steps = [{ title: 'Slider Yönetimi', path: '/panel/sliders' }];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <SlidersContainer sliders={sliders} />
    </>
  );
};

export default SliderManagementPage;
