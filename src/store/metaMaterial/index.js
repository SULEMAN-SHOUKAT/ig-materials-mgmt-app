import { create } from "zustand";
import { getMetaMaterials } from "../../services/materialMgmtService";

const useState = create((set) => ({
  metaMaterials: [],
  isLoadingMetaMaterials: true,

  setMetaMaterials: (metaMaterials) =>
    set({ metaMaterials: [...metaMaterials] }),
  loadMetaMaterials: async () => {
    const results = await getMetaMaterials();
    set({
      metaMaterials: [...results.metaMaterials],
      isLoadingMetaMaterials: false,
    });
  },
}));

export default useState;
