import React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

import InputField from "./InputField";

const CustomTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  tableCells,
  setFilters,
  filters,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            sx={{ marginTop: "28px" }}
          />
        </TableCell>
        {tableCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== "actions" && (
              <Box>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>

                <InputField
                  id={headCell.id}
                  fieldKey={headCell.fieldKey}
                  type={headCell.type}
                  onValueChange={(fieldKey, value) =>
                    setFilters({ ...filters, [fieldKey]: value })
                  }
                  value={filters?.[headCell.fieldKey]}
                  size={"small"}
                  style={{ width: "90%", marginBottom: "2px" }}
                />
              </Box>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

CustomTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  tableCells: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default CustomTableHead;
