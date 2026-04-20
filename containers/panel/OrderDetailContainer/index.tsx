'use client';
import Select from '@/components/shared/Select';
import OrderAttachments from '@/components/site/OrderAttachements';
import { PAYMENT_METHODS, PAYMENT_STATUSES, STATUSES } from '@/constants';
import { IOrder } from '@/types/IOrder';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { updatePanelOrderById } from '@/services/orderService';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuthStore } from '@/stores/authStore';
import OrderNotesModal from '@/components/panel/OrderNotesModal';
import Button from '@/components/shared/Button';

const OrderDetailContainer = ({ order }: { order: IOrder }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [fromSelect, setFromSelect] = useState(false);

  const handleChangeOrder = async (field: string, value: any) => {
    if (field === 'status' && value === 'SHIPPED') {
      setFromSelect(true);
      setShowNotesModal(true);
      return;
    }

    const [err, res] = await updatePanelOrderById(order.id, {
      [field]: value,
    });

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    router.refresh();
  };

  const handleNotesUpdate = () => {
    router.refresh();
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Sipariş Detayı</h1>
      </div>

      {order && (
        <div className="mx-auto w-full max-w-[1200px] flex flex-col gap-12 mt-8">
          <div className="w-full grid grid-cols-5 gap-2 box-border">
            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-4 box-border rounded-md bg-slate-200">
              <span className="text-sm text-slate-600">Sipariş Tarihi</span>
              <span className="font-semibold text-base">
                {DateTime.fromISO(order.createdAt).toFormat('yyyy-MM-dd hh:mm')}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-4 box-border rounded-md bg-slate-200">
              <span className="text-sm text-slate-600">Sipariş Özeti</span>
              <span className="font-semibold text-base">
                {order.items.length} Ürün
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-4 box-border rounded-md bg-slate-200">
              <span className="text-sm text-slate-600">Sipariş Durumu</span>
              {user?.role?.order?.includes('UPDATE') ? (
                <Select
                  options={Object.keys(STATUSES).reduce((arr: any[], key) => {
                    arr.push({
                      label: STATUSES[key],
                      value: key,
                    });

                    return arr;
                  }, [])}
                  value={order.status}
                  onSelect={(value) => handleChangeOrder('status', value)}
                />
              ) : (
                <span className="font-semibold text-sm sm:text-base">
                  {STATUSES[order.status]}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-3 sm:p-4 box-border rounded-md bg-slate-200">
              <span className="text-xs sm:text-sm text-slate-600">
                Ödeme Durumu
              </span>
              {order.paymentMethod === 'BANK_TRANSFER' &&
              user?.role?.order?.includes('UPDATE') ? (
                <Select
                  options={Object.keys(PAYMENT_STATUSES).reduce(
                    (arr: any[], key) => {
                      arr.push({
                        label: PAYMENT_STATUSES[key],
                        value: key,
                      });

                      return arr;
                    },
                    []
                  )}
                  value={order.paymentStatus}
                  onSelect={(value) =>
                    handleChangeOrder('paymentStatus', value)
                  }
                />
              ) : (
                <span className="font-semibold text-sm sm:text-base">
                  {PAYMENT_STATUSES[order.paymentStatus]}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 text-sm p-4 box-border rounded-md bg-slate-200">
              <span className="text-sm text-slate-600">Tutar</span>
              <span className="font-semibold text-base">
                {Number(order.total).toFixed(2)}TL
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold border-b border-slate-200 pr-8 mr-auto pb-2">
              Sipariş Detayları
            </h3>

            <div className="flex flex-col">
              <span className="text-slate-600">Ödeme Türü: </span>
              <strong className="font-semibold">
                {PAYMENT_METHODS[order.paymentMethod]}
              </strong>
            </div>

            {order.paymentMethod === 'BANK_TRANSFER' && (
              <div className="flex flex-col">
                <span className="text-slate-600">
                  Havale/EFT yapılacak banka hesabı:{' '}
                </span>
                <strong className="font-semibold">{order.bankAccount}</strong>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-slate-600">Kargo Adresi: </span>
              <strong className="font-semibold">{order.address}</strong>
            </div>

            <div className="flex flex-col">
              <span className="text-slate-600">Kargo Ücreti: </span>
              <strong className="font-semibold">
                {order.shippingCost.toFixed(2)}TL
              </strong>
            </div>

            {order.notes && (
              <div className="flex flex-col">
                <span className="text-slate-600">Kargo Notları: </span>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: order.notes }}
                />
              </div>
            )}

            {user?.role?.order?.includes('UPDATE') && (
                <div className="flex flex-col">
                  <Button
                    color="blue"
                    onClick={() => {
                      setFromSelect(false);
                      setShowNotesModal(true);
                    }}
                  >
                    Kargo Notlarını Düzenle
                  </Button>
                </div>
              )}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold border-b border-slate-200 pr-8 mr-auto pb-2">
              Ürünler
            </h3>

            {order.items.map((item: any) => (
              <OrderAttachments
                key={item.id}
                item={item}
                service={'panel'}
                disabled
              />
            ))}
          </div>
        </div>
      )}

      <OrderNotesModal
        show={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        onUpdate={handleNotesUpdate}
        orderId={order.id}
        initialNotes={order.notes || ''}
        fromSelect={fromSelect}
      />
    </>
  );
};

export default OrderDetailContainer;
