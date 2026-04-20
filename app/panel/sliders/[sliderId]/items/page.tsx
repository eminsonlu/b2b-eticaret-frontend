import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import SliderItemsContainer from '@/containers/panel/SliderItemsContainer';
import {
  fetchPanelSliderById,
  fetchPanelSliderItems,
} from '@/services/sliderService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

interface ICtx {
  params: Promise<{
    sliderId: string;
  }>;
}

export const generateMetadata = async (ctx: ICtx) => {
  const { sliderId } = await ctx.params;
  const [sliderError, slider] = await fetchPanelSliderById(sliderId);

  return {
    title: `${slider.title} Slider Öğeleri`,
  };
};

const SliderItemsPage = async (ctx: ICtx) => {
  const { sliderId } = await ctx.params;
  const [sliderError, slider] = await fetchPanelSliderById(sliderId);

  if (sliderError?.statusCode == 403) {
    redirect('/403');
  }

  if (sliderError) {
    return 'Error';
  }

  const [sliderItemerr, sliderItems] = await fetchPanelSliderItems(slider.id);

  if (sliderItemerr?.statusCode == 403) {
    redirect('/403');
  }

  if (sliderItemerr) {
    return 'Error';
  }

  const steps = [
    { title: 'Slider Yönetimi', path: '/panel/sliders' },
    {
      title: `${slider.title} Öğeleri`,
      path: `/panel/sliders/${slider.id}/items`,
    },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <SliderItemsContainer slider={slider} items={sliderItems} />
    </>
  );
};

export default SliderItemsPage;
