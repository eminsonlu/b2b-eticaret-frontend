'use client';
import React, { useState } from 'react';
import { copyPanelProduct } from '@/services/productService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';

interface CopyProductModalProps {
  show: boolean;
  onClose: () => void;
  productId: string | null;
}

const CopyProductModal: React.FC<CopyProductModalProps> = ({
  show,
  onClose,
  productId,
}) => {
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [newTitle, setNewTitle] = useState('');

  const handleCopy = async () => {
    setLoading(true);
    if (!productId) {
      setLoading(false);
      onClose();
      return addNotification({
        title: 'Hata',
        text: "Ürün ID'si bulunamadı.",
        type: 'error',
      });
    }

    const [err, data] = await copyPanelProduct(productId, newTitle);
    if (err) {
      setLoading(false);
      onClose();
      return addNotification({
        title: 'Hata',
        text: err.message || 'Ürün kopyalanırken bir hata oluştu.',
        type: 'error',
      });
    }

    addNotification({
      title: 'Başarılı',
      text: 'Ürün başarıyla kopyalandı.',
      type: 'success',
    });
    setLoading(false);

    router.push(`/panel/products/${data.id}`);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <Input
            label="Yeni Başlık"
            placeholder="Ürün Başlığı"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            required
          />

          <Button
            color="primary"
            className="mt-4"
            loading={loading}
            disabled={loading}
            onClick={handleCopy}
          >
            Kopyala
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CopyProductModal;
