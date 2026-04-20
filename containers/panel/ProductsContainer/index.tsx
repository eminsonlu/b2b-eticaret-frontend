"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import IProduct from "@/types/IProduct";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { deletePanelProduct } from "@/services/productService";
import Image from "next/image";
import Button from "@/components/shared/Button";
import Table from "@/components/shared/Table";
import { useNotificationStore } from "@/stores/notificationStore";
import { useAuthStore } from "@/stores/authStore";
import ExportProductsModal from "@/components/panel/ExportProductsModal";
import CopyProductModal from "@/components/panel/CopyProductModal";
import { getImageUrl } from "@/utils/imageUtils";

const ProductsContainer = ({ products = [] }: { products: IProduct[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleRemove = async (tag: IProduct) => {
    const [err, data] = await deletePanelProduct(tag.id);
    if (err) {
      return addNotification({
        title: "Hata",
        text: err.message,
        type: "error",
      });
    }

    router.refresh();
  };

  const handleExcelExport = () => {
    setShowExportModal(true);
  };

  const COLUMNS = [
    {
      title: 'Başlık',
      content: (row: IProduct) => (
        <div className="flex items-center gap-2">
          <Image
            src={getImageUrl(row.thumbnail)}
            loader={({ src }) => src}
            alt={row.title}
            title={row.title}
            width={0}
            height={0}
            className="w-[35px] h-[35px] object-contain"
            unoptimized
          />
          {row.title}
        </div>
      ),
    },
    {
      title: "Fiyat",
      content: (row: IProduct) =>
        row.discountPrice !== 0 &&
        row.discountPrice !== null &&
        row.discountPrice !== row.price ? (
          <span>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(row.discountPrice)}{" "}
            <span className="line-through text-gray-500">
              {Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(row.price)}
            </span>
          </span>
        ) : (
          Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(row.price)
        ),
      className: "w-[150px] max-w-[150px]",
    },
    {
      title: "Tip",
      content: (row: IProduct) => row.type,
      className: "w-[100px] max-w-[100px]",
    },
    {
      title: "Oluşturma Tarihi",
      content: (row: IProduct) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: "w-[225px] max-w-[225px]",
    },
    {
      title: "Güncellenme Tarihi",
      content: (row: IProduct) => DateTime.fromISO(row.updatedAt).toRelative(),
      className: "w-[225px] max-w-[225px]",
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: "Düzenle",
      action: (row: IProduct) => router.push(`/panel/products/${row.id}`),
      hidden: !user?.role?.product?.includes("UPDATE"),
    },
    {
      icon: <FiEdit size={16} />,
      title: "Kopyala",
      action: (row: IProduct) => {
        setSelectedProduct(row.id);
        setShowCopyModal(true);
      },
      hidden: !user?.role?.product?.includes("CREATE"),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: "Sil",
      action: (row: IProduct) => handleRemove(row),
      hidden: !user?.role?.product?.includes("DELETE"),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Ürünler</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            color="green"
            onClick={handleExcelExport}
          >
            Excel Export
          </Button>
          {user?.role?.product?.includes("CREATE") && (
            <Button
              color="green"
              onClick={() => router.push("/panel/products/new")}
            >
              Yeni Ekle
            </Button>
          )}
        </div>
      </div>

      <Table columns={COLUMNS} actions={actions} data={products} />

      <ExportProductsModal
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={() => setShowExportModal(false)}
      />

      {showCopyModal && (
        <CopyProductModal
          show={showCopyModal}
          onClose={() => setShowCopyModal(false)}
          productId={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductsContainer;
