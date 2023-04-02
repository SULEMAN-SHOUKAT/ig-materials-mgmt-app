import { create } from "zustand";
import {
  getMaterialFiles,
  getTextureFiles,
  deleteMaterialsFiles,
  deleteTexturesFiles,
  addMaterialFile,
  addTextureFile,
} from "../../services/materialMgmtService";

import { successToast, errorToast } from "../../services/toastService";

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

const removers = {
  materials: async (name, _ids) => await deleteMaterialsFiles(name, _ids),
  textures: async (name, _ids) => await deleteTexturesFiles(name, _ids),
};

const creators = {
  materials: async (formData) => await addMaterialFile(formData),
  textures: async (formData) => await addTextureFile(formData),
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

  deleteFiles: async (source, name, files, callBackFunctions = []) => {
    try {
      const _ids = files.map((file) => file._id);
      const result = await removers[source](name, _ids);
      successToast("Successfully removed data");
      callBackFunctions.forEach(async (func) => await func());
      return result;
    } catch (error) {
      errorToast("Failed to remove data");
    }
  },
  addFile: async (source, formData, callBackFunctions = []) => {
    try {
      await creators[source](formData);
      successToast("Successfully added new file");
      callBackFunctions.forEach(async (func) => await func());
    } catch (error) {
      errorToast("Failed to add new file");
    }
  },
  setFilesFilters: (filter) => set({ filesFilters: { ...filter } }),
}));

export default useState;
