import AIGiftRecommendationsContainer from '@/containers/site/AIGiftRecommendationsContainer';
import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Hediye Önerileri - AI Hediye Asistanı',
  description: 'Size özel hediye önerileri',
};

const AIGiftRecommendationsPage = () => {
  const steps = [
    { title: 'AI Hediye Asistanı', path: '/ai-hediye-asistani' },
    { title: 'Wizard', path: '/ai-hediye-asistani/wizard' },
    { title: 'Öneriler', path: '/ai-hediye-asistani/recommendations' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <Suspense fallback={
        <div className="container px-4 sm:px-6 mt-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Yükleniyor...</p>
          </div>
        </div>
      }>
        <AIGiftRecommendationsContainer />
      </Suspense>
    </>
  );
};

export default AIGiftRecommendationsPage;

