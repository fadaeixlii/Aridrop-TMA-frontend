import { create } from "zustand";
import api from "../utils/axiosConfig";

export interface IUsersRanks {
  rank: string;
  minScore: number;
  maxScore: number;
  users: {
    telegramId: number;
    firstName: string;
    lastName: string;
    storedScore: number;
    collectedTon: number;
  }[];
}

interface UsersRanksStoreState {
  usersRanks: IUsersRanks[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useUsersRanksStore = create<UsersRanksStoreState>((set) => ({
  usersRanks: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/top-users-per-rank`);
      console.log(data);
      set({ usersRanks: data.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));
