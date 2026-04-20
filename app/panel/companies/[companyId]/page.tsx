import EditCompanyContainer from '@/containers/panel/EditCompanyContainer';

interface Props {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function EditCompanyPage({ params }: Props) {
  const { companyId } = await params;
  return <EditCompanyContainer companyId={companyId} />;
}
