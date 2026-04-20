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
  baseUrl?: string
): string => {
  if (!imagePath) {
    return '/placeholder.jpg';
  }

  // Eğer zaten tam URL ise (http:// veya https:// ile başlıyorsa), kontrol et
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // CDN URL formatını düzelt: cdn.tekyerde.com/cdn → cdn.tekyerde.com/tekyerde/cdn
    // Örnek: https://cdn.tekyerde.com/cdn/da8137710834a2eb5b000da1cf1eb46c5ad6fba5.jpg
    // Sonuç: https://cdn.tekyerde.com/tekyerde/cdn/da8137710834a2eb5b000da1cf1eb46c5ad6fba5.jpg
    if (imagePath.includes('cdn.tekyerde.com/cdn/') && !imagePath.includes('cdn.tekyerde.com/tekyerde/cdn/')) {
      return imagePath.replace('cdn.tekyerde.com/cdn/', 'cdn.tekyerde.com/tekyerde/cdn/');
    }
    // Zaten doğru formattaysa veya başka bir URL ise, direkt kullan
    return imagePath;
  }

  // Base URL'i belirle (her zaman api.tekyerde.com kullan)
  // Sadece dosya adı geldiğinde api.tekyerde.com/images/ ile birleştir
  const base = baseUrl || 'https://api.tekyerde.com';
  
  // Base URL'in sonunda / var mı kontrol et
  const baseWithSlash = base.endsWith('/') ? base.slice(0, -1) : base;
  
  // Image path'in başında / var mı kontrol et
  // Örnek: "c1a9a33dfe144a0b5b3889df0f82c69e472fb500.jpg" → "/c1a9a33dfe144a0b5b3889df0f82c69e472fb500.jpg"
  const pathWithSlash = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // api.tekyerde.com için: /images/ prefix'i ekle
  // Sonuç: https://api.tekyerde.com/images/c1a9a33dfe144a0b5b3889df0f82c69e472fb500.jpg
  return `${baseWithSlash}/images${pathWithSlash}`;
};
