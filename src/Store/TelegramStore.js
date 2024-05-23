import { create } from "zustand";

export const useTelegramStore = create((set) => ({
  userInfo: null,
  setUserInfo: (payload) => set(() => ({ userInfo: payload })),
}));
