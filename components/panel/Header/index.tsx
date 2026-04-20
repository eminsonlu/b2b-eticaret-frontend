import Breadcrumb from '@/components/shared/Breadcrumb';
import React from 'react';
import UserSection from '../UserSection';

const PanelHeader = () => {
  return (
    <div className="w-full h-[60px] min-h-[60px] flex items-center gap-6 px-6 box-border bg-slate-100 border-b border-slate-200">
      <Breadcrumb />
      <UserSection className="ml-auto" />
    </div>
  );
};

export default PanelHeader;
