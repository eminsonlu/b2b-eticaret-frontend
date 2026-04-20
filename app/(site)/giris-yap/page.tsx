import { LoginContainer } from '@/containers/site/LoginContainer';

export const generateMetadata = async () => {
  return {
    title: 'Giriş Yap',
  };
};

const LoginPage = () => <LoginContainer />;

export default LoginPage;
