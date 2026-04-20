import AIGiftAssistantContainer from '@/containers/site/AIGiftAssistantContainer';
import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'AI Hediye Asistanı',
  };
};

const AIGiftAssistantPage = async () => {
  const steps = [
    { title: 'AI Hediye Asistanı', path: '/ai-hediye-asistani' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <AIGiftAssistantContainer />
    </>
  );
};

export default AIGiftAssistantPage;

