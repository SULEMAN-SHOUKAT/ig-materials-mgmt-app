import axios from "axios";
import config from "../../../config/default.json";

const texturesUrl = `${config.api.igMaterialMgmtService}/texture`;

const getTextures = () =>
  axios
    .get(texturesUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteTextures = (names) =>
  axios.delete(`${texturesUrl}/delete`, { data: { names } });

export { getTextures, deleteTextures };
