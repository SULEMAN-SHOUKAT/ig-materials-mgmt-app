import { create } from "zustand";

const useState = create((set) => ({
  materials: null,

  setMaterials: (materials) => set({ materials: { ...materials } }),
}));

export default useState;
