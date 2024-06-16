import { create } from "zustand";
import api from "../utils/axiosConfig";
import { notifyError } from "../utils/constant";

// Define the structure of a Telegram user info
export interface TelegramUserInfo {
  userId: string;
  telegramId: number;
}

export interface IRank {
  name: string;
  minScore: number;
  maxScore: number;
  reward: number;
}

export interface IRobot {
  name: string;
  claimCount: number;
  price: number;
}

export interface IUser {
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  referrals: IUser[];
  userMaxScorePrice: number;
  userTimeLimitPrice: number;
  rank: IRank;
  robot: IRobot;
  parentReferral?: IUser;
  maxScore: number;
  robotTimeRemain: number;
  storedScore: number;
  referralCode?: string;
  lastClaimTimestamp?: Date;
  timeLimit: number;
  nextRankScore: number;
  maxScoreMaxBoostCount: number;
  timeLimitMaxBoostCount: number;
  completedTasks: string[];
  profitPerHour: number;
  rewardFromRank: number;
  lastTimeCallApi: Date;
}

// Define the structure of a User info
export interface UserInfo {
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  referralCode?: string;
  rank: IRank;
  storedScore: number;
  maxScore: number;
  referrals: IUser[];
  parentReferral: IUser;
  robot: IRobot;
  robotTimeRemain: number;
  lastClaimTimestamp: null | Date;
  timeLimit: number;
  userMaxScorePrice: number;
  userTimeLimitPrice: number;
  maxScoreMaxBoostCount: number;
  timeLimitMaxBoostCount: number;
  nextRankScore: number;
  completedTasks: string[];
  canClaim: boolean;
  profitPerHour: number;
}

// Define the structure of the telegram store state
export interface TelegramStoreState {
  telegramUserInfo: TelegramUserInfo | null;
  setTelegramUserInfo: (payload: TelegramUserInfo) => void;
}

// Define the structure of the user ID store state
export interface UserIdStoreState {
  userId: TelegramUserInfo | null;
  loading: boolean;
  error: string | null;
  fetchData: (
    telegramId: string,
    username: string,
    first_name: string,
    last_name: string
  ) => Promise<void>;
}

// Define the structure of the user info store state
export interface UserInfoStoreState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
  claim: () => void;
  incrementStoredScore: () => void;
}

// Create the telegram store
export const useTelegramStore = create<TelegramStoreState>((set) => ({
  telegramUserInfo: null,
  setTelegramUserInfo: (payload: TelegramUserInfo) =>
    set(() => ({ telegramUserInfo: payload })),
}));

// Create the user ID store
export const useUserId = create<UserIdStoreState>((set) => ({
  userId: null,
  loading: false,
  error: null,

  fetchData: async (
    telegramId: string,
    username: string,
    first_name: string,
    last_name: string
  ) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.post(`/user/telegram/${telegramId}`, {
        username,
        first_name,
        last_name,
      });
      set({ userId: data.data, loading: false });
    } catch (error: any) {
      console.log(error.message);
      notifyError(error.message);
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));

// Create the user info store
export const useUserInfo = create<UserInfoStoreState>((set) => ({
  userInfo: null,
  loading: false,
  error: null,

  fetchData: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/user/${userId}`);
      set({ userInfo: data.data, loading: false });
    } catch (error: any) {
      notifyError(error.message);
      set({ error: "Failed to fetch data", loading: false });
    }
  },

  claim: () => {
    set((state) => ({
      userInfo: state.userInfo
        ? {
            ...state.userInfo,
            storedScore: state.userInfo.storedScore + state.userInfo.maxScore,
          }
        : null,
    }));
  },

  incrementStoredScore: () => {
    set((state) => ({
      userInfo: state.userInfo
        ? {
            ...state.userInfo,
            storedScore:
              state.userInfo.storedScore + state.userInfo.profitPerHour / 360,
          }
        : null,
    }));
  },
}));
