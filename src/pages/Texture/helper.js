import { isEmpty } from "../../utils";

const validateName = (name, oldTextures, formMode) => {
  if (isEmpty(name)) return "Name is required";
  if (oldTextures.some((tex) => tex.name === name) && formMode === "new")
    return "This name is already used";
  return undefined;
};

const validateDescription = (description) => {
  if (description?.length > 60)
    return "Description is too long should be 60 characters max";
  return undefined;
};

const validators = {
  name: validateName,
  description: validateDescription,
  default: () => undefined,
};

const validateTextureField = (value, key, oldTextures, formMode) => {
  if (validators[key]) return validators[key](value, oldTextures, formMode);
  return validators.default();
};

const validateTexture = (texture, oldTextures, formMode) => {
  let errors = {};
  Object.keys(texture).forEach((fieldKey) => {
    const fieldError = validateTextureField(
      texture[fieldKey],
      fieldKey,
      oldTextures,
      formMode
    );
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const textureHelper = { validateTexture, validateTextureField };
export default textureHelper;
