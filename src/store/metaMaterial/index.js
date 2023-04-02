import { create } from "zustand";
import {
  getMetaMaterials,
  editMetaMaterial,
  createMetaMaterial,
  deleteMetaMaterials,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

const useState = create((set) => ({
  metaMaterials: [],
  isLoadingMetaMaterials: true,
  metaMaterialsFilter: {},

  setMetaMaterials: (metaMaterials) =>
    set({ metaMaterials: [...metaMaterials] }),
  loadMetaMaterials: async () => {
    const results = await getMetaMaterials();
    set({
      metaMaterials: [...results.metaMaterials],
      isLoadingMetaMaterials: false,
    });
  },
  deleteMetaMaterials: async (metaMaterials, callBackFunctions = []) => {
    try {
      const names = metaMaterials.map((material) => material.name);
      const result = await deleteMetaMaterials(names);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  createMetaMaterial: async (newMetaMaterial, callbackFunctions = []) => {
    try {
      await createMetaMaterial(newMetaMaterial);
      successToast("Successfully created new MetaMaterial");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to create MetaMaterial");
    }
  },

  editMetaMaterial: async (name, update, callbackFunctions = []) => {
    try {
      await editMetaMaterial(name, update);
      successToast("Successfully updated data");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to update data");
    }
  },

  setMetaMaterialsFilters: (filter) =>
    set({ metaMaterialsFilter: { ...filter } }),
}));

export default useState;
