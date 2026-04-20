import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import BankAccountsContainer from '@/containers/panel/BankAccountsContainer';
import { fetchPanelBankAccounts } from '@/services/bankAccountService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Havale/EFT Yönetimi',
  };
};

const BankAccountsPage = async () => {
  const [bankAccountError, bankAccounts] = await fetchPanelBankAccounts();

  if (bankAccountError?.statusCode == 403) {
    redirect('/403');
  }

  if (bankAccountError) {
    return 'Error';
  }

  const steps = [
    { title: 'Havale/EFT Yönetimi', path: '/panel/bank-accounts' },
  ];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <BankAccountsContainer bankAccounts={bankAccounts} />
    </>
  );
};

export default BankAccountsPage;
