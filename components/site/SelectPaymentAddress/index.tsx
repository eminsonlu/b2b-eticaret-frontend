import { deleteAddress, fetchAddresses } from '@/services/addressService';
import { useCartStore } from '@/stores/cartStore';
import { IAddress } from '@/types/IAddress';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BsTrash3 } from 'react-icons/bs';
import { FaSquareCheck } from 'react-icons/fa6';
import { LuCircleFadingPlus } from 'react-icons/lu';
import CreateAddressModal from '../CreateAddressModal';
import EditAddressModal from '../EditAddressModal';
import { useRouter } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';

const SelectPaymentAddress = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const { addressId, setAddressId } = useCartStore();
  const [showModals, setShowModals] = useState<string[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const [err, result] = await fetchAddresses();
      if (err) return;
      setAddresses(result);

      if (result.length > 0 && !addressId) {
        setAddressId(result[0].id);
      }
    })();
  }, [showModals]);

  const handleDeleteAddress = async (id: string) => {
    const [err] = await deleteAddress(id);
    if (err) return;
    setAddresses((pre) => pre.filter((a) => a.id !== id));
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div
            key={index}
            className={classNames(
              'w-full p-4 box-border border rounded-md cursor-pointer',
              {
                'border-slate-200': address.id !== addressId,
                'bg-primary-100/30 border-primary-200': address.id === addressId,
              }
            )}
            onClick={() => setAddressId(address.id)}
          >
            <div className="flex items-center gap-2 border-b border-inherit mb-2 pb-1">
              {address.id === addressId && (
                <FaSquareCheck className="text-primary-500" />
              )}
              <strong className="font-medium">{address.title}</strong>
              <FiEdit
                size={16}
                className="ml-auto cursor-pointer text-slate-400 hover:text-slate-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAddressId(address.id);
                  setShowModals((pre) => [...pre, 'edit']);
                }}
              />
              {address.id !== addressId && (
                <BsTrash3
                  className="cursor-pointer text-slate-400 hover:text-slate-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                />
              )}
            </div>
            <p className="text-sm text-slate-500">
              {address.address} {address.district}/{address.city}{' '}
              {address.zipCode}
            </p>
          </div>
        ))}

        <div
          className="w-full p-4 box-border border rounded-md cursor-pointer border-slate-200 hover:bg-primary-100/30 hover:border-primary-200 flex flex-col items-center justify-center gap-2 group"
          onClick={() => setShowModals((pre) => [...pre, 'create'])}
        >
          <LuCircleFadingPlus
            className="text-slate-400 group-hover:text-primary-400"
            size={24}
          />
          <strong className="font-medium text-slate-600 group-hover:text-primary-500 text-sm">
            Yeni Adres
          </strong>
        </div>
      </div>

      <CreateAddressModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={(newAddress) => {
          setAddresses((pre) => [...pre, newAddress]);
          setAddressId(newAddress.id);
        }}
      />

      {selectedAddressId && (
        <EditAddressModal
          id={selectedAddressId}
          show={showModals.includes('edit')}
          onClose={() =>
            setShowModals((pre) => pre.filter((m) => m !== 'edit'))
          }
          onEdit={() => router.refresh()}
        />
      )}
    </>
  );
};

export default SelectPaymentAddress;
