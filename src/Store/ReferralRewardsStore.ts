import { create } from "zustand";
import api from "../utils/axiosConfig";

export interface IReferralReward {
  title: string;
  rewardValue: number;
  referralsNeeded: number;
  id: string;
  isCompleted: boolean;
}

interface ReferralRewardStoreState {
  referralRewards: IReferralReward[];
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
}

// Create the store
export const useReferralRewardStore = create<ReferralRewardStoreState>(
  (set) => ({
    referralRewards: [],
    loading: false,
    error: null,

    fetchData: async (userId: string) => {
      set({ loading: true, error: null });

      try {
        const { data } = await api.get(`/unclaimed-referral-rewards/${userId}`);
        console.log(data);
        set({ referralRewards: data.unclaimedRewards, loading: false });
      } catch (error) {
        set({ error: "Failed to fetch data", loading: false });
      }
    },
  })
);
