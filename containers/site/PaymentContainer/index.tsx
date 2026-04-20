'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Button from '@/components/shared/Button';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/services/orderService';
import { useNotificationStore } from '@/stores/notificationStore';
import SelectPaymentAddress from '@/components/site/SelectPaymentAddress';
import SelectPaymentMethod from '@/components/site/SelectPaymentMethod';
import Checkbox from '@/components/shared/Checkbox';
import Link from 'next/link';
import OnBilgilendirmeKosullariModal from '@/components/site/OnBilgilendirmeKosullariModal';

const PaymentContainer = () => {
  const { addNotification } = useNotificationStore();
  const { cart, coupon, paymentMethod, bankAccountId, addressId, resetCart } =
    useCartStore();
  const router = useRouter();
  const [showModals, setShowModals] = useState<string[]>([]);
  const [confirm, setConfirm] = useState(false);

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

  const handleCreateOrder = async () => {
    if (!confirm) return;

    if (!addressId) {
      addNotification({
        title: 'Hata',
        text: 'Adres seçilmedi',
        type: 'error',
      });
      return;
    }

    const [err, result] = await createOrder({
      coupon: coupon?.code,
      paymentMethod,
      bankAccountId,
      addressId,
    });

    if (err) {
      addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
      return router.push(`/siparisler?success=false`);
    }

    router.push(`/siparisler?success=true&orderId=${result?.order?.id}`);

    setTimeout(() => {
      resetCart();
    }, 200);
  };

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/sepet');
    }
  }, []);

  return (
    cart.length > 0 && (
      <>
            <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative text-center mt-2 sm:mt-4">
                Ödemeyi Tamamla
                <div className="w-[30px] sm:w-[40px] md:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
              </h2>
            </div>

            <div className="w-full max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6">
              <div className="w-full lg:flex-1 flex flex-col gap-8 md:gap-12 lg:gap-16">
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                    Ödeme Tercihleri
                  </h3>
                  <SelectPaymentMethod />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                    Adres Seçimi
                  </h3>
                  <SelectPaymentAddress />
                </div>
              </div>

              <div className="w-full lg:w-[330px] lg:min-w-[330px] flex flex-col gap-4 sm:gap-6 lg:gap-8 order-first lg:order-last mb-4 lg:mb-0">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-base sm:text-lg">
                    Sipariş Özeti
                  </h3>

                  <div className="flex flex-col gap-2 bg-primary-100/30 p-3 sm:p-4 rounded-md border border-primary-200">
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

                    <div className="w-full flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-slate-500">
                        Kazancınız
                      </span>
                      <strong className="text-green-500 text-xs sm:text-sm font-medium">
                        -
                        {cart
                          .reduce(
                            (total, item: any) =>
                              (total +=
                                item.price * item.quantity -
                                item.discountPrice * item.quantity),
                            0
                          )
                          .toFixed(2)}
                        TL
                      </strong>
                    </div>

                    {coupon && (
                      <div className="w-full flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm text-slate-500">
                          Kupon Kodu{' '}
                          <strong className="font-medium">
                            ({coupon.code})
                          </strong>
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

                    <div className="w-full flex items-center justify-between gap-2 border-t border-primary-200 pt-2">
                      <span className="text-xs sm:text-sm text-slate-500">
                        TOPLAM
                      </span>
                      <strong className="text-slate-600 text-sm sm:text-base font-semibold">
                        {total.toFixed(2)}
                        TL
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 text-sm">
                  <Checkbox value={confirm} onChange={setConfirm} />
                  <p>
                    <button
                      className="text-primary underline font-medium"
                      onClick={() =>
                        setShowModals((pre) => [
                          ...pre,
                          'onBilgilendirmeKosullari',
                        ])
                      }
                    >
                      Ön Bilgilendirme Koşulları
                    </button>
                    'nı ve{' '}
                    <Link
                      className="text-primary underline font-medium"
                      target="_blank"
                      href={'/mesafeli-satis-sozlesmesi'}
                    >
                      Mesafeli Satış Sözleşmesi
                    </Link>
                    'ni okudum, onaylıyorum.
                  </p>
                </div>

                <Button
                  size="large"
                  color="primary"
                  onClick={handleCreateOrder}
                  className="text-base font-medium py-3"
                  disabled={
                    !confirm ||
                    !paymentMethod ||
                    !addressId ||
                    (paymentMethod === 'BANK_TRANSFER' && !bankAccountId)
                  }
                >
                  Ödemeyi Tamamla
                </Button>
              </div>
            </div>
        {showModals.map((modal) => (
          <OnBilgilendirmeKosullariModal
            key={modal}
            show={modal === 'onBilgilendirmeKosullari'}
            onClose={() =>
              setShowModals((pre) => pre.filter((m) => m !== modal))
            }
            paymentMethod={paymentMethod}
            addressId={addressId || ''}
            cart={cart}
          />
        ))}
      </>
    )
  );
};

export default PaymentContainer;
