import EditRoleContainer from '@/containers/panel/EditRoleContainer';
import { fetchPanelUserRoleById } from '@/services/userRoleService';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  params: Promise<{ roleId: string }>;
}

const EditRole = async ({ params }: Props) => {
  const { roleId } = await params;
  const [roleErr, role] = await fetchPanelUserRoleById(roleId);

  if (roleErr?.statusCode == 403) {
    redirect('/403');
  }

  if (roleErr) {
    return <div>{roleErr}</div>;
  }

  return <EditRoleContainer initialValues={role} />;
};

export default EditRole;
