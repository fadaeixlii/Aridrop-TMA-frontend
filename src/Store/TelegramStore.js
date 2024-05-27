import { create } from "zustand";

export const useTelegramStore = create((set) => ({
  userInfo: null,
  setUserInfo: (payload) => set(() => ({ userInfo: payload })),
}));

const userUserId = create((set) => ({
  userId: null,
  loading: false,

  fetchData: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("https://api.example.com/data");
      const result = await response.json();
      set({ data: result, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));
