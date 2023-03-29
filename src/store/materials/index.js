import { create } from "zustand";
import {
  getMaterials,
  deleteMaterials,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

const useState = create((set) => ({
  materials: [],
  isLoading: true,
  materialsFilter: {},

  setMaterials: (materials) => set({ materials: [...materials] }),
  loadMaterials: async () => {
    const results = await getMaterials();
    set({ materials: [...results.materials], isLoading: false });
  },
  deleteMaterials: async (materials, callBackFunctions = []) => {
    try {
      const names = materials.map((material) => material.name);
      const result = await deleteMaterials(names);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  setMaterialsFilters: (filter) => set({ materialsFilter: { ...filter } }),
}));

export default useState;
