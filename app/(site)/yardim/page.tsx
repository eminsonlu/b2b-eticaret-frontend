import React from 'react';
import HelpContainer from '@/containers/site/HelpContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yardım - E-Ticaret',
  description: 'E-Ticaret sitemizden alışveriş yapma sürecinde ihtiyacınız olabilecek tüm bilgiler.',
};

export default function HelpPage() {
  return <HelpContainer />;
} 