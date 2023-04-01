import { isEmpty } from "../../utils";

const validateName = (name, oldMetaMaterials, formMode) => {
  if (isEmpty(name)) return "Name is required";
  if (oldMetaMaterials.some((tex) => tex.name === name) && formMode === "new")
    return "This name is already used";
  if (name?.length > 45) return "name is too long should be 45 characters max";
  return undefined;
};

const validateDescription = (description) => {
  if (description?.length > 45)
    return "Description is too long should be 45 characters max";
  return undefined;
};

const validators = {
  name: validateName,
  description: validateDescription,
  default: () => undefined,
};

const validateMetaMaterialField = (value, key, oldMetaMaterials, formMode) => {
  if (validators[key])
    return validators[key](value, oldMetaMaterials, formMode);
  return validators.default();
};

const validateMetaMaterial = (metaMaterial, oldMetaMaterials, formMode) => {
  let errors = {};
  Object.keys(metaMaterial).forEach((fieldKey) => {
    const fieldError = validateMetaMaterialField(
      metaMaterial[fieldKey],
      fieldKey,
      oldMetaMaterials,
      formMode
    );
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const metaMaterialHelper = { validateMetaMaterial, validateMetaMaterialField };
export default metaMaterialHelper;
