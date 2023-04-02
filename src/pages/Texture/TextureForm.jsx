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

import TextureHelper from "./helper";
import { isObjectEmpty } from "../../utils";

import useTexture from "../../store/texture";

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

const prepareInitialTextureValue = (material) => ({
  name: material?.name || "",
  description: material?.description || "",
});

const TexturesForm = ({ open, handleModalClose, texture, formMode }) => {
  const { createTexture, loadTextures, editTexture, textures } = useTexture();

  const [newTexture, setNewTexture] = useState(
    prepareInitialTextureValue(texture)
  );
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadTextures();
  }, [loadTextures]);

  const fieldChange = async (fieldKey, value) => {
    setNewTexture({ ...newTexture, [fieldKey]: value });
    const error = TextureHelper.validateTextureField(
      value,
      fieldKey,
      textures,
      formMode
    );
    setFormErrors({ ...formErrors, [fieldKey]: error });
  };

  const handleSave = () => {
    const errors = TextureHelper.validateTexture(
      newTexture,
      textures,
      formMode
    );
    if (!isObjectEmpty(errors)) {
      setFormErrors(errors);
      return;
    } else {
      if (formMode === "new") createTexture(newTexture, [loadTextures]);
      if (formMode === "edit")
        editTexture(texture.name, newTexture, [loadTextures]);
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
            Texture Form
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
              value={newTexture?.name}
              onChange={(e) => fieldChange("name", e.target.value)}
              helperText={formErrors?.name}
              disabled={formMode === "edit" ? true : false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={formErrors?.description ? true : false}
              id="description"
              label="Description"
              fullWidth
              value={newTexture?.description}
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

TexturesForm.defaultProps = {
  open: false,
  handleModalClose: undefined,
  texture: null,
  formMode: "new",
};
TexturesForm.propTypes = {
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  texture: PropTypes.object,
  formMode: PropTypes.string,
};

export default TexturesForm;
