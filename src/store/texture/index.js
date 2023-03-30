import { create } from "zustand";
import { getTextures } from "../../services/materialMgmtService";

const useState = create((set) => ({
  textures: [],
  isLoadingTexture: true,

  setTexture: (textures) => set({ textures: [...textures] }),
  loadTextures: async () => {
    const results = await getTextures();
    set({
      textures: [...results.textures],
      isLoadingTexture: false,
    });
  },
}));

export default useState;
