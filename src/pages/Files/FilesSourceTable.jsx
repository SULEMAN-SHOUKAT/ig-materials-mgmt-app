import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import MenuItem from "@mui/material/MenuItem";

import { table } from "../../utils";

const filesTableOptions = [
  { value: "textures", label: "Textures" },
  { value: "materials", label: "Materials" },
];

const FilesSourceTable = ({
  tableData,
  onTableChange,
  filters,
  setFilter,
  selectedTable,
  setSelectedSource,
  selectedSource,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getFilteredData = () => table.filterData(tableData, filters);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ maxHeight: "78%" }}>
          <TextField
            id="metaMaterial"
            fullWidth
            select
            size="small"
            value={selectedTable}
            onChange={(e) => onTableChange(e.target.value)}
          >
            {filesTableOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TableContainer sx={{ maxHeight: "47rem" }}>
            <Table
              sx={{ minWidth: 200 }}
              aria-labelledby="Data"
              size={"medium"}
              stickyHeader
            >
              <TableHead
                sx={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2.6px" }}
              >
                <TableRow>
                  <TableCell
                    align={"left"}
                    sortDirection={order}
                    sx={{
                      borderRight: "1px solid #e0e0e0",
                      borderTop: "1px solid #e0e0e0",
                      borderBottom: "1px solid #e0e0e0",
                      padding: "0px 0px 0px 0px",
                      backgroundColor: "#F2F2F2",
                    }}
                  >
                    <Box>
                      <TableSortLabel
                        direction={order}
                        onClick={createSortHandler("name")}
                        sx={{
                          borderBottom: "1px solid #e0e0e0",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            padding: "8px 8px 0px 8px",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          Name
                        </Box>

                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      </TableSortLabel>

                      <TextField
                        size={"small"}
                        value={filters?.name}
                        id={"name"}
                        onChange={(e) => setFilter("name", e.target.value)}
                        inputProps={{ style: { backgroundColor: "white" } }}
                        sx={{
                          width: "97%",
                          marginTop: "10px",
                          marginLeft: "4px",
                          marginBottom: "2px",
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table
                  .stableSort(
                    getFilteredData(),
                    table.getComparator(order, orderBy)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                        selected={selectedSource.name === row.name}
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSource({
                            name: row.name,
                            table: selectedTable,
                          });
                        }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          sx={{ padding: "8px 0px 8px 8px", fontSize: "14px" }}
                        >
                          {row.name}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={getFilteredData()?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

FilesSourceTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  selectedTable: PropTypes.string.isRequired,
  setSelectedSource: PropTypes.func.isRequired,
  selectedSource: PropTypes.object.isRequired,
};

export default FilesSourceTable;
