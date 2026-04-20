export const PAYMENT_METHODS: { [key: string]: string } = {
  CREDIT_CARD: 'Kredi Kartı',
  BANK_TRANSFER: 'Havale/EFT',
};

export const STATUSES: { [key: string]: string } = {
  AWAITING_USER_ACTION: 'Kullanıcı Bekleniyor',
  GETTING_READY: 'Hazırlanıyor',
  SHIPPED: 'Kargoda',
  DELIVERED: 'Teslim Edildi',
  CANCELED: 'İptal Edildi',
};

export const PAYMENT_STATUSES: { [key: string]: string } = {
  PENDING: 'Beklemede',
  PAID: 'Ödendi',
  CANCELED: 'İptal Edildi',
  FAILED: 'Başarısız',
};

export const VARIANT_TYPES: { [key: string]: string } = {
  SELECT: 'Seçim',
  BUTTON: 'Düğme',
  COLOR: 'Renk',
};
