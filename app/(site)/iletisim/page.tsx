import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim Bilgileri - Tekyerde.com',
  description:
    'İletişim bilgileri hakkında bilgi almak için bu sayfayı ziyaret edebilirsiniz.',
};

const IletisimPage = () => {
  return (
    <div className="container py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Bizimle İletişime Geçin
      </h1>

      <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <p className="text-gray-700 mb-4">
          Önerileriniz, sorularınız veya işbirliği teklifleriniz için bizimle
          iletişime geçebilirsiniz.
        </p>
        <div className="flex items-center gap-2">
          <span className="font-medium">E-posta:</span>
          <a
            href="mailto:destek@tekyerde.com"
            className="text-primary-500 hover:underline"
          >
            destek@tekyerde.com
          </a>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-medium">Adres:</span>
          <a href="#">
            23 Nisan Mah. 251. Sk Referans Deluxe A blok Kat:3 İç No:5
            Nilüfer/BURSA
          </a>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-medium">Telefon:</span>
          <a href="#" className="text-primary-500 hover:underline">
            +90 553 534 52 72
          </a>
        </div>
      </div>
    </div>
  );
};

export default IletisimPage;
