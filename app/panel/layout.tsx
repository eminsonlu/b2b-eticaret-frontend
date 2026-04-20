'use client';
import React, { ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Header from '@/components/panel/Header';
import Sidebar from '@/components/panel/Sidebar';

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();

  return (
    <>
      {user && (
        <main className="w-full min-h-full flex">
          <Sidebar />
          <div className="flex-1 bg-slate-50 box-border flex flex-col">
            <Header />
            <div className="flex-1 p-6 box-border flex flex-col gap-4 pb-64">
              {children}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PanelLayout;
