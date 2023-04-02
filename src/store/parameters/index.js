import { create } from "zustand";
import {
  getParameters,
  deleteParameters,
  createParameters,
  editParameters,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

const useState = create((set) => ({
  parameters: [],
  isLoadingParameters: true,
  parametersFilter: {},

  setParameters: (parameters) => set({ parameters: [...parameters] }),
  loadParameters: async () => {
    const results = await getParameters();
    set({ parameters: [...results.parameters], isLoadingParameters: false });
  },
  deleteParameters: async (parameters, callBackFunctions = []) => {
    try {
      const names = parameters.map((parameter) => parameter.name);
      const result = await deleteParameters(names);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  createParameters: async (newParameter, callbackFunctions = []) => {
    try {
      await createParameters(newParameter);
      successToast("Successfully created new Parameters");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to create Parameters");
    }
  },

  editParameters: async (name, update, callbackFunctions = []) => {
    try {
      await editParameters(name, update);
      successToast("Successfully updated data");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to update data");
    }
  },
  setParametersFilters: (filter) => set({ parametersFilter: { ...filter } }),
}));

export default useState;
