import React, { useState } from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import AlertDialog from "./AlertDialog";

const RowActions = ({ onEdit, onDelete }) => {
  console.log(onDelete);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  return (
    <TableCell align="left" padding="none">
      <Stack direction={"row"}>
        {onEdit && (
          <IconButton
            onClick={onEdit}
            sx={{ color: "#3582d6a8", fontSize: "16px" }}
          >
            <EditIcon />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setShowAlertDialog(true);
            }}
            sx={{ color: "#d54565a8", fontSize: "16px" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <AlertDialog
        open={showAlertDialog}
        message={"Are you sure you wanted to delete records"}
        handleDialogClose={() => setShowAlertDialog(false)}
        onPositiveResponse={() => {
          onDelete();
          setShowAlertDialog(false);
        }}
      />
    </TableCell>
  );
};

RowActions.prototype = {
  onEdit: PropTypes.object,
  onDelete: PropTypes.object,
};

RowActions.defaultProps = {
  onEdit: undefined,
  onDelete: undefined,
};

export default RowActions;
