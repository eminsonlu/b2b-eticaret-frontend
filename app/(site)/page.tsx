import HomeContainer from '@/containers/site/HomeContainer';
import { fetchHomePageData } from '@/services/commonService';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: `Anasayfa`,
    description: `Kişiye özel baskılı ürünlerle farkınızı yansıtın! Tişört, kupa, çanta ve daha fazlasını kendi tasarımınızla hemen oluşturun. Hızlı kargo, kaliteli baskı!`,

    openGraph: {
      title: `Anasayfa`,
      description: `Kişiye özel baskılı ürünlerle farkınızı yansıtın! Tişört, kupa, çanta ve daha fazlasını kendi tasarımınızla hemen oluşturun. Hızlı kargo, kaliteli baskı!`,
      images: ['https://tekyerde.com/logo.svg'],
      type: 'article',
    },
    alternates: {
      canonical: `https://tekyerde.com`,
    },
  };
};

const HomePage = async () => {
  const [dataErr, data] = await fetchHomePageData();
  console.log('data', data);
  if (dataErr) {
    return <div>error</div>;
  }

  return (
    <>
      <HomeContainer
        storyProducts={
          data?.storyProducts
            ? data.storyProducts.filter(
                (product: any) => product?.isShowStories
              )
            : []
        }
        slider={data?.slider ? data.slider : null}
        notice={data?.notice ? data.notice : null}
        featuredCategories={
          data?.featuredCategories ? data.featuredCategories : []
        }
      />
    </>
  );
};

export default HomePage;
