import axios from "axios";
import { config } from "../../../config";

const metaMaterialParametersUrl = `${config.api.igMaterialMgmtService}/meta-materials-parameters`;

const getMetaMaterialParameters = (metaMaterialName) =>
  axios
    .get(
      `${metaMaterialParametersUrl}/by-meta-material-name/${metaMaterialName}`
    )
    .then((res) => res.data)
    .catch((error) => error);

const deleteMetaMaterialParameters = (_ids) =>
  axios.delete(`${metaMaterialParametersUrl}/delete`, { data: { _ids } });

const createMetaMaterialParameters = (material) =>
  axios.post(`${metaMaterialParametersUrl}/create`, { ...material });

const editMetaMaterialParameters = (id, update) =>
  axios.post(`${metaMaterialParametersUrl}/update`, { id, update });

export {
  getMetaMaterialParameters,
  deleteMetaMaterialParameters,
  createMetaMaterialParameters,
  editMetaMaterialParameters,
};
