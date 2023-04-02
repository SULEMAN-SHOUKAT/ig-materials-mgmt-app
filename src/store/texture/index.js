import { create } from "zustand";
import {
  getTextures,
  deleteTextures,
  createTexture,
  editTexture,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

const useState = create((set) => ({
  textures: [],
  isLoadingTexture: true,
  texturesFilter: {},

  setTexture: (textures) => set({ textures: [...textures] }),
  loadTextures: async () => {
    const results = await getTextures();
    set({
      textures: [...results.textures],
      isLoadingTexture: false,
    });
  },
  deleteTextures: async (textures, callBackFunctions = []) => {
    try {
      const names = textures.map((material) => material.name);
      const result = await deleteTextures(names);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  createTexture: async (newTexture, callbackFunctions = []) => {
    try {
      await createTexture(newTexture);
      successToast("Successfully created new Texture");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to create Texture");
    }
  },

  editTexture: async (name, update, callbackFunctions = []) => {
    try {
      await editTexture(name, update);
      successToast("Successfully updated data");
      callbackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to update data");
    }
  },

  setTexturesFilters: (filter) => set({ texturesFilter: { ...filter } }),
}));

export default useState;
