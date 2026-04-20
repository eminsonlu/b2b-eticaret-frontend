import React from 'react';
import KvkkContainer from '@/containers/site/KvkkContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK - E-Ticaret',
  description: 'KVKK hakkında bilgi almak için bu sayfayı ziyaret edebilirsiniz.',
};

export default function KvkkPage() {
  return <KvkkContainer />;
}
