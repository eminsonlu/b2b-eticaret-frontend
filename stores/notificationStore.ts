import INotification from '@/types/INotification';
import { create } from 'zustand';

type Store = {
  notifications: INotification[];
  addNotification: (notif: Omit<INotification, 'id'>) => void;
  removeNotification: (id: string) => void;
};

export const useNotificationStore = create<Store>()((set) => ({
  notifications: [],
  addNotification: (notif) =>
    set((state) => {
      const id = new Date().getTime().toString();

      // remove
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, 7500);

      return { notifications: [...state.notifications, { ...notif, id }] };
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
