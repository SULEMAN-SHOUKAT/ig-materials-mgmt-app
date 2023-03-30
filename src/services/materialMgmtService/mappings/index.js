import axios from "axios";
import config from "../../../config/default.json";

const mappingsUrl = `${config.api.igMaterialMgmtService}/mappings`;

const getMappings = () =>
  axios
    .get(mappingsUrl)
    .then((res) => res.data)
    .catch((error) => error);

const deleteMappings = (names) =>
  axios.delete(`${mappingsUrl}/delete`, { data: { names } });

export { getMappings, deleteMappings };
