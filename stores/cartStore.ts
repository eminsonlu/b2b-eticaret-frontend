import {
  createCart,
  deleteCart,
  fetchCart,
  updateCartItemQuantity,
} from '@/services/cartService';
import { ICoupon } from '@/types/ICoupon';
import IProduct from '@/types/IProduct';
import { create } from 'zustand';

type Store = {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
  updateCart: () => Promise<void>;

  addCart: (product: IProduct) => Promise<void>;
  removeCart: (product: IProduct) => Promise<void>;

  coupon?: ICoupon;
  setCoupon: (coupon?: ICoupon) => void;

  paymentMethod: 'CREDIT_CARD' | 'BANK_TRANSFER';
  setPaymentMethod: (method: 'CREDIT_CARD' | 'BANK_TRANSFER') => void;

  bankAccountId?: string;
  setBankAccountId: (bankAccountId: string) => void;

  addressId?: string;
  setAddressId: (addressId?: string) => void;

  setQuantity: (product: IProduct, quantity: number) => Promise<void>;

  resetCart: () => void;
};

export const useCartStore = create<Store>()((set, get) => ({
  cart: [],
  setCart: (cart) => set({ cart }),

  updateCart: async () => {
    const [error, data] = await fetchCart();
    if (error) return;
    return set((state) => ({ ...state, cart: data }));
  },

  addCart: async (product: IProduct) => {
    const [error, data] = await createCart(product.id);
    if (error) return;
    get().updateCart();
  },
  removeCart: async (product: IProduct) => {
    const [error, data] = await deleteCart(product.id);
    if (error) return;

    get().updateCart();
  },

  coupon: undefined,
  setCoupon: (coupon) => set((state) => ({ ...state, coupon })),

  paymentMethod: 'CREDIT_CARD',
  setPaymentMethod: (method) =>
    set((state) => ({ ...state, paymentMethod: method })),

  bankAccountId: undefined,
  setBankAccountId: (bankAccountId) => set({ bankAccountId }),

  addressId: undefined,
  setAddressId: (addressId) => set((state) => ({ ...state, addressId })),

  setQuantity: async (product: IProduct, quantity: number) => {
    const [error, data] = await updateCartItemQuantity(product.id, {
      quantity,
    });
    if (error) return;

    get().updateCart();
  },

  resetCart: () => {
    set({ cart: [] });
    set({ coupon: undefined });
    set({ paymentMethod: 'BANK_TRANSFER' });
    set({ bankAccountId: undefined });
    set({ addressId: undefined });
    get().updateCart();
  },
}));
