import ICategory, { IExtendedCategory } from '@/types/ICategory';
import React, { Fragment, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import SubCategories from './SubCategories';
import classNames from 'classnames';
import CreateCategoryModal from '../CreateCategoryModal';
import EditCategoryModal from '../EditCategoryModal';
import { useRouter } from 'next/navigation';
import { deletePanelCategory } from '@/services/categoryService';
import { useNotificationStore } from '@/stores/notificationStore';
import Badge from '@/components/shared/Badge';
import { useAuthStore } from '@/stores/authStore';
import { getImageUrl } from '@/utils/imageUtils';

const CategoryItem = ({
  category,
  border = true,
}: {
  category: IExtendedCategory;
  border?: boolean;
}) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [showModals, setShowModals] = useState<string[]>([]);
  const [hover, setHover] = useState(false);

  const handleRemove = async (category: ICategory) => {
    const [err, data] = await deletePanelCategory(category.id);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-2 relative">
        <div
          className={classNames(
            'w-[1px] h-full absolute top-0 left-5 z-10 bg-slate-300',
            {
              '!bg-blue-400': hover,
            }
          )}
        ></div>
        {border && (
          <div className="w-[12px] h-[1px] absolute right-full top-6 z-10 bg-slate-300"></div>
        )}

        <div
          className={classNames(
            'min-h-[53px]',
            'flex items-center gap-2',
            'border border-slate-200',
            'relative z-20',
            'p-2 box-border bg-slate-100 rounded-md',
            'cursor-pointer hover:border-blue-300 hover:bg-blue-100',
            {
              '!bg-blue-100 !border-blue-300': hover,
            }
          )}
          onClick={() => setShowSubCategories((pre) => !pre)}
        >
          {category.thumbnail && (
            <Image
              loader={({ src }) => src}
              src={getImageUrl(category.thumbnail)}
              width={35}
              height={35}
              className="rounded-full"
              alt={category.title}
              title={category.title}
              unoptimized
            />
          )}
          <span className="text-sm text-black/80">{category.title}</span>
          {category.isFeatured && <Badge color="green">Öne Çıkarılmış</Badge>}

          <div className="flex items-center gap-2 ml-auto">
            {user?.role?.category?.includes('UPDATE') && (
              <FiEdit
                size={16}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategoryId(category.id);
                  setShowModals((pre) => [...pre, 'edit']);
                }}
              />
            )}

            {user?.role?.category?.includes('DELETE') && (
              <FiTrash2
                size={16}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(category);
                }}
              />
            )}
          </div>
        </div>

        {showSubCategories && (
          <Fragment>
            {category.subCategories.length > 0 && (
              <SubCategories categories={category.subCategories} />
            )}

            {user?.role?.category?.includes('CREATE') && (
              <div
                className="flex items-center gap-2 p-2 box-border bg-slate-50 rounded-md border-2 border-dashed border-slate-200 relative z-20 cursor-pointer hover:border-blue-300"
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                onClick={() => setShowModals((pre) => [...pre, 'create'])}
              >
                <span className="text-sm text-black/70">
                  <strong className="font-semibold">{category.title}</strong>{' '}
                  kategorisine alt kategori ekle
                </span>
              </div>
            )}
          </Fragment>
        )}
      </div>

      <CreateCategoryModal
        parentId={category.id}
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={(val) => router.refresh()}
      />

      {selectedCategoryId && (
        <EditCategoryModal
          id={selectedCategoryId}
          show={showModals.includes('edit')}
          onClose={() => {
            setShowModals((pre) => pre.filter((m) => m !== 'edit'));
            setSelectedCategoryId(null);
          }}
          onEdit={(val) => router.refresh()}
        />
      )}
    </>
  );
};

export default CategoryItem;
