import { create } from "zustand";
import api from "../utils/axiosConfig";

export interface IMaxScoreBoost {
  title: string;
  effect: number;
  price: number;
  order: number;
  id: string;
}

interface MaxScoreBoostStoreState {
  maxScore: IMaxScoreBoost | null;
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
}

// Create the store
export const useMaxScoreBoostStore = create<MaxScoreBoostStoreState>((set) => ({
  maxScore: null,
  loading: false,
  error: null,

  fetchData: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/available-boosts/${userId}/maxScore`);
      console.log(data);
      set({ maxScore: data.availableBoost, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));
