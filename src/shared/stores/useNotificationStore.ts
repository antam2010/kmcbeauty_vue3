import { create } from "zustand";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationStore {
  notifications: Notification[];
  show: (message: string, type?: Notification["type"]) => void;
  remove: (id: number) => void;
}

let idCounter = 0;

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  show: (message, type = "info") => {
    const id = ++idCounter;
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 3000);
  },
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
