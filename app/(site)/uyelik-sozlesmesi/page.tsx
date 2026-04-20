import React from 'react';
import UyelikSozlesmesiContainer from '@/containers/site/UyelikSozlesmesi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üyelik Sözleşmesi - E-Ticaret',
  description: 'Üyelik Sözleşmesi hakkında bilgi almak için bu sayfayı ziyaret edebilirsiniz.',
};

export default function UyelikSozlesmesiPage() {
  return <UyelikSozlesmesiContainer />;
}
