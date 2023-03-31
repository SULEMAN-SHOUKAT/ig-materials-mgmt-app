import React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import "./CustomTableHead.css";

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
  colGroups,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2.6px" }}>
      {colGroups && (
        <TableRow>
          {colGroups.map((groupCol) => (
            <TableCell
              key={groupCol.label}
              align="center"
              colSpan={groupCol.colSpan}
              sx={{
                borderRight: "1px solid #e0e0e0",
                borderTop: "1px solid #e0e0e0",
                padding: "2px 0px 2px 0px",
                backgroundColor: "#F2F2F2",
              }}
            >
              {groupCol.label}
            </TableCell>
          ))}
        </TableRow>
      )}
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            backgroundColor: "#F2F2F2",
            borderRight: "1px solid #e0e0e0",
            borderTop: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
              style: { backgroundColor: "white" },
            }}
            sx={{ marginTop: "28px" }}
          />
        </TableCell>
        {tableCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            width={headCell.width}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderRight: "1px solid #e0e0e0",
              borderTop: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              padding: "0px 0px 0px 0px",
              backgroundColor: "#F2F2F2",
            }}
          >
            {headCell.id !== "actions" && (
              <Box>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    fontSize: headCell.headerFontSize,
                    borderBottom: "1px solid #e0e0e0",
                    width: "100%",
                  }}
                >
                  <Box sx={{ padding: "0px 0px 0px 2px" }}>
                    {headCell.label}
                  </Box>
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>

                <TextField
                  size={"small"}
                  value={filters?.[headCell.fieldKey]}
                  id={headCell.id}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      [headCell.fieldKey]: e.target.value,
                    })
                  }
                  inputProps={{ style: { backgroundColor: "white" } }}
                  sx={{
                    width: "97%",
                    marginTop: "10px",
                    marginLeft: "2px",
                  }}
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
  colGroups: PropTypes.array,
};
CustomTableHead.defaultProps = {
  colGroups: undefined,
};
export default CustomTableHead;
