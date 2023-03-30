import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ColorPicker from "../../components/ColorPicker";

import parametersHelper from "./helper";
import { isObjectEmpty } from "../../utils";

import useParameters from "../../store/parameters";
import useTexture from "../../store/texture";
import useMappings from "../../store/mappings";

import "./ParametersForm.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "16px",
  borderRadius: "4px",
  width: "30rem",
};

const prepareInitialParametersValue = (parameters) => ({
  name: parameters?.name || "",
  ambient: parameters?.ambient || "",
  diffuse: parameters?.diffuse || "",
  specular: parameters?.specular || "",
  emission: parameters?.emission || "",
  shininess: parameters?.shininess || "",
  transparency: parameters?.transparency || "",
  texture: parameters?.texture || "",
  mapping: parameters?.mapping || "",
});

const ParametersForm = ({ open, handleModalClose, parameters, formMode }) => {
  const { createParameters, loadParameters, editParameters } = useParameters();
  const { textures, loadTextures, isLoadingTexture } = useTexture();
  const { mappings, loadMappings, isLoadingMappings } = useMappings();

  useEffect(() => {
    loadTextures();
    loadMappings();
  }, [loadTextures, loadMappings]);

  const [newParameters, setNewParameters] = useState(
    prepareInitialParametersValue(parameters)
  );
  const [formErrors, setFormErrors] = useState({});

  const fieldChange = async (fieldKey, value) => {
    await setNewParameters({ ...newParameters, [fieldKey]: value });
    const errors = parametersHelper.validateParameters({
      ...newParameters,
      [fieldKey]: value,
    });
    setFormErrors(errors);
  };

  const handleSave = () => {
    try {
      const errors = parametersHelper.validateParameters(newParameters);
      if (!isObjectEmpty(errors)) {
        setFormErrors(errors);
        return;
      } else {
        if (formMode === "new")
          createParameters(newParameters, [loadParameters]);
        if (formMode === "edit")
          editParameters(parameters.name, newParameters, [loadParameters]);
        handleModalClose(false);
      }
    } catch (err) {
      console.log(err);
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
              error={formErrors?.name ? true : false}
              id="name"
              label="Name"
              fullWidth
              value={newParameters?.name}
              onChange={(e) => fieldChange("name", e.target.value)}
              helperText={formErrors?.name}
              disabled={formMode === "edit" ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <ColorPicker
              value={newParameters.ambient}
              fieldKey="ambient"
              label="Ambient"
              onChange={fieldChange}
              error={formErrors?.ambient}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={formErrors?.shininess ? true : false}
              id="shininess"
              label="Shininess"
              fullWidth
              inputProps={{ type: "number" }}
              value={newParameters?.shininess}
              onChange={(e) => fieldChange("shininess", e.target.value)}
              helperText={formErrors?.shininess}
            />
          </Grid>
          <Grid item xs={6}>
            <ColorPicker
              value={newParameters.specular}
              fieldKey="specular"
              label="Specular"
              onChange={fieldChange}
              error={formErrors?.specular}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="texture"
              label="Texture"
              fullWidth
              select
              value={newParameters?.texture}
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
            <ColorPicker
              value={newParameters.diffuse}
              fieldKey="diffuse"
              label="Diffuse"
              onChange={fieldChange}
              error={formErrors?.diffuse}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.transparency ? true : false}
              id="transparency"
              label="Transparency"
              fullWidth
              inputProps={{ type: "number" }}
              value={newParameters?.transparency}
              onChange={(e) => fieldChange("transparency", e.target.value)}
              helperText={formErrors?.transparency}
            />
          </Grid>

          <Grid item xs={6}>
            <ColorPicker
              value={newParameters.emission}
              fieldKey="emission"
              label="Emission"
              onChange={fieldChange}
              error={formErrors?.emission}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="mapping"
              label="Mapping"
              fullWidth
              select
              value={newParameters?.mapping}
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

ParametersForm.defaultProps = {
  open: false,
  handleModalClose: undefined,
  parameters: null,
  formMode: "new",
};
ParametersForm.propTypes = {
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  parameters: PropTypes.object,
  formMode: PropTypes.string,
};

export default ParametersForm;
