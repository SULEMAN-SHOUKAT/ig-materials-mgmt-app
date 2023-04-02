import React, { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

import AlertDialog from "./AlertDialog";

const TableToolBar = ({
  numSelected,
  tableName,
  onSelectedDelete,
  showForm,
}) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableName}
        </Typography>
      )}

      {numSelected > 0 && onSelectedDelete ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => setShowAlertDialog(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add new item">
          <IconButton onClick={showForm}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      <AlertDialog
        open={showAlertDialog}
        message={"Are you sure you wanted to delete records"}
        handleDialogClose={() => setShowAlertDialog(false)}
        onPositiveResponse={() => {
          onSelectedDelete();
          setShowAlertDialog(false);
        }}
      />
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tableName: PropTypes.string.isRequired,
  onSelectedDelete: PropTypes.func,
  showForm: PropTypes.func.isRequired,
};

TableToolBar.defaultProps = {
  onSelectedDelete: undefined,
};

export default TableToolBar;
