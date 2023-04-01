import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import MetaMaterialParametersHelper from "./helper";
import { isObjectEmpty } from "../../../utils";

import useTexture from "../../../store/texture";
import useMappings from "../../../store/mappings";
import useMetaMaterialParameters from "../../../store/metaMaterialParameters";

import "./MetaMaterialParametersForm.css";

const keyFieldOptions = [
  { value: "Normal Map (Texture)" },
  { value: "Roughness Map (Texture)" },
  { value: "Alpha Map (Texture)" },
  { value: "Diffuse Delta Map (Texture)" },
  { value: "Roughness Delta Map (Texture)" },
  { value: "Delta Mapping (Mapping)" },
  { value: "Shadow Display Control (String)" },
  { value: "Taxonomy/Classification (JSON)" },
  { value: "[Horizontal] Patch Size (Float)" },
  { value: "Vertical Patch Size (Float)" },
  { value: "Disallow Re-Scaling (Boolean)" },
  { value: "Overlay Geometry (Boolean)" },
  { value: "Contrast (Float)" },
  { value: "Ignore Standard Maps (Boolean)" },
  { value: "Auto Mapping Mode (String)" },
  { value: "Auto Mapping Rotation (String)" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "16px",
  borderRadius: "4px",
  width: "40rem",
};

const MetaMaterialParametersForm = ({
  open,
  handleModalClose,
  metaMaterialName,
}) => {
  const { loadMetaMaterialParameters, createMetaMaterialParameters } =
    useMetaMaterialParameters();
  const { textures, loadTextures, isLoadingTexture } = useTexture();
  const { mappings, loadMappings, isLoadingMappings } = useMappings();

  const [newMetaMaterialParameters, setNewMetaMaterialParameters] = useState({
    key: "",
    value: "",
    texture: "",
    mapping: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadTextures();
    loadMappings();
  }, [loadTextures, loadMappings]);

  const fieldChange = async (fieldKey, value) => {
    setNewMetaMaterialParameters({
      ...newMetaMaterialParameters,
      [fieldKey]: value,
    });
    const error =
      MetaMaterialParametersHelper.validateMetaMaterialParametersField(
        value,
        fieldKey
      );
    setFormErrors({ ...formErrors, [fieldKey]: error });
  };

  const handleSave = () => {
    const errors = MetaMaterialParametersHelper.validateMetaMaterialParameters(
      newMetaMaterialParameters
    );
    if (!isObjectEmpty(errors)) {
      setFormErrors(errors);
      return;
    } else {
      createMetaMaterialParameters(
        { ...newMetaMaterialParameters, metaMaterial: metaMaterialName },
        [() => loadMetaMaterialParameters(metaMaterialName)]
      );

      handleModalClose(false);
    }
  };

  return (
    <Modal open={open} aria-labelledby="Parameters-form">
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Parameters Form
          </Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid
          component="form"
          container
          spacing={2}
          sx={{ marginBottom: "2rem", marginTop: "10px" }}
        >
          <Grid item xs={6}>
            <TextField
              id="key"
              label="Key"
              fullWidth
              select
              value={newMetaMaterialParameters?.key}
              onChange={(e) => fieldChange("key", e.target.value)}
            >
              {keyFieldOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={formErrors?.value ? true : false}
              id="value"
              label="Value (Default)"
              fullWidth
              value={newMetaMaterialParameters?.value}
              onChange={(e) => fieldChange("value", e.target.value)}
              helperText={formErrors?.value}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="texture"
              label="Texture"
              fullWidth
              select
              value={newMetaMaterialParameters?.texture}
              onChange={(e) => fieldChange("texture", e.target.value)}
            >
              {textures.length == 0 && (
                <MenuItem disabled>No textures found</MenuItem>
              )}
              {!isLoadingTexture &&
                textures.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="mapping"
              label="Mapping"
              fullWidth
              select
              value={newMetaMaterialParameters?.mapping}
              onChange={(e) => fieldChange("mapping", e.target.value)}
            >
              {mappings.length == 0 && (
                <MenuItem disabled>No mappings found</MenuItem>
              )}
              {!isLoadingMappings &&
                mappings.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginRight: "1rem" }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={handleModalClose}>
            cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

MetaMaterialParametersForm.defaultProps = {
  open: false,
  handleModalClose: undefined,
  metaMaterialName: "",
};
MetaMaterialParametersForm.propTypes = {
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  metaMaterialName: PropTypes.string,
};

export default MetaMaterialParametersForm;
