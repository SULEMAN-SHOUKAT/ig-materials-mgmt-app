import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import mappingsHelper from "./helper";
import { isObjectEmpty } from "../../utils";

import useMappings from "../../store/mappings";

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

const prepareInitialMappingsValue = (mappings) => ({
  name: mappings?.name || "",
  description: mappings?.description || "",
  translationS: mappings?.translationS || "",
  translationT: mappings?.translationT || "",
  rotation: mappings?.rotation || "",
  scaleS: mappings?.scaleS || "",
  scaleT: mappings?.scaleT || "",
  repeatS: mappings?.repeatS || "",
  repeatT: mappings?.repeatT || "",
});

const MappingsForm = ({ open, handleModalClose, mappings, formMode }) => {
  const {
    createMappings,
    loadMappings,
    editMappings,
    mappings: oldMappings,
  } = useMappings();

  useEffect(() => {
    loadMappings();
  }, [loadMappings]);

  const [newMappings, setNewMappings] = useState(
    prepareInitialMappingsValue(mappings)
  );
  const [formErrors, setFormErrors] = useState({});

  const fieldChange = async (fieldKey, value) => {
    await setNewMappings({ ...newMappings, [fieldKey]: value });
    const error = mappingsHelper.validateMappingsField(
      value,
      fieldKey,
      oldMappings,
      formMode
    );
    setFormErrors({ ...formErrors, [fieldKey]: error });
  };

  const handleSave = () => {
    try {
      const errors = mappingsHelper.validateMappings(
        newMappings,
        oldMappings,
        formMode
      );
      if (!isObjectEmpty(errors)) {
        setFormErrors(errors);
        return;
      } else {
        if (formMode === "new") createMappings(newMappings, [loadMappings]);
        if (formMode === "edit")
          editMappings(mappings.name, newMappings, [loadMappings]);
        handleModalClose(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} aria-labelledby="Mappings-form">
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Mappings Form
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
              value={newMappings?.name}
              onChange={(e) => fieldChange("name", e.target.value)}
              helperText={formErrors?.name}
              disabled={formMode === "edit" ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.description ? true : false}
              id="description"
              label="Description"
              fullWidth
              value={newMappings?.description}
              onChange={(e) => fieldChange("description", e.target.value)}
              helperText={formErrors?.description}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.translationS ? true : false}
              id="translationS"
              label="Trans S (0.0) {}"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.translationS}
              onChange={(e) => fieldChange("translationS", e.target.value)}
              helperText={formErrors?.translationS}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.translationT ? true : false}
              id="translationT"
              label="Trans T (0.0) {}"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.translationT}
              onChange={(e) => fieldChange("translationT", e.target.value)}
              helperText={formErrors?.translationT}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.rotation ? true : false}
              id="rotation"
              label="Rot (0.0 D) {}"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.rotation}
              onChange={(e) => fieldChange("rotation", e.target.value)}
              helperText={formErrors?.rotation}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.scaleS ? true : false}
              id="scaleS"
              label="Scale S (1.0) {}"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.scaleS}
              onChange={(e) => fieldChange("scaleS", e.target.value)}
              helperText={formErrors?.scaleS}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.scaleT ? true : false}
              id="scaleT"
              label="Scale T (1.0) {}"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.scaleT}
              onChange={(e) => fieldChange("scaleT", e.target.value)}
              helperText={formErrors?.scaleT}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.repeatS ? true : false}
              id="repeatS"
              label="Repeat S (1.0)"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.repeatS}
              onChange={(e) => fieldChange("repeatS", e.target.value)}
              helperText={formErrors?.repeatS}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formErrors?.repeatT ? true : false}
              id="repeatT"
              label="Repeat T (1.0)"
              fullWidth
              inputProps={{ type: "number" }}
              value={newMappings?.repeatT}
              onChange={(e) => fieldChange("repeatT", e.target.value)}
              helperText={formErrors?.repeatT}
            />
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

MappingsForm.defaultProps = {
  open: false,
  handleModalClose: undefined,
  mappings: null,
  formMode: "new",
};
MappingsForm.propTypes = {
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  mappings: PropTypes.object,
  formMode: PropTypes.string,
};

export default MappingsForm;
