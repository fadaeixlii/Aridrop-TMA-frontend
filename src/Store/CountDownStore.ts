import { create } from "zustand";

interface ICountDownStore {
  seconds: number;
  setSeconds: (countdown: number) => void;
  decrease: () => void;
  isButtonDisabled: boolean;
  setIsButtonDisabled: (disabled: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useCountDownStore = create<ICountDownStore>((set) => ({
  seconds: 0,
  isButtonDisabled: false,
  loading: false,

  setSeconds: (countdown) => set({ seconds: countdown }),
  decrease: () => set((state) => ({ seconds: state.seconds - 1 })),
  setIsButtonDisabled: (disabled) => set({ isButtonDisabled: disabled }),
  setLoading: (loading) => set({ loading }),
}));
