import { create } from "zustand";
import api from "../utils/axiosConfig";

export interface ITimeLimitBoost {
  title: string;
  effect: number;
  price: number;
  order: number;
  id: string;
}

interface TimeLimitBoostStoreState {
  timeLimit: ITimeLimitBoost | null;
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
}

export const useTimeLimitBoostStore = create<TimeLimitBoostStoreState>(
  (set) => ({
    timeLimit: null,
    loading: false,
    error: null,

    fetchData: async (userId: string) => {
      set({ loading: true, error: null });

      try {
        const { data } = await api.get(`/available-boosts/${userId}/timeLimit`);
        console.log(data);
        set({ timeLimit: data.availableBoost, loading: false });
      } catch (error) {
        set({ error: "Failed to fetch data", loading: false });
      }
    },
  })
);
