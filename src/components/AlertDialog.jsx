import React from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "10px",
  width: "30rem",
};

const AlertDialog = ({
  open,
  handleDialogClose,
  message,
  onPositiveResponse,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style} variant="outlined">
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onPositiveResponse();
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              handleDialogClose();
            }}
          >
            No
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

AlertDialog.defaultProps = {
  open: false,
  handleModalClose: undefined,
  onPositiveResponse: undefined,
  message: "",
};
AlertDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  onPositiveResponse: PropTypes.func,
  message: PropTypes.string,
};

export default AlertDialog;
