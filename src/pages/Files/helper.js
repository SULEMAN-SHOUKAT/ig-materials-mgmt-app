import { isEmpty } from "../../utils";

const validateMode = (mode) => {
  if (isEmpty(mode)) return "Mode is required";
  return undefined;
};

const validateImage = (file) => {
  if (isEmpty(file)) return "File is required";
  return undefined;
};

const validators = {
  mode: validateMode,
  image: validateImage,
  default: () => undefined,
};

const validateFileField = (value, key) => {
  if (validators[key]) return validators[key](value);
  return validators.default();
};

const validateFile = (newFile) => {
  let errors = {};

  Object.keys(newFile).forEach((fieldKey) => {
    const fieldError = validateFileField(newFile[fieldKey], fieldKey);
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const fileHelper = { validateFile, validateFileField };
export default fileHelper;
