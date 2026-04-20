'use client';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import React, { useEffect } from 'react';

interface Props {
  steps: { title: string; path: string }[];
}

const BreadcrumbStoreProvider = ({ steps = [] }: Props) => {
  const { setSteps } = useBreadcrumbStore();

  useEffect(() => {
    setSteps(steps);
  }, [setSteps, steps]);

  return <></>;
};

export default BreadcrumbStoreProvider;
