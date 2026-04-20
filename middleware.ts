import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Şüpheli referrer domain'leri (spam backlink kaynakları)
const SUSPICIOUS_REFERRERS = [
  'spam-site.com',
  'bad-backlink.com',
  // Buraya bilinen spam domain'leri ekleyebilirsiniz
];

// Şüpheli user-agent'lar (bot/spam)
const SUSPICIOUS_USER_AGENTS = [
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'dotbot',
  'blexbot',
  'spambot',
  'scraper',
  'crawler',
];

// Rate limiting için basit in-memory cache (production'da Redis kullanılmalı)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 dakika
const RATE_LIMIT_MAX_REQUESTS = 1000; // Dakikada maksimum istek sayısı

// Rate limiting kontrolü
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Referrer kontrolü
function isSuspiciousReferrer(referer: string | null): boolean {
  if (!referer) return false;
  
  const refererUrl = new URL(referer);
  const refererDomain = refererUrl.hostname.toLowerCase();
  
  // Şüpheli domain kontrolü
  for (const suspicious of SUSPICIOUS_REFERRERS) {
    if (refererDomain.includes(suspicious)) {
      return true;
    }
  }
  
  // Şüpheli pattern kontrolü (örnek: çok sayıda alt domain)
  const subdomainCount = refererDomain.split('.').length;
  if (subdomainCount > 4) {
    return true;
  }
  
  return false;
}

// User-agent kontrolü
function isSuspiciousUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  
  const ua = userAgent.toLowerCase();
  return SUSPICIOUS_USER_AGENTS.some(suspicious => ua.includes(suspicious));
}

// URL pattern kontrolü (spam injection pattern'leri)
function hasSuspiciousUrlPattern(url: string): boolean {
  const suspiciousPatterns = [
    /[?&]utm_source=spam/i,
    /[?&]ref=spam/i,
    /\/spam\//i,
    /backlink/i,
    /seo.*spam/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(url));
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const referer = request.headers.get('referer');
  const userAgent = request.headers.get('user-agent');

  // Static dosyalar ve API route'ları için güvenlik kontrollerini atla
  const isStaticOrApi = url.startsWith('/_next') || 
                        url.startsWith('/api') || 
                        url === '/favicon.ico' || 
                        url === '/robots.txt' || 
                        url === '/sitemap.xml';

  if (!isStaticOrApi) {
    // Rate limiting kontrolü
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    // Şüpheli referrer kontrolü (sadece browser istekleri için)
    if (referer && isSuspiciousReferrer(referer)) {
      console.warn(`Suspicious referrer blocked: ${referer} from IP: ${ip}`);
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Şüpheli user-agent kontrolü (sadece public sayfalar için)
    if (!url.startsWith('/panel') && isSuspiciousUserAgent(userAgent)) {
      console.warn(`Suspicious user-agent blocked: ${userAgent} from IP: ${ip}`);
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Şüpheli URL pattern kontrolü
    if (hasSuspiciousUrlPattern(request.url)) {
      console.warn(`Suspicious URL pattern detected: ${request.url} from IP: ${ip}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Panel route'ları için authentication kontrolü
  if (url.startsWith('/panel') || 
      url.startsWith('/siparisler') || 
      url.startsWith('/favoriler') || 
      url.startsWith('/odeme') || 
      url.startsWith('/sepet') || 
      url.startsWith('/profil')) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/giris-yap', request.url));
  }
    
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/giris-yap', request.url));
  }
  }

  // Güvenlik header'ları ekle
  const response = NextResponse.next();

  // Content Security Policy
  // Backend API domain'ini connect-src'ye ekle
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.tekyerde.com';
  const backendDomain = new URL(backendUrl).origin;

  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.paytr.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com https://cdn.tiny.cloud; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tiny.cloud; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com https://cdn.tiny.cloud; connect-src 'self' ${backendDomain} https://www.google-analytics.com https://www.googletagmanager.com https://www.paytr.com https://www.google.com https://www.merchant-center-analytics.goog https://sessions.bugsnag.com https://cdn.tiny.cloud; frame-src 'self' https:;`
  );

  // X-Frame-Options (clickjacking koruması) - PayTR ödeme sayfasında bu header'ı ayarla
  if (!url.includes('/odeme')) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  }
  
  // X-Content-Type-Options (MIME type sniffing koruması)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy (referrer bilgisini kontrol et)
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
