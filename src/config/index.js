import defaultConfig from "./default.json";
import stagingConfig from "./staging.json";

const REACT_APP_NODE_CONFIG_ENV = process.env.REACT_APP_NODE_CONFIG_ENV;

console.log(REACT_APP_NODE_CONFIG_ENV, "=========", process.env);
const configs = {
  development: { ...defaultConfig },
  staging: { ...defaultConfig, ...stagingConfig },
};

const config = {
  ...configs[REACT_APP_NODE_CONFIG_ENV],
};

export { config };
