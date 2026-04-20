import React from 'react';
import MesafeliSatisSozlesmeContainer from '@/containers/site/MesafeliSatisSozlesmeContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi - E-Ticaret',
  description: 'Mesafeli Satış Sözleşmesi hakkında bilgi almak için bu sayfayı ziyaret edebilirsiniz.',
};

export default function MesafeliSatisSozlesmePage() {
  return <MesafeliSatisSozlesmeContainer />;
}
