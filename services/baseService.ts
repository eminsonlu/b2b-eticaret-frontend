import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 120000, // 120 seconds timeout for slow queries
});

axios.interceptors.request.use(
  async (config) => {
    let token: string | undefined;

    // server — cookie encode edilmiş olabilir
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const raw = cookieStore.get('token')?.value;
      if (raw) {
        try {
          token = decodeURIComponent(raw);
        } catch {
          token = raw;
        }
      } else {
        token = undefined;
      }
    } else {
      // client — find exact "token" cookie, then fall back to localStorage
      const tokenCookie = document.cookie.split('; ').find(c => c.startsWith('token='));
      if (tokenCookie) {
        try {
          token = decodeURIComponent(tokenCookie.slice(6));
        } catch {
          token = undefined;
        }
      }
      if (!token) token = window.localStorage.getItem('token') ?? undefined;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
