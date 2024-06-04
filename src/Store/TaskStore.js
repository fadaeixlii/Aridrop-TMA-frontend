import { create } from "zustand";
import api from "../utils/axiosConfig";

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,

    fetchData: async(userId) => {
        set({ loading: true, error: null });

        try {
            const { data } = await api.get(`/tasks/${userId}`);
            set({ tasks: data.tasks, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch data", loading: false });
        }
    },
}));