'use client';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishListStore } from '@/stores/wishListStore';
import IUser from '@/types/IUser';
import { useEffect } from 'react';

interface Props {
  user?: IUser;
}

const AuthProviver = ({ user }: Props) => {
  const { setUser } = useAuthStore();
  const { updateCart } = useCartStore();
  const { updateWishList } = useWishListStore();

  useEffect(() => {
    if (!user) {
      setUser(undefined);
      return;
    }

    setUser(user);
    updateCart();
    updateWishList();
  }, [user]);

  return <></>;
};

export default AuthProviver;
