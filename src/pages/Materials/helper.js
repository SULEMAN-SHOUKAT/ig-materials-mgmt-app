import { isEmpty } from "../../utils";

const validateName = (name, oldMaterials, formMode) => {
  if (isEmpty(name)) return "Name is required";
  if (oldMaterials.some((mat) => mat.name === name) && formMode === "new")
    return "This name is already used";
  if (name?.length > 45) return "Name is too long should be 45 characters max";
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

const validateMaterialsField = (value, key, oldMaterials, formMode) => {
  if (validators[key]) return validators[key](value, oldMaterials, formMode);
  return validators.default();
};

const validateMaterial = (material, oldMaterials, formMode) => {
  let errors = {};
  Object.keys(material).forEach((fieldKey) => {
    const fieldError = validateMaterialsField(
      material[fieldKey],
      fieldKey,
      oldMaterials,
      formMode
    );
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const materialHelper = { validateMaterial, validateMaterialsField };
export default materialHelper;
