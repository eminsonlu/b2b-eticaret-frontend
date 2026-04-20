'use client';
import { Suspense } from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Button from '@/components/shared/Button';

export default function NotFound() {
  return (
    <>
      <Suspense>
        <Header categories={[]} />
      </Suspense>
      <div className="bg-gray-50 flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Sayfa Bulunamadı
            </h1>
            <p className="text-gray-600 mb-8">
              Aradığınız sayfa mevcut değil. Sayfa taşınmış veya silinmiş olabilir.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              color='primary'
              className='w-full'
              onClick={() => window.location.href = '/'}
            >
              Ana Sayfaya Dön
            </Button>

            <Button
              color='white'
              className='w-full'
              onClick={() => window.history.back()}
            >
              Geri Git
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Aradığınız sayfayı bulamıyorsanız, ana sayfadan tekrar deneyin.</p>
          </div>
        </div>
      </div>
      <Footer categories={[]} />
    </>
  );
}