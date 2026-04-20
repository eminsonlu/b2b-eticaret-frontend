import RegisterContainer from '@/containers/site/RegisterContainer';

export const generateMetadata = async () => {
  return {
    title: 'Kayıt Ol',
  };
};

const RegisterPage = () => <RegisterContainer />;

export default RegisterPage;
