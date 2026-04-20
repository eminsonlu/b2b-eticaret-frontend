import { ForgotPasswordContainer } from '@/containers/site/ForgotPasswordContainer';

export const generateMetadata = async () => {
  return {
    title: 'Şifremi Unuttum',
  };
};

const ForgotPasswordPage = () => <ForgotPasswordContainer />;

export default ForgotPasswordPage;