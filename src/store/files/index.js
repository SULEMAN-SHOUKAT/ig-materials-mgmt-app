import { create } from "zustand";
import {
  getMaterialFiles,
  getTextureFiles,
} from "../../services/materialMgmtService";

// import { successToast, errorToast } from "../../services/toastService";

const loaders = {
  materials: async (name) => {
    const results = await getMaterialFiles(name);
    return results.data.materialImages;
  },
  textures: async (name) => {
    const results = await getTextureFiles(name);
    return results.data.textureImages;
  },
};

const useState = create((set) => ({
  files: [],
  isLoadingFiles: true,
  filesFilters: {},

  loadFiles: async (source, name) => {
    const results = await loaders[source](name);
    set({
      files: [...results],
      isLoadingFiles: false,
    });
  },

  setFilesFilters: (filter) => set({ filesFilters: { ...filter } }),
}));

export default useState;
