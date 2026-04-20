import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import UsersContainer from '@/containers/panel/UsersContainer';
import { fetchPanelUsers } from '@/services/userService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Kullanıcılar',
  };
};

const UsersPage = async () => {
  const [userError, users] = await fetchPanelUsers();

  if (userError?.statusCode == 403) {
    redirect('/403');
  }

  if (userError) {
    return 'Error';
  }

  const steps = [{ title: 'Kullanıcılar', path: '/panel/users' }];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <UsersContainer users={users} />
    </>
  );
};

export default UsersPage;
