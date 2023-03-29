import React from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

const Fields = {
  string: TextField,
  default: TextField,
};

const InputField = ({
  type,
  fieldKey,
  onValueChange,
  value,
  size,
  disabled,
  placeholder,
  label,
  id,
  style,
}) => {
  const Field = type !== "" ? Fields[type] : Fields.default;
  return (
    <Field
      size={size}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      label={label}
      id={id}
      onChange={(e) => onValueChange(fieldKey, e.target.value)}
      style={style}
    />
  );
};

InputField.defaultProps = {
  id: "",
  label: "",
  fieldKey: "",
  type: "",
  onValueChange: undefined,
  value: "",
  size: "normal",
  disabled: false,
  placeholder: "",
  style: {},
};

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  fieldKey: PropTypes.string,
  type: PropTypes.string,
  onValueChange: PropTypes.func,
  value: PropTypes.any,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

export default InputField;
