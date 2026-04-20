'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { fetchCouponByCode } from '@/services/couponService';
import { useNotificationStore } from '@/stores/notificationStore';
import { getImageUrl } from '@/utils/imageUtils';

const CartContainer = () => {
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const { cart, removeCart, setQuantity, setCoupon, coupon, updateCart } =
    useCartStore();

  const [couponCode, setCouponCode] = useState('');

  const productsTotal = useMemo(() => {
    const value = cart.reduce(
      (total, item: any) => (total += item.discountPrice * item.quantity),
      0
    );

    return value;
  }, [cart]);

  const total = useMemo(() => {
    let value = productsTotal;

    if (coupon) {
      value =
        coupon.type == 'CONSTANT'
          ? value - coupon.value
          : value - value * coupon.value;
    }

    return value + 49.99;
  }, [productsTotal, coupon]);

  const discount = useMemo(() => {
    return cart.reduce(
      (total, item: any) =>
        (total +=
          item.price * item.quantity - item.discountPrice * item.quantity),
      0
    );
  }, [total, cart]);

  const getQuery = (product: any) => {
    let query = '';
    if (product.variantValues.length > 0) {
      query = '?';
      product.variantValues.forEach((variantValue: any) => {
        query += `${variantValue?.variant?.title}=${variantValue?.title}&`;
      });
      query = query.slice(0, -1);
    }
    return query;
  };

  const handleApplyCode = async () => {
    if (!couponCode || couponCode.length < 5) return;

    const [error, data] = await fetchCouponByCode(couponCode);

    if (error) {
      setCouponCode('');
      setCoupon(undefined);

      return addNotification({
        title: 'Hata',
        text: error.message,
        type: 'error',
      });
    }

    setCoupon(data);
    setCouponCode('');
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
          Sepetim
          <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6">
        <div className="w-full lg:flex-1 flex flex-col gap-2">
          {cart.length === 0 && (
            <div className="min-h-[150px]">
              <p className="italic text-slate-500">
                Sepetinizde ürün bulunmuyor...
              </p>
            </div>
          )}

          {cart.length > 0 && (
            <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
              Ürünler
            </h3>
          )}

          {cart.map((product: any, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-primary-100/15 p-2 sm:pr-4 rounded-md"
            >
              <Link
                href={`/${product.categories[0].slug}/${product.slug}${getQuery(
                  product
                )}`}
                className="mx-auto sm:mx-0"
              >
                <img
                  src={getImageUrl(product.thumbnail)}
                  alt={product.title || ''}
                  title={product.title || ''}
                  className="rounded-md min-w-[60px] min-h-[60px] sm:min-w-[70px] sm:min-h-[70px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Link>

              <div className="flex flex-col gap-1 sm:gap-2 w-full sm:w-auto text-center sm:text-left">
                <Link
                  href={`/${product.categories[0].slug}/${
                    product.slug
                  }${getQuery(product)}`}
                  className="hover:text-primary-500"
                >
                  <strong className="font-medium text-base">
                    {product.title}
                  </strong>
                  <div className="w-full flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 text-xs text-slate-500 italic">
                    {product.variantValues.map(
                      (variantValue: any, index: number) => (
                        <span key={index}>
                          {variantValue.variant.title}: {variantValue.title}
                        </span>
                      )
                    )}
                  </div>
                </Link>
              </div>

              <div className="flex flex-row sm:flex-row items-center gap-2 mx-auto sm:ml-auto sm:mr-0 mt-2 sm:mt-0 max-w-[150px]">
                <Button
                  color={product.quantity > 1 ? 'primary' : 'red'}
                  size="small"
                  className="w-4 aspect-square"
                  onClick={() =>
                    product.quantity > 1
                      ? setQuantity(product, product.quantity - 1)
                      : removeCart(product)
                  }
                >
                  {product.quantity > 1 ? ' - ' : 'Sil'}
                </Button>
                <Input
                  size="small"
                  value={product.quantity}
                  readOnly
                  disabled
                  className="text-center flex-1 !min-h-[32px]"
                />
                <Button
                  color="primary"
                  size="small"
                  className="w-4 aspect-square"
                  onClick={() => setQuantity(product, product.quantity + 1)}
                >
                  +
                </Button>
              </div>

              <div className="flex flex-col items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0">
                <span className="font-semibold text-lg">
                  {product.discountPrice.toFixed(2)}TL
                </span>
                <span className="text-sm text-slate-500 line-through -mt-1">
                  {product.price.toFixed(2)}TL
                </span>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="w-full lg:w-[330px] lg:min-w-[330px] flex flex-col gap-4 sm:gap-6 lg:gap-8 mt-4 lg:mt-0">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-base sm:text-lg">
                Sipariş Özeti
              </h3>

              <div className="flex flex-col gap-2 bg-primary-100/20 p-3 sm:p-4 rounded-md border border-primary-50">
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-slate-500">
                    Ürünün Toplamı
                  </span>
                  <strong className="text-slate-600 text-xs sm:text-sm font-medium">
                    {productsTotal.toFixed(2)}
                    TL
                  </strong>
                </div>

                <div className="w-full flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-slate-500">
                    Kargo
                  </span>
                  <strong className="text-slate-600 text-xs sm:text-sm font-medium">
                    49.99TL
                  </strong>
                </div>

                {discount > 0 && (
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-slate-500">
                      Kazancınız
                    </span>
                    <strong className="text-green-500 text-xs sm:text-sm font-medium">
                      -{discount.toFixed(2)}
                      TL
                    </strong>
                  </div>
                )}

                {coupon && (
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-slate-500">
                      Kupon Kodu{' '}
                      <strong className="font-medium">({coupon.code})</strong>
                    </span>
                    <strong className="text-green-500 text-xs sm:text-sm font-medium">
                      -
                      {(coupon.type == 'PERCENT'
                        ? coupon.value * 100
                        : coupon.value
                      ).toFixed(2)}
                      {coupon.type == 'PERCENT' ? '%' : 'TL'}
                    </strong>
                  </div>
                )}

                <div className="w-full flex items-center justify-between gap-2 border-t border-primary-50 pt-2">
                  <span className="text-xs sm:text-sm text-slate-500">
                    TOPLAM
                  </span>
                  <strong className="text-slate-600 text-sm sm:text-base font-medium">
                    {total.toFixed(2)}
                    TL
                  </strong>
                </div>
              </div>
            </div>

            {!coupon && (
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-base sm:text-lg">
                  Kupon Kodu
                </h3>
                <div className="flex items-center gap-2 p-3 sm:p-4 rounded-md bg-primary-100/20 border border-primary-50">
                  <Input
                    placeholder="YENIYIL20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="text-sm"
                  />
                  <Button
                    color="primary"
                    onClick={handleApplyCode}
                    disabled={couponCode.length < 5}
                    className="whitespace-nowrap text-sm"
                  >
                    Kullan
                  </Button>
                </div>
              </div>
            )}

            <Button
              size="large"
              color="primary"
              onClick={() => router.push('/odeme')}
            >
              Siparişi Tamamla
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartContainer;
function useCart(): { cart: any } {
  throw new Error('Function not implemented.');
}
