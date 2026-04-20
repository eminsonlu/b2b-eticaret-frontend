import Footer from '@/components/site/Footer';
import Header from '@/components/site/Header';
import CookieConsent from '@/components/site/CookieConsent';
import { fetchCategories } from '@/services/categoryService';
import React, { ReactNode, Suspense } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const [categoriesErr, categories] = await fetchCategories();
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <>
      <Suspense>
        <Header categories={!categoriesErr ? safeCategories : []} />
      </Suspense>
      {children}
      <Footer categories={!categoriesErr ? safeCategories : []} />
      <CookieConsent />
    </>
  );
};

export default Layout;
