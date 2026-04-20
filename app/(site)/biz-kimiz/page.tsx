import React from 'react';
import BizKimizContainer from '@/containers/site/BizKimizContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biz Kimiz - E-Ticaret',
  description: 'Tekyerde, Türkiye\'deki en büyük online alışveriş sitesi. Tekyerde, Türkiye\'deki en büyük online alışveriş sitesi.',
};

export default function HelpPage() {
  return <BizKimizContainer />;
} 