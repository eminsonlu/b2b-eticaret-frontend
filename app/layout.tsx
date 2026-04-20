import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Notifications from '@/components/shared/Notifications';
import '../assets/globals.css';
import { fetchMe } from '@/services/authService';
import AuthProvider from '@/components/shared/AuthProvider';
import Script from 'next/script';
import { ErrorBoundary } from '../utils/bugsnag';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || '',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [meErr, me] = await fetchMe();

  return (
    <html lang="tr">
      <ErrorBoundary>
        <body>{children}</body>
        <Notifications />
        <AuthProvider user={meErr ? undefined : me} />

        <Script src="https://www.paytr.com/js/iframeResizer.min.js"></Script>
        {process.env.NODE_ENV === 'production' && (
          <>
            <GoogleTagManager gtmId="GTM-NFK3WLR2" />
            <GoogleAnalytics gaId="G-4S9059R701" />
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=AW-17836429263"
              strategy="afterInteractive"
            />
            <Script id="google-ads-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17836429263');
              `}
            </Script>
          </>
        )}
      </ErrorBoundary>
    </html>
  );
}
