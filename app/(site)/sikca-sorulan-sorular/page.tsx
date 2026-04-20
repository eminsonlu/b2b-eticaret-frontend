import React from 'react';
import SikcaSorulanSorularContainer from '@/containers/site/SikcaSorulanSorularContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular - E-Ticaret',
  description:
    'Sıkça Sorulan Sorular hakkında bilgi almak için bu sayfayı ziyaret edebilirsiniz.',
};

export default function SikcaSorulanSorularPage() {
  return <SikcaSorulanSorularContainer />;
}
