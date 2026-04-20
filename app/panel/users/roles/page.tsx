import BreadcrumbStoreProvider from '@/components/panel/BreadcrumbStoreProvider';
import UserRolesContainer from '@/containers/panel/UserRolesContainer';
import { fetchPanelUserRoles } from '@/services/userRoleService';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 0;

export const generateMetadata = async () => {
  return {
    title: 'Yetkilendirme',
  };
};

const UserRolesPage = async () => {
  const [roleErr, roles] = await fetchPanelUserRoles();

  if (roleErr?.statusCode == 403) {
    redirect('/403');
  }

  if (roleErr) {
    return 'Error';
  }

  const steps = [{ title: 'Yetkilendirme', path: '/panel/users/role' }];

  return (
    <>
      <BreadcrumbStoreProvider steps={steps} />
      <UserRolesContainer roles={roles} />
    </>
  );
};

export default UserRolesPage;
