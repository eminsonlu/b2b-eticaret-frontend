'use client';
import { resetPassword } from '@/services/authService';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface ResetPasswordContainerProps {
  token?: string;
}

export const ResetPasswordContainer = ({ token }: ResetPasswordContainerProps) => {
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/giris-yap');
      return;
    }
  }, [token, router]);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required('Bu alan zorunludur.')
        .min(8, 'Şifreniz en az 8 karakter olmalıdır.'),
      confirmPassword: Yup.string()
        .required('Bu alan zorunludur.')
        .oneOf([Yup.ref('newPassword')], 'Şifreler eşleşmiyor.'),
    }),
    onSubmit: async (values) => {
      if (!token) {
        return addNotification({
          title: 'Hata',
          text: 'Geçersiz şifre sıfırlama bağlantısı.',
          type: 'error',
        });
      }

      const { newPassword } = values;

      setLoading(true);
      const [err, data] = await resetPassword(token, newPassword);
      setLoading(false);

      if (err) {
        if (err.message === 'INVALID_OR_EXPIRED_TOKEN') {
          return addNotification({
            title: 'Geçersiz Bağlantı',
            text: 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.',
            type: 'error',
          });
        }
        return addNotification({
          title: 'Hata',
          text: err.message || 'Bir hata oluştu.',
          type: 'error',
        });
      }

      setPasswordReset(true);
      addNotification({
        title: 'Başarılı',
        text: 'Şifreniz başarıyla değiştirildi.',
        type: 'success',
      });
    },
  });

  const { handleSubmit, getFieldProps, errors, touched } = formik;

  if (passwordReset) {
    return (
      <>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
          <h2 className="text-5xl font-bold relative text-center mt-4">
            Şifre Değiştirildi
            <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
        </div>

        <div className="container">
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-12 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Şifreniz Başarıyla Değiştirildi
              </h3>
              <p className="text-green-700 mb-4">
                Artık yeni şifrenizle giriş yapabilirsiniz.
              </p>
            </div>

            <Link
              href="/giris-yap"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-500 transition-colors mt-4"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
          <h2 className="text-5xl font-bold relative text-center mt-4">
            Geçersiz Bağlantı
            <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
        </div>

        <div className="container">
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-12 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="text-red-600 text-4xl mb-4">✗</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Geçersiz Şifre Sıfırlama Bağlantısı
              </h3>
              <p className="text-red-700 mb-4">
                Bu bağlantı geçersiz veya süresi dolmuş olabilir.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Link
                href="/sifremi-unuttum"
                className="text-sm text-primary-500 hover:underline"
              >
                Yeni şifre sıfırlama bağlantısı iste
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

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
        <h2 className="text-5xl font-bold relative text-center mt-4">
          Şifre Sıfırla
          <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="container">
        <div className="max-w-[500px] mx-auto mt-12">
          <div className="bg-orange-50 border border-primary-200 rounded-lg p-4 mb-6">
            <p className="text-black text-sm">
              Lütfen yeni şifrenizi belirleyin. Şifreniz en az 8 karakter olmalıdır.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              size="large"
              type="password"
              label="Yeni Şifre"
              placeholder="Yeni şifrenizi giriniz"
              className="p-2 border border-gray-300 rounded"
              {...getFieldProps('newPassword')}
              error={touched.newPassword && errors.newPassword}
            />

            <Input
              size="large"
              type="password"
              label="Yeni Şifre Tekrar"
              placeholder="Yeni şifrenizi tekrar giriniz"
              className="p-2 border border-gray-300 rounded"
              {...getFieldProps('confirmPassword')}
              error={touched.confirmPassword && errors.confirmPassword}
            />

            <Button
              color="primary"
              type="submit"
              loading={loading}
              className="w-full mt-2"
              size="large"
            >
              Şifremi Değiştir
            </Button>

            <Link
              href="/giris-yap"
              className="text-sm text-gray-600 hover:text-primary-500 hover:underline text-center mt-4"
            >
              Giriş sayfasına dön
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};