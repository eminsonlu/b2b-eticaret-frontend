import React from 'react';
import GizlilikGuvenlikContainer from '@/containers/site/GizlilikGuvenlikContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik ve Güvenlik - E-Ticaret',
  description: 'Gizlilik ve Güvenlik hakkında bilgi almak için bu sayfayı ziyaret edebilirsiniz.',
};

export default function GizlilikGüvenlikPage() {
  return <GizlilikGuvenlikContainer />;
}
