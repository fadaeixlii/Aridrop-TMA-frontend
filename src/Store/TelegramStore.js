import { create } from "zustand";
import api from "../utils/axiosConfig";
import { notifyError } from "../utils/constant";

export const useTelegramStore = create((set) => ({
  telegramUserInfo: null,
  setTelegramUserInfo: (payload) => set(() => ({ telegramUserInfo: payload })),
}));

export const useUserId = create((set) => ({
  userId: null,
  loading: false,

  fetchData: async (telegramId) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/user/telegram/${telegramId}`);
      set({ userId: data.data, loading: false });
    } catch (error) {
      console.log(error.message);
      notifyError(error.message);
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));
export const useUserInfo = create((set) => ({
  userInfo: null,
  loading: false,

  fetchData: async (userId) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/user/${userId}`);
      set({ userInfo: data.data, loading: false });
    } catch (error) {
      notifyError(error.message);
      set({ error: "Failed to fetch data", loading: false });
    }
  },
  claim: () => {
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        storedScore: state.userInfo.storedScore + state.userInfo.maxScore,
      },
    }));
  },
  incrementStoredScore: () => {
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        storedScore:
          state.userInfo.storedScore + state.userInfo.profitPerHour / 360,
      },
    }));
  },
}));
