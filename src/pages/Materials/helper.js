import { isEmpty } from "../../utils";

const validateName = (name) => {
  if (isEmpty(name)) return "Name is required";
  return undefined;
};

const validateDescription = (description) => {
  if (description?.length > 60)
    return "Description is too long should be 60 char max";
  return undefined;
};

const validateMaterial = (material) => {
  let errors = {};

  const nameErrors = validateName(material?.name);
  const descriptionErrors = validateDescription(material?.description);

  errors = {
    name: nameErrors,
    description: descriptionErrors,
  };

  return errors;
};

const materialHelper = { validateMaterial };
export default materialHelper;
