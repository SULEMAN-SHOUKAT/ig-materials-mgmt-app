const validateValue = (description) => {
  if (description?.length > 70)
    return "Description is too long should be 70 characters max";
  return undefined;
};

const validators = {
  value: validateValue,
  default: () => undefined,
};

const validateMetaMaterialParametersField = (value, key) => {
  if (validators[key]) return validators[key](value);
  return validators.default();
};

const validateMetaMaterialParameters = (metaMaterial) => {
  let errors = {};
  Object.keys(metaMaterial).forEach((fieldKey) => {
    const fieldError = validateMetaMaterialParametersField(
      metaMaterial[fieldKey],
      fieldKey
    );
    errors = {
      ...errors,
      [fieldKey]: fieldError,
    };
  });
  return errors;
};

const metaMaterialHelper = {
  validateMetaMaterialParameters,
  validateMetaMaterialParametersField,
};
export default metaMaterialHelper;
