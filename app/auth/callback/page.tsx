'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishListStore } from '@/stores/wishListStore';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { addNotification } = useNotificationStore();
  const { setUser } = useAuthStore();
  const { updateCart } = useCartStore();
  const { updateWishList } = useWishListStore();

  useEffect(() => {
    // useSearchParams yerine window.location.search ile token al
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

    if (!token) {
      addNotification({
        title: 'Hata',
        text: 'Geçersiz veya eksik oturum bilgisi.',
        type: 'error',
      });
      router.replace('/giris-yap');
      return;
    }

    // Token'ı cookie ve localStorage'a yaz (= karakteri cookie'de sorun çıkardığı için encode)
    const safeToken = encodeURIComponent(token);
    document.cookie = `token=${safeToken}; path=/; max-age=14400`; // 4 saat
    if (typeof window !== 'undefined') window.localStorage.setItem('token', token);

    // Kullanıcı bilgisini çek ve global state'i güncelle
    (async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const res = await fetch(`${backendUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorBody = await res.json().catch(() => null);
          console.error('Social login /me error:', errorBody || res.statusText);
          addNotification({
            title: 'Hata',
            text:
              errorBody?.message === 'Unauthorized'
                ? 'Oturum doğrulanamadı. Lütfen tekrar giriş yapın.'
                : errorBody?.message ||
                  'Giriş işlemi tamamlanamadı. Lütfen tekrar deneyin.',
            type: 'error',
          });
          router.replace('/giris-yap');
          return;
        }

        const userData = await res.json();

        setUser(userData);
        updateCart();
        updateWishList();

        router.replace('/');
      } catch (err) {
        console.error('Social login /me fetch failed:', err);
        addNotification({
          title: 'Hata',
          text: 'Giriş işlemi tamamlanamadı. Lütfen tekrar deneyin.',
          type: 'error',
        });
        router.replace('/giris-yap');
      }
    })();
  }, [router, addNotification, setUser, updateCart, updateWishList]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Hesabınıza yönlendiriliyorsunuz...</p>
    </div>
  );
};

export default AuthCallbackPage;

