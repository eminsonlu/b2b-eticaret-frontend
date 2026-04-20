import { Metadata } from 'next';
import ProfileContainer from '@/containers/site/ProfileContainer';

export const metadata: Metadata = {
  title: 'Profil Bilgilerim',
  description: 'Hesap bilgilerinizi görüntüleyin ve düzenleyin',
};

export default async function ProfilePage() {

  return <ProfileContainer />;
}