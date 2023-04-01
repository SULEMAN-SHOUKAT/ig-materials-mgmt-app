import { create } from "zustand";
import {
  getMetaMaterialParameters,
  editMetaMaterialParameters,
  createMetaMaterialParameters,
  deleteMetaMaterialParameters,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

const useState = create((set) => ({
  metaMaterialParameters: [],
  isLoadingMetaMaterialParameters: true,
  metaMaterialParametersFilter: {},

  setMetaMaterialParameters: (metaMaterialParameters) =>
    set({ metaMaterialParameters: [...metaMaterialParameters] }),
  loadMetaMaterialParameters: async (metaMaterialName) => {
    const results = await getMetaMaterialParameters(metaMaterialName);
    set({
      metaMaterialParameters: [...results.metaMaterialParameter],
      isLoadingMetaMaterialParameters: false,
    });
  },
  deleteMetaMaterialParameters: async (
    metaMaterialParameters,
    callBackFunctions = []
  ) => {
    try {
      const _ids = metaMaterialParameters.map((material) => material._id);
      const result = await deleteMetaMaterialParameters(_ids);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  createMetaMaterialParameters: async (
    newMetaMaterialParameters,
    callbackFunctions = []
  ) => {
    try {
      await createMetaMaterialParameters(newMetaMaterialParameters);
      successToast("Successfully created new MetaMaterialParameters");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to create MetaMaterialParameters");
    }
  },

  editMetaMaterialParameters: async (id, update, callbackFunctions = []) => {
    try {
      await editMetaMaterialParameters(id, update);
      successToast("Successfully updated data");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to update data");
    }
  },

  setMetaMaterialParametersFilters: (filter) =>
    set({ metaMaterialParametersFilter: { ...filter } }),
}));

export default useState;
