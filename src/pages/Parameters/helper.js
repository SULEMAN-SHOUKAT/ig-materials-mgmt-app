import { isEmpty, isNumber } from "../../utils";

const validateName = (name, oldParameters, formMode) => {
  if (isEmpty(name)) return "Name is required";
  if (oldParameters.some((param) => param.name === name) && formMode === "new")
    return "This name is already used";
  return undefined;
};

const ValidateShininess = (shininess) => {
  if (isEmpty(shininess)) return "Shininess is required";
  if (!isEmpty(shininess) && !isNumber(shininess))
    return "Given value is not a number";
  return undefined;
};

const ValidateTransparency = (transparency) => {
  if (isEmpty(transparency)) return "Shininess is required";
  if (!isEmpty(transparency) && !isNumber(transparency))
    return "Given value is not a number";
  return undefined;
};

const ValidateDiffuse = (diffuse) => {
  if (isEmpty(diffuse)) return "Diffuse is required";
  return undefined;
};

const ValidateSpecular = (specular) => {
  if (isEmpty(specular)) return "specular is required";
  return undefined;
};

const validateEmission = (emission) => {
  if (isEmpty(emission)) return "Emission is required";
  return undefined;
};

const validateAmbient = (ambient) => {
  if (isEmpty(ambient)) return "Ambient is required";
  return undefined;
};

const validators = {
  name: validateName,
  transparency: ValidateTransparency,
  diffuse: ValidateDiffuse,
  specular: ValidateSpecular,
  emission: validateEmission,
  shininess: ValidateShininess,
  ambient: validateAmbient,
  default: () => undefined,
};
const validateParametersField = (value, key, oldParameters, formMode) => {
  if (validators[key]) return validators[key](value, oldParameters, formMode);
  return validators.default();
};

const validateParameters = (parameters, oldParameters, formMode) => {
  let errors = {};
  Object.keys(parameters).forEach((fieldKey) => {
    const fieldError = validateParametersField(
      parameters[fieldKey],
      fieldKey,
      oldParameters,
      formMode
    );
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const parametersHelper = { validateParameters, validateParametersField };
export default parametersHelper;
