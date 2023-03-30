import { isEmpty, isNumber } from "../../utils";

const validateName = (name) => {
  if (isEmpty(name)) return "Name is required";
  return undefined;
};

const ValidateShininess = (shininess) => {
  if (!isEmpty(shininess) && !isNumber(shininess))
    return "Given value is not a number";
  return undefined;
};

const ValidateTransparency = (transparency) => {
  if (!isEmpty(transparency) && !isNumber(transparency))
    return "Given value is not a number";
  return undefined;
};

const validateParameters = (parameters) => {
  let errors = {};
  const nameErrors = validateName(parameters?.name);
  const shininessErrors = ValidateShininess(parameters?.shininess);
  const transparencyErrors = ValidateTransparency(parameters?.transparency);

  errors = {
    name: nameErrors,
    shininess: shininessErrors,
    transparency: transparencyErrors,
  };

  return errors;
};

const parametersHelper = { validateParameters };
export default parametersHelper;
