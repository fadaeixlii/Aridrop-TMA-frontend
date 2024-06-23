import { create } from "zustand";
import api from "../utils/axiosConfig";

export interface IRank {
  name: string;
  minScore: number;
  maxScore: number;
  reward: number;
  id: string;
}

interface RankStoreState {
  ranks: IRank[];
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
}

// Create the store
export const useRankStore = create<RankStoreState>((set) => ({
  ranks: [],
  loading: false,
  error: null,

  fetchData: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/rank-list/${userId}`);
      console.log(data);
      set({ ranks: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));
