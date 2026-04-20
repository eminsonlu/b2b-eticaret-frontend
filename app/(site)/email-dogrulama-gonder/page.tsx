import { ResendVerificationContainer } from '@/containers/site/ResendVerificationContainer';

export const generateMetadata = async () => {
  return {
    title: 'E-posta Doğrulama Gönder',
  };
};

const ResendVerificationPage = () => <ResendVerificationContainer />;

export default ResendVerificationPage;