import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

import { SketchPicker } from "react-color";

import "./ColorPicker.css";

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

const ColorPicker = ({ value, onChange, fieldKey, label }) => {
  const wrapperRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);

  useOutsideClick(wrapperRef, () => setShowPicker(false));

  const handleChange = (color, event) => {
    onChange(fieldKey, color.hex);
  };
  return (
    <Box ref={wrapperRef}>
      <FormControl onClick={() => setShowPicker(!showPicker)} fullWidth>
        <InputLabel htmlFor={fieldKey}>{label}</InputLabel>
        <OutlinedInput id={fieldKey} value={value} label={label} />
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

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ColorPicker;
