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

import materialHelper from "./helper";
import { isObjectEmpty } from "../../utils";

import useMetaMaterials from "../../store/metaMaterial";
import useMaterials from "../../store/materials";

import "./MaterialForm.css";

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

const prepareInitialMaterialValue = (material) => ({
  name: material?.name || "",
  description: material?.description || "",
  metaMaterial: material?.metaMaterial || "",
});

const MaterialsForm = ({ open, handleModalClose, material, formMode }) => {
  const { metaMaterials, isLoadingMetaMaterials, loadMetaMaterials } =
    useMetaMaterials();
  const { createMaterial, loadMaterials, editMaterial } = useMaterials();

  const [newMaterial, setNewMaterial] = useState(
    prepareInitialMaterialValue(material)
  );
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadMetaMaterials();
  }, [loadMetaMaterials]);

  const fieldChange = (fieldkey, value) =>
    setNewMaterial({ ...newMaterial, [fieldkey]: value });

  const handleSave = () => {
    const errors = materialHelper.validateMaterial(newMaterial);
    if (!isObjectEmpty(errors)) {
      setFormErrors(errors);
      return;
    } else {
      if (formMode === "new") createMaterial(newMaterial, [loadMaterials]);
      if (formMode === "edit")
        editMaterial(material.name, newMaterial, [loadMaterials]);
      handleModalClose(false);
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Materials Form
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
              value={newMaterial?.name}
              onChange={(e) => fieldChange("name", e.target.value)}
              helperText={formErrors?.name}
              disabled={formMode === "edit" ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="metaMaterial"
              label="MetaMaterial"
              fullWidth
              select
              value={newMaterial?.metaMaterial}
              onChange={(e) => fieldChange("metaMaterial", e.target.value)}
            >
              {metaMaterials.length == 0 && (
                <MenuItem disabled>No meta materials found</MenuItem>
              )}
              {!isLoadingMetaMaterials &&
                metaMaterials.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={formErrors?.description ? true : false}
              id="description"
              label="Description"
              fullWidth
              value={newMaterial?.description}
              onChange={(e) => fieldChange("description", e.target.value)}
              helperText={formErrors?.description}
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

MaterialsForm.defaultProps = {
  open: false,
  handleModalClose: undefined,
  material: null,
  formMode: "new",
};
MaterialsForm.propTypes = {
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  material: PropTypes.object,
  formMode: PropTypes.string,
};

export default MaterialsForm;
