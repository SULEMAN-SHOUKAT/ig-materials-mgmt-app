import axios from "axios";
import config from "../../../config/default.json";

const parametersUrl = `${config.api.igMaterialMgmtService}/parameters`;
const getParameters = () =>
  axios
    .get(parametersUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteParameters = (names) =>
  axios.delete(`${parametersUrl}/delete`, { data: { names } });

const createParameters = (parameters) =>
  axios.post(`${parametersUrl}/create`, { ...parameters });

const editParameters = (name, update) =>
  axios.post(`${parametersUrl}/update`, { name, update });

export { getParameters, deleteParameters, createParameters, editParameters };
