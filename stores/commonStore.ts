import { create } from 'zustand';

type Store = {
  isHamburgerMenuOpen: boolean;
  setIsHamburgerMenuOpen: (isHamburgerMenuOpen: boolean) => void;
};

export const useCommonStore = create<Store>()((set) => ({
  isHamburgerMenuOpen: false,
  setIsHamburgerMenuOpen: (isHamburgerMenuOpen) => set((state) => ({ ...state, isHamburgerMenuOpen })),
}));
