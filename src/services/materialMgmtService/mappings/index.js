import axios from "axios";
import { config } from "../../../config";

const mappingsUrl = `${config.api.igMaterialMgmtService}/mappings`;

const getMappings = () =>
  axios
    .get(mappingsUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteMappings = (names) =>
  axios.delete(`${mappingsUrl}/delete`, { data: { names } });

const createMappings = (parameters) =>
  axios.post(`${mappingsUrl}/create`, { ...parameters });

const editMappings = (name, update) =>
  axios.post(`${mappingsUrl}/update`, { name, update });

export { getMappings, deleteMappings, createMappings, editMappings };
