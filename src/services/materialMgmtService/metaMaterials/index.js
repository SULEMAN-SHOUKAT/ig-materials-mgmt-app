import axios from "axios";
import { config } from "../../../config";

const metaMaterialsUrl = `${config.api.igMaterialMgmtService}/meta-materials`;

const getMetaMaterials = () =>
  axios
    .get(metaMaterialsUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteMetaMaterials = (names) =>
  axios.delete(`${metaMaterialsUrl}/delete`, { data: { names } });

const createMetaMaterial = (material) =>
  axios.post(`${metaMaterialsUrl}/create`, { ...material });

const editMetaMaterial = (name, update) =>
  axios.post(`${metaMaterialsUrl}/update`, { name, update });

export {
  getMetaMaterials,
  deleteMetaMaterials,
  editMetaMaterial,
  createMetaMaterial,
};
