"use client";
import React, { useState } from "react";
import { exportPanelProducts, exportPanelProductsToGoogleMerchant } from "@/services/productService";
import { useNotificationStore } from "@/stores/notificationStore";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";

interface ExportProductsModalProps {
  show: boolean;
  onClose: () => void;
  onExport?: () => void;
}

const AVAILABLE_FIELDS = [
  { key: "id", label: "ID" },
  { key: "title", label: "Başlık" },
  { key: "description", label: "Açıklama" },
  { key: "price", label: "Fiyat" },
  { key: "discountPrice", label: "İndirimli Fiyat" },
  { key: "stock", label: "Stok" },
  { key: "sku", label: "SKU" },
  { key: "type", label: "Tip" },
  { key: "status", label: "Durum" },
  { key: "categories", label: "Kategoriler" },
  { key: "tags", label: "Etiketler" },
  { key: "createdAt", label: "Oluşturma Tarihi" },
  { key: "updatedAt", label: "Güncellenme Tarihi" },
];

const ExportProductsModal: React.FC<ExportProductsModalProps> = ({
  show,
  onClose,
  onExport,
}) => {
  const { addNotification } = useNotificationStore();
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "id",
    "title",
    "price",
    "stock",
    "type",
    "status",
  ]);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldKey)
        ? prev.filter((f) => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const handleSelectAll = () => {
    setSelectedFields(AVAILABLE_FIELDS.map((f) => f.key));
  };

  const handleDeselectAll = () => {
    setSelectedFields([]);
  };

  const handleExport = async () => {
    if (selectedFields.length === 0) {
      return addNotification({
        title: "Uyarı",
        text: "Lütfen en az bir alan seçin.",
        type: "warning",
      });
    }

    setLoading(true);
    const [err, data] = await exportPanelProducts(selectedFields);
    setLoading(false);

    if (err) {
      return addNotification({
        title: "Hata",
        text: err.message || "Excel export işlemi başarısız oldu.",
        type: "error",
      });
    }

    addNotification({
      title: "Başarılı",
      text: "Excel dosyası başarıyla indirildi.",
      type: "success",
    });

    onExport?.();
    onClose();
  };

  const handleGoogleExport = async () => {
    setGoogleLoading(true);
    const [err, data] = await exportPanelProductsToGoogleMerchant();
    setGoogleLoading(false);

    if (err) {
      return addNotification({
        title: "Hata",
        text: err.message || "Google Merchant export işlemi başarısız oldu.",
        type: "error",
      });
    }

    addNotification({
      title: "Başarılı",
      text: "Google Merchant dosyası başarıyla indirildi.",
      type: "success",
    });

    onExport?.();
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Ürün Excel Export
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Export etmek istediğiniz alanları seçin
          </p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Alanlar ({selectedFields.length}/{AVAILABLE_FIELDS.length})
            </span>
            <div className="flex gap-2">
              <Button
                color="primary"
                size="small"
                onClick={handleSelectAll}
                disabled={selectedFields.length === AVAILABLE_FIELDS.length}
              >
                Tümünü Seç
              </Button>
              <Button
                color="primary"
                size="small"
                onClick={handleDeselectAll}
                disabled={selectedFields.length === 0}
              >
                Tümünü Kaldır
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
            {AVAILABLE_FIELDS.map((field) => (
              <label
                key={field.key}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.key)}
                  onChange={() => handleFieldToggle(field.key)}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{field.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Google Merchant Center Export
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Google Merchant Center için hazırlanmış format ile tüm ürünleri export edin
              </p>
              <Button 
                color="primary" 
                onClick={handleGoogleExport} 
                loading={googleLoading}
                disabled={loading}
                className="w-full"
              >
                Google Merchant Export
              </Button>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button color="red" onClick={onClose} disabled={loading || googleLoading}>
                İptal
              </Button>
              <Button color="primary" onClick={handleExport} loading={loading} disabled={googleLoading}>
                Excel Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExportProductsModal;
