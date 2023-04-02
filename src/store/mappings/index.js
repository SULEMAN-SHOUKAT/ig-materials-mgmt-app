import { create } from "zustand";
import {
  getMappings,
  deleteMappings,
  createMappings,
  editMappings,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

const useState = create((set) => ({
  mappings: [],
  isLoadingMapping: true,
  mappingsFilter: {},

  setMapping: (mappings) => set({ mappings: [...mappings] }),
  loadMappings: async () => {
    const results = await getMappings();
    set({
      mappings: [...results.mappings],
      isLoadingMapping: false,
    });
  },
  deleteMappings: async (mappings, callBackFunctions = []) => {
    try {
      const names = mappings.map((mapping) => mapping.name);
      const result = await deleteMappings(names);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  createMappings: async (newMapping, callbackFunctions = []) => {
    try {
      await createMappings(newMapping);
      successToast("Successfully created new Mappings");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to create Mappings");
    }
  },

  editMappings: async (name, update, callbackFunctions = []) => {
    try {
      await editMappings(name, update);
      successToast("Successfully updated data");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to update data");
    }
  },
  setMappingsFilters: (filter) => set({ mappingsFilter: { ...filter } }),
}));

export default useState;
