'use client';
import React, { useEffect, useState } from 'react';
import { updatePanelOrderById } from '@/services/orderService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';
import RichTextEditor from '@/components/shared/RichTextEditor';

interface Props {
  show: boolean;
  onClose: () => void;
  onUpdate: () => void;
  orderId: string;
  initialNotes: string;
  fromSelect: boolean;
}

const OrderNotesModal = ({
  show,
  onClose,
  onUpdate,
  orderId,
  initialNotes,
  fromSelect,
}: Props) => {
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let obj: any = {
      notes: notes,
    };

    if (fromSelect) {
      obj = {
        ...obj,
        status: 'SHIPPED',
      }
    }

    const [err, res] = await updatePanelOrderById(orderId, obj);

    setLoading(false);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    addNotification({
      title: 'Başarılı',
      text: 'Kargo notları başarıyla güncellendi',
      type: 'success',
    });

    onUpdate();
    onClose();
  };

  useEffect(() => {
    if (show) {
      setNotes(initialNotes);
    }
  }, [show, initialNotes]);

  return (
    <Modal title="Kargo Notları" size="large" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Kargo Notları
          </label>
          <RichTextEditor
            initialContent={notes}
            onChange={(content) => setNotes(content)}
            height={300}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" color="red" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit" loading={loading}>
            Kaydet
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderNotesModal;
