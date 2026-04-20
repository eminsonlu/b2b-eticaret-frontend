import { create } from 'zustand';

type Store = {
  steps: { title: string; path: string }[];
  setSteps: (steps: { title: string; path: string }[]) => void;
};

export const useBreadcrumbStore = create<Store>()((set) => ({
  steps: [],
  setSteps: (steps) => set((state) => ({ ...state, steps })),
}));
