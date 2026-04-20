'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

const AIGiftAssistantContainer = () => {
  const router = useRouter();
  const { setSteps } = useBreadcrumbStore();

  useEffect(() => {
    setSteps([
      {
        title: 'AI Hediye Asistanı',
        path: '/ai-hediye-asistani',
      },
    ]);
  }, [setSteps]);

  return (
    <>
      <div className="container flex items-center justify-center group px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
          AI Hediye Asistanı
          <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="container px-4 sm:px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <p className="text-center text-slate-600 mb-6">
              Size özel hediye önerileri almak için wizard'ı başlatın.
            </p>
            <div className="text-center">
              <button
                onClick={() => router.push('/ai-hediye-asistani/wizard')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Wizard'ı Başlat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIGiftAssistantContainer;

