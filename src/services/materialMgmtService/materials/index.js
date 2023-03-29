import axios from "axios";
import config from "../../../config/default.json";

const materialsUrl = `${config.api.igMaterialMgmtService}/materials`;
const getMaterials = () =>
  axios
    .get(materialsUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteMaterials = (names) =>
  axios.delete(`${materialsUrl}/delete`, { data: { names } });

export { getMaterials, deleteMaterials };
