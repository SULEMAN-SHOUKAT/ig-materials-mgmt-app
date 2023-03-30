import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

import { SketchPicker } from "react-color";

import "./ColorPicker.css";
import { FormHelperText } from "@mui/material";

const useOutsideClick = (ref, action) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const ColorPicker = ({ value, onChange, fieldKey, label, error }) => {
  const wrapperRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);

  useOutsideClick(wrapperRef, () => setShowPicker(false));

  const handleChange = (color, event) => {
    onChange(fieldKey, color.hex);
  };
  return (
    <Box ref={wrapperRef}>
      <FormControl onClick={() => setShowPicker(!showPicker)} fullWidth>
        <InputLabel
          htmlFor={fieldKey}
          sx={{ color: error !== "" ? "#d32f2f !important" : "" }}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id={fieldKey}
          value={value}
          label={label}
          error={error !== "" ? true : false}
        />
        <FormHelperText sx={{ color: "#d32f2f" }}>{error}</FormHelperText>
        <Box
          width={"24px"}
          height={"24px"}
          bgcolor={value}
          borderRadius={"2px"}
          position={"absolute"}
          right={5}
          top={16}
        />
      </FormControl>
      {showPicker && <SketchPicker onChange={handleChange} color={value} />}
    </Box>
  );
};

ColorPicker.defaultProps = {
  error: "",
};
ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default ColorPicker;
