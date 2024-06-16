import { create } from "zustand";
import api from "../utils/axiosConfig";

// Define the structure of a MiniTask
export interface MiniTask {
  title: string;
  link?: string;
  type?: string;
}

// Define the structure of a Task
export interface Task {
  id: string;
  image: string;
  title: string;
  reward: number;
  isCompleted: boolean;
  miniTasks: MiniTask[];
}

// Define the structure of the store state
interface TaskStoreState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
}

// Create the store
export const useTaskStore = create<TaskStoreState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchData: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.get(`/tasks/${userId}`);
      set({ tasks: data.tasks, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));
