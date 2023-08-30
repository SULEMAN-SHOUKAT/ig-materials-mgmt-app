import axios from "axios";
import { config } from "../../../config";

const texturesUrl = `${config.api.igMaterialMgmtService}/texture`;

const getTextures = () =>
  axios
    .get(texturesUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteTextures = (names) =>
  axios.delete(`${texturesUrl}/delete`, { data: { names } });

const createTexture = (material) =>
  axios.post(`${texturesUrl}/create`, { ...material });

const editTexture = (name, update) =>
  axios.post(`${texturesUrl}/update`, { name, update });

const getTextureFiles = (name) =>
  axios.get(`${texturesUrl}/texture-images/${name}`);

const deleteTexturesFiles = (name, imagesIds) =>
  axios.delete(`${texturesUrl}/delete/images`, { data: { name, imagesIds } });

const addTextureFile = (formData) =>
  axios.post(`${texturesUrl}/add-image`, formData);

export {
  getTextures,
  deleteTextures,
  createTexture,
  editTexture,
  getTextureFiles,
  deleteTexturesFiles,
  addTextureFile,
};
