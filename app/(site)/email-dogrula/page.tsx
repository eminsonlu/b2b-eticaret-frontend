import { EmailVerificationContainer } from '@/containers/site/EmailVerificationContainer';
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
    title: token ? 'E-posta Doğrulama' : 'Geçersiz Doğrulama Bağlantısı',
    description: 'E-posta adresinizi doğrulayın',
  };
};

const EmailVerificationPage = async (ctx: ICtx) => {
  const { token } = await ctx.searchParams;

  return (
    <Suspense>
      <EmailVerificationContainer token={token} />
    </Suspense>
  );
};

export default EmailVerificationPage;