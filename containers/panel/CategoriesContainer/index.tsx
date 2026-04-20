'use client';
import React, { useState } from 'react';
import ICategory from '@/types/ICategory';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import Categories from '@/components/panel/Categories';
import CreateCategoryModal from '@/components/panel/CreateCategoryModal';
import { useAuthStore } from '@/stores/authStore';

const CategoriesContainer = ({
  categories = [],
}: {
  categories: ICategory[];
}) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const [showModals, setShowModals] = useState<string[]>([]);

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Kategoriler</h1>
        {user?.role?.category?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Categories categories={categories} />

      <CreateCategoryModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />
    </>
  );
};

export default CategoriesContainer;
