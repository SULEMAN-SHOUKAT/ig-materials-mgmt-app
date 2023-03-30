import { create } from "zustand";
import { getMappings } from "../../services/materialMgmtService";

const useState = create((set) => ({
  mappings: [],
  isLoadingMapping: true,

  setMapping: (mappings) => set({ mappings: [...mappings] }),
  loadMappings: async () => {
    const results = await getMappings();
    set({
      mappings: [...results.mappings],
      isLoadingMapping: false,
    });
  },
}));

export default useState;
