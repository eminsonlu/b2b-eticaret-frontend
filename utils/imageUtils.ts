/**
 * Image URL'ini normalize eder (ürünler için).
 * Eğer image zaten tam URL ise (http:// veya https:// ile başlıyorsa), direkt kullanır.
 * Eğer sadece dosya adı ise (örn: "328d4a9de74388889af16f2e6dc56ddb443c1f85.webp"), 
 * api.tekyerde.com/images/ ile birleştirir.
 * 
 * @param imagePath - Image path, dosya adı veya tam URL
 * @param baseUrl - Base URL (default: https://api.tekyerde.com/images)
 * @returns Normalize edilmiş image URL'i
 */
export const getImageUrl = (
  imagePath: string | null | undefined,
): string => {
  if (!imagePath) {
    return '/placeholder.jpg';
  }
  const base = process.env.NEXT_PUBLIC_CDN_URL || "http://localhost:3000";
  const baseWithSlash = base.endsWith('/') ? base.slice(0, -1) : base;
  const pathWithSlash = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseWithSlash}/images${pathWithSlash}`;
};
