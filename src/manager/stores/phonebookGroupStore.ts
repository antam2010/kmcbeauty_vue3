import { create } from "zustand";
import type { PhonebookGroupResponse } from "@/shared/types/phonebook";
import { getPhonebookGroupList } from "@/shared/api/phonebook";

interface GroupStore {
  groupList: PhonebookGroupResponse[];
  isLoading: boolean;
  error: string | null;
  fetchGroups: () => Promise<void>;
}

export const useGroupStore = create<GroupStore>((set) => ({
  groupList: [],
  isLoading: false,
  error: null,
  fetchGroups: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getPhonebookGroupList();
      set({ groupList: data });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Unknown error" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
