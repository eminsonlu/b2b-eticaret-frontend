'use client';
import { verifyEmail, resendEmailVerification } from '@/services/authService';
import React, { useState, useEffect } from 'react';
import { useNotificationStore } from '@/stores/notificationStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

interface EmailVerificationContainerProps {
  token?: string;
}

export const EmailVerificationContainer = ({ token }: EmailVerificationContainerProps) => {
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setError('Geçersiz doğrulama bağlantısı');
      return;
    }
    handleVerification(token);
  }, [token]);

  const handleVerification = async (verificationToken: string) => {
    setLoading(true);
    const [err, data] = await verifyEmail(verificationToken);
    setLoading(false);

    if (err) {
      if (err.message === 'INVALID_OR_EXPIRED_TOKEN') {
        setError('Doğrulama bağlantısı geçersiz veya süresi dolmuş');
      } else if (err.message === 'EMAIL_ALREADY_VERIFIED') {
        setError('E-posta adresi zaten doğrulanmış');
      } else {
        setError('Doğrulama sırasında bir hata oluştu');
      }
      return;
    }

    setEmailVerified(true);
    addNotification({
      title: 'Başarılı',
      text: 'E-posta adresiniz başarıyla doğrulandı.',
      type: 'success',
    });
  };

  if (loading) {
    return (
      <>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
          <h2 className="text-5xl font-bold relative text-center mt-4">
            E-posta Doğrulanıyor
            <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
        </div>

        <div className="container">
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-12 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                E-posta Adresiniz Doğrulanıyor
              </h3>
              <p className="text-blue-700">
                Lütfen bekleyiniz...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (emailVerified) {
    return (
      <>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
          <h2 className="text-5xl font-bold relative text-center mt-4">
            E-posta Doğrulandı
            <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
        </div>

        <div className="container">
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-12 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                E-posta Adresiniz Başarıyla Doğrulandı
              </h3>
              <p className="text-green-700 mb-4">
                Tebrikler! Hesabınız artık aktif ve tüm özelliklerimizi kullanabilirsiniz.
              </p>
            </div>

            {user ? (
              <Link
                href="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-500 transition-colors mt-4"
              >
                Anasayfaya Dön
              </Link>
            ) : (
              <Link
                href="/giris-yap"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-500 transition-colors mt-4"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
          <h2 className="text-5xl font-bold relative text-center mt-4">
            Doğrulama Hatası
            <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
        </div>

        <div className="container">
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-12 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="text-red-600 text-4xl mb-4">✗</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                E-posta Doğrulama Hatası
              </h3>
              <p className="text-red-700 mb-4">
                {error}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Link
                href="/email-dogrulama-gonder"
                className="text-sm text-primary-500 hover:underline"
              >
                Yeni doğrulama e-postası gönder
              </Link>
              <Link
                href="/giris-yap"
                className="text-sm text-gray-600 hover:text-primary-500 hover:underline"
              >
                Giriş sayfasına dön
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};