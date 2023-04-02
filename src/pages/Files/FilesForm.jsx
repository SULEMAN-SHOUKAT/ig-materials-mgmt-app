import React, { useState } from "react";
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

import fileHelper from "./helper";
import { isObjectEmpty } from "../../utils";

import useFiles from "../../store/files";

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

const modeOptions = [
  {
    value: "standard",
    label: "Standard",
  },
  {
    value: "norm_std",
    label: "Norm_Std",
  },
  {
    value: "preview",
    label: "Preview",
  },
];

const prepareInitialFileValue = () => ({
  mode: "",
  image: undefined,
});

const FilesForm = ({ open, handleModalClose, source, name }) => {
  const { loadFiles, addFile } = useFiles();

  const [newFile, setNewFile] = useState(prepareInitialFileValue());
  const [formErrors, setFormErrors] = useState({});

  const fieldChange = async (fieldKey, value) => {
    setNewFile({ ...newFile, [fieldKey]: value });
    const error = fileHelper.validateFileField(value, fieldKey);
    setFormErrors({ ...formErrors, [fieldKey]: error });
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setNewFile({ ...newFile, image: file, fileName: file.name });
    const error = fileHelper.validateFileField(file, "image");
    setFormErrors({ ...formErrors, image: error });
  };

  const handleSave = () => {
    const errors = fileHelper.validateFile(newFile);
    if (!isObjectEmpty(errors)) {
      setFormErrors(errors);
      return;
    } else {
      const formData = new FormData();
      formData.append("image", newFile.image);
      formData.append("mode", newFile.mode);
      formData.append("name", name);
      addFile(source, formData, [() => loadFiles(source, name)]);
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
            File Form
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
          <Grid item xs={12}>
            <TextField
              error={formErrors?.mode ? true : false}
              id="mode"
              label="Mode/Resolution"
              fullWidth
              select
              value={newFile?.mode}
              onChange={(e) => fieldChange("mode", e.target.value)}
              helperText={formErrors?.mode}
            >
              {modeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={formErrors?.image ? true : false}
              id="image"
              fullWidth
              type="file"
              inputProps={{ accept: ".jpg,.jpeg,.png,.gif" }}
              onChange={onFileChange}
              helperText={formErrors?.image}
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

FilesForm.defaultProps = {
  open: false,
  handleModalClose: undefined,
};
FilesForm.propTypes = {
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FilesForm;
