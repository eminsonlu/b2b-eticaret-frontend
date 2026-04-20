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
      // client — cookie encode edildiği için decode et; yoksa localStorage'dan al
      const match = document.cookie.match(/token=([^;]+)/);
      if (match) {
        try {
          token = decodeURIComponent(match[1].trim());
        } catch {
          token = undefined;
        }
      }
      if (!token) token = typeof window !== 'undefined' ? window.localStorage.getItem('token') ?? undefined : undefined;
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
