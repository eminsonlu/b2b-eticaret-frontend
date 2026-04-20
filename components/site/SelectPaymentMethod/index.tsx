import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { FaSquareCheck } from 'react-icons/fa6';
import { useCartStore } from '@/stores/cartStore';
import { IBankAccount } from '@/types/IBankAccount';
import { fetchBankAccounts } from '@/services/bankAccountService';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import Table from '@/components/shared/Table';

const INSTALLMENT_OPTIONS = [
  {
    id: 1,
    title: 'Tek Çekim',
    installmentCount: 1,
    installmentPrice: 11.919,
  },
  {
    id: 3,
    title: '3 Taksit',
    installmentCount: 3,
    installmentPrice: 3.973,
  },
  {
    id: 6,
    title: '6 Taksit',
    installmentCount: 6,
    installmentPrice: 1.989,
  },
  {
    id: 9,
    title: '9 Taksit',
    installmentCount: 9,
    installmentPrice: 1.324,
  },
];

const SelectPaymentMethod = () => {
  const { paymentMethod, setPaymentMethod, bankAccountId, setBankAccountId } =
    useCartStore();

  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);

  useEffect(() => {
    (async () => {
      const [err, data] = await fetchBankAccounts();
      if (err) return console.log(err);
      setBankAccounts(data);

      if (data.length > 0) {
        setBankAccountId(data[0].id);
        setPaymentMethod('BANK_TRANSFER');
      }
    })();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* bank transfer */}
      <div className={cn('w-full', 'border border-slate-200 rounded-md')}>
        <div
          className={cn(
            'w-full h-[70px] p-6 box-border rounded-md bg-slate-50 border-slate-200 flex items-center gap-2 cursor-pointer',
            {
              'border-b !rounded-b-none': paymentMethod === 'BANK_TRANSFER',
            }
          )}
          onClick={() => setPaymentMethod('BANK_TRANSFER')}
        >
          <FaSquareCheck
            className={cn({
              'text-slate-500': paymentMethod !== 'BANK_TRANSFER',
              'text-primary-500': paymentMethod === 'BANK_TRANSFER',
            })}
            size={20}
          />
          <div>
            <h4 className="font-medium">Banka Havale/EFT</h4>
            <p className="-mt-1 text-xs text-slate-500 italic">
              Banka hesaplarına havale veya EFT yapabilirsiniz.
            </p>
          </div>
        </div>

        {paymentMethod === 'BANK_TRANSFER' && (
          <div className="w-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {bankAccounts.map((account, index) => (
              <div
                key={index}
                className={cn(
                  'w-full p-4 border rounded-md flex flex-col items-center justify-center cursor-pointer relative',
                  {
                    'bg-primary-100/30 border-primary-100':
                      account.id === bankAccountId,
                    'border-slate-200': account.id !== bankAccountId,
                  }
                )}
                onClick={() => setBankAccountId(account.id)}
              >
                {account.id === bankAccountId && (
                  <FaSquareCheck
                    className="text-primary-500 absolute top-2 left-2"
                    size={20}
                  />
                )}
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${account.logo}`}
                  loader={({ src }) => src}
                  alt={account.bank}
                  title={account.bank}
                  width={0}
                  height={0}
                  className="h-full max-h-[50px] max-w-[100px] w-full object-contain"
                  unoptimized
                />
                <strong className="font-semibold mt-3">{account.bank}</strong>

                <strong className="font-semibold text-sm text-slate-500 mt-1">
                  Şube Kodu
                </strong>
                <span>{account.branchCode}</span>
                <strong className="font-semibold text-sm text-slate-500 mt-1">
                  IBAN
                </strong>
                <span>{account.iban}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
