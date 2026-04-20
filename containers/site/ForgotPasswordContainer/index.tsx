'use client';
import { forgotPassword } from '@/services/authService';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import * as Yup from 'yup';

export const ForgotPasswordContainer = () => {
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Bu alan zorunludur.')
        .email('Lütfen geçerli bir e-posta adresi giriniz.'),
    }),
    onSubmit: async (values) => {
      const { email } = values;

      setLoading(true);
      const [err, data] = await forgotPassword(email);
      setLoading(false);

      if (err) {
        if (err.message === 'TOO_MANY_REQUESTS') {
          return addNotification({
            title: 'Çok Fazla İstek',
            text: 'Lütfen 5 dakika bekleyip tekrar deneyiniz.',
            type: 'error',
          });
        }
        return addNotification({
          title: 'Hata',
          text: err.message || 'Bir hata oluştu.',
          type: 'error',
        });
      }

      setEmailSent(true);
      addNotification({
        title: 'E-posta Gönderildi',
        text: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.',
        type: 'success',
      });
    },
  });

  const { handleSubmit, getFieldProps, errors, touched } = formik;

  if (emailSent) {
    return (
      <>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
          <h2 className="text-5xl font-bold relative text-center mt-4">
            E-posta Gönderildi
            <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
        </div>

        <div className="container">
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto mt-12 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Şifre Sıfırlama Bağlantısı Gönderildi
              </h3>
              <p className="text-green-700 mb-4">
                E-posta adresinize şifre sıfırlama bağlantısı gönderildi.
                Lütfen e-posta kutunuzu kontrol ediniz.
              </p>
              <p className="text-sm text-green-600">
                Bağlantı 15 dakika içerisinde geçerliliğini yitirecektir.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Link
                href="/giris-yap"
                className="text-sm text-primary-500 hover:underline"
              >
                Giriş sayfasına dön
              </Link>
              <button
                onClick={() => setEmailSent(false)}
                className="text-sm text-gray-600 hover:text-primary-500 hover:underline"
              >
                Tekrar gönder
              </button>
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
          Şifremi Unuttum
          <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="container">
        <div className="max-w-[500px] mx-auto mt-12">
          <div className="bg-orange-50 border border-primary-200 rounded-lg p-4 mb-6">
            <p className="text-black text-sm">
              E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              size="large"
              type="email"
              label="E-posta"
              placeholder="E-posta adresinizi giriniz"
              className="p-2 border border-gray-300 rounded"
              {...getFieldProps('email')}
              error={touched.email && errors.email}
            />

            <Button
              color="primary"
              type="submit"
              loading={loading}
              className="w-full mt-2"
              size="large"
            >
              Şifre Sıfırlama Bağlantısı Gönder
            </Button>

            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/giris-yap"
                className="text-sm text-primary-500 hover:underline text-center"
              >
                Giriş sayfasına dön
              </Link>
              <Link
                href="/kayit-ol"
                className="text-sm text-gray-600 hover:text-primary-500 hover:underline text-center"
              >
                Henüz hesabın yok mu? Hemen kayıt ol!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};