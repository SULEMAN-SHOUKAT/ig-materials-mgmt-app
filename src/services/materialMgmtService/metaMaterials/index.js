import axios from "axios";
import config from "../../../config/default.json";

const metaMaterialsUrl = `${config.api.igMaterialMgmtService}/meta-materials`;

const getMetaMaterials = () =>
  axios
    .get(metaMaterialsUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteMetaMaterials = (names) =>
  axios.delete(`${metaMaterialsUrl}/delete`, { data: { names } });

export { getMetaMaterials, deleteMetaMaterials };
