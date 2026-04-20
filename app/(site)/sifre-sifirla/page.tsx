import { ResetPasswordContainer } from '@/containers/site/ResetPasswordContainer';
import React, { Suspense } from 'react';

interface ICtx {
  searchParams: Promise<{
    token?: string;
  }>;
}

export const revalidate = 0;

export const generateMetadata = async (ctx: ICtx) => {
  const { token } = await ctx.searchParams;

  return {
    title: token ? 'Şifre Sıfırla' : 'Geçersiz Bağlantı',
    description: 'Yeni şifrenizi belirleyin',
  };
};

const ResetPasswordPage = async (ctx: ICtx) => {
  const { token } = await ctx.searchParams;

  return (
    <Suspense>
      <ResetPasswordContainer token={token} />
    </Suspense>
  );
};

export default ResetPasswordPage;