'use client';

import { useEffect } from 'react';
// import { notify } from '../utils/bugsnag';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Button from '@/components/shared/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   notify(error, { source: 'error_boundary' });
  // }, [error]);

  return (
    <>
      <Header categories={[]} />
      <div className="bg-gray-50 flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Bir Hata Oluştu
            </h1>
            <p className="text-gray-600 mb-8">
              Üzgünüz, bir şeyler ters gitti. Lütfen tekrar deneyin veya daha sonra tekrar gelin.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              color='primary'
              className='w-full'
              onClick={reset}
            >
              Tekrar Dene
            </Button>

            <Button
              color='white'
              className='w-full'
              onClick={() => window.location.href = '/'}
            >
              Ana Sayfaya Dön
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Sorun devam ederse, lütfen destek ekibimizle iletişime geçin.</p>
          </div>
        </div>
      </div>
      <Footer categories={[]} />
    </>
  );
}