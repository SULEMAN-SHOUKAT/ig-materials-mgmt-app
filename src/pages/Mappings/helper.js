import { isEmpty, isNumber } from "../../utils";

const validateName = (name, oldMappings, formMode) => {
  if (isEmpty(name)) return "Name is required";
  if (oldMappings.some((map) => map.name === name) && formMode === "new")
    return "This name is already used";
  if (name?.length > 45) return "Name is too long should be 45 characters max";
  return undefined;
};

const validateDescription = (description) => {
  if (description?.length > 45)
    return "Description is too long should be 45 characters max";
  return undefined;
};

const ValidateTranslationS = (translationS) => {
  if (!isEmpty(translationS) && !isNumber(translationS))
    return "Given value is not a number";
  return undefined;
};

const ValidateTranslationT = (translationT) => {
  if (!isEmpty(translationT) && !isNumber(translationT))
    return "Given value is not a number";
  return undefined;
};

const ValidateRotation = (rotation) => {
  if (!isEmpty(rotation) && !isNumber(rotation))
    return "Given value is not a number";
  return undefined;
};

const ValidateScaleS = (scaleS) => {
  if (!isEmpty(scaleS) && !isNumber(scaleS))
    return "Given value is not a number";
  return undefined;
};

const ValidateScaleT = (scaleT) => {
  if (!isEmpty(scaleT) && !isNumber(scaleT))
    return "Given value is not a number";
  return undefined;
};

const ValidateRepeatS = (repeatS) => {
  if (!isEmpty(repeatS) && !isNumber(repeatS))
    return "Given value is not a number";
  return undefined;
};

const ValidateRepeatT = (repeatT) => {
  if (!isEmpty(repeatT) && !isNumber(repeatT))
    return "Given value is not a number";
  return undefined;
};

const validators = {
  name: validateName,
  description: validateDescription,
  translationS: ValidateTranslationS,
  translationT: ValidateTranslationT,
  rotation: ValidateRotation,
  scaleS: ValidateScaleS,
  scaleT: ValidateScaleT,
  repeatS: ValidateRepeatS,
  repeatT: ValidateRepeatT,
  default: () => undefined,
};
const validateMappingsField = (value, key, oldParameters, formMode) => {
  if (validators[key]) return validators[key](value, oldParameters, formMode);
  return validators.default();
};

const validateMappings = (mappings, oldMappings, formMode) => {
  let errors = {};
  Object.keys(mappings).forEach((fieldKey) => {
    const fieldError = validateMappingsField(
      mappings[fieldKey],
      fieldKey,
      oldMappings,
      formMode
    );
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const mappingsHelper = { validateMappings, validateMappingsField };
export default mappingsHelper;
