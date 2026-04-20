import {
  createWishList,
  deleteWishList,
  fetchWishList,
} from '@/services/wishListService';
import IProduct from '@/types/IProduct';
import { create } from 'zustand';

type Store = {
  wishList: IProduct[];
  setWishList: (wishList: IProduct[]) => void;
  updateWishList: () => Promise<void>;

  addWishList: (product: IProduct) => Promise<void>;
  removeWishList: (product: IProduct) => Promise<void>;
};

export const useWishListStore = create<Store>()((set, get) => ({
  wishList: [],
  setWishList: (wishList) => set({ wishList }),

  updateWishList: async () => {
    const [error, data] = await fetchWishList();
    if (error) return;
    return set((state) => ({ wishList: data }));
  },

  addWishList: async (product: IProduct) => {
    const [error, data] = await createWishList(product.id);
    if (error) return;
    get().updateWishList();
  },

  removeWishList: async (product: IProduct) => {
    const [error, data] = await deleteWishList(product.id);
    if (error) return;

    get().updateWishList();
  },
}));
