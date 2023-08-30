import axios from "axios";
import { config } from "../../../config";

const materialsUrl = `${config.api.igMaterialMgmtService}/materials`;
const getMaterials = () =>
  axios
    .get(materialsUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteMaterials = (names) =>
  axios.delete(`${materialsUrl}/delete`, { data: { names } });

const createMaterial = (material) =>
  axios.post(`${materialsUrl}/create`, { ...material });

const editMaterial = (name, update) =>
  axios.post(`${materialsUrl}/update`, { name, update });

const getMaterialFiles = (name) =>
  axios.get(`${materialsUrl}/material-images/${name}`);

const deleteMaterialsFiles = (name, imagesIds) =>
  axios.delete(`${materialsUrl}/delete/images`, { data: { name, imagesIds } });

const addMaterialFile = (formData) =>
  axios.post(`${materialsUrl}/add-image`, formData);

export {
  getMaterials,
  deleteMaterials,
  createMaterial,
  editMaterial,
  getMaterialFiles,
  deleteMaterialsFiles,
  addMaterialFile,
};
