import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.tekyerde.com",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/images/**",
      },
    ],
  },
  // Güvenlik: XSS koruması için poweredByHeader'ı kaldır
  poweredByHeader: false,

  // Güvenlik: Strict mode
  reactStrictMode: true,

  // Güvenlik: Compiler optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Güvenlik: Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.paytr.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com https://cdn.tiny.cloud",
              "img-src 'self' data: https: blob: http://localhost:*",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
