import { isEmpty, isNumber } from "../../utils";

const validateName = (name) => {
  if (isEmpty(name)) return "Name is required";
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

const validateParameters = (parameters) => {
  let errors = {};

  const nameErrors = validateName(parameters?.name);
  const shininessErrors = ValidateShininess(parameters?.shininess);
  const transparencyErrors = ValidateTransparency(parameters?.transparency);
  const diffuseErrors = ValidateDiffuse(parameters?.diffuse);
  const specularErrors = ValidateSpecular(parameters?.specular);
  const emissionErrors = validateEmission(parameters?.emission);
  const ambientErrors = validateAmbient(parameters?.ambient);

  errors = {
    name: nameErrors,
    transparency: transparencyErrors,
    diffuse: diffuseErrors,
    specular: specularErrors,
    emission: emissionErrors,
    shininess: shininessErrors,
    ambient: ambientErrors,
  };

  console.log(errors);
  return errors;
};

const parametersHelper = { validateParameters };
export default parametersHelper;
