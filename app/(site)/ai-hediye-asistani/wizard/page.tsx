import AIGiftWizardContainer from '@/containers/site/AIGiftWizardContainer';
import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'AI Hediye Asistanı - Wizard',
  };
};

const AIGiftWizardPage = async () => {
  const steps = [
    { title: 'AI Hediye Asistanı', path: '/ai-hediye-asistani' },
    { title: 'Wizard', path: '/ai-hediye-asistani/wizard' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <AIGiftWizardContainer />
    </>
  );
};

export default AIGiftWizardPage;

