import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import PanelHomePageContainer from '@/containers/panel/PanelHomePageContainer';
import { fetchPanelAppData } from '@/services/commonService';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Yönetim Paneli',
  };
};

const PanelHomePage = async () => {
  const [err, data] = await fetchPanelAppData();

  if (err) {
    return <div>Error</div>;
  }

  return (
    <>
      <BreadcrumbStoreProvider steps={[]} />
      <PanelHomePageContainer data={data} />
    </>
  );
};

export default PanelHomePage;
