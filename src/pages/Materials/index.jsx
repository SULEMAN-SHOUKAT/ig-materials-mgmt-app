import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import TableToolBar from "../../components/TableToolBar";
import CustomTableHead from "../../components/CustomTableHead";
import RowActions from "../../components/RowActions";
import Loading from "../../components/Loading";

import { table } from "../../utils";

import useMaterials from "../../store/materials";

const materialsTableFields = [
  {
    id: "name",
    fieldKey: "name",
    type: "string",
    label: "Name",
  },
  {
    id: "description",
    fieldKey: "description",
    type: "string",
    label: "Description",
  },
  {
    id: "metaMaterial",
    fieldKey: "metaMaterial",
    type: "string",
    label: "Meta Material",
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
    type: null,
  },
];

const MaterialsTable = () => {
  const {
    materials,
    loadMaterials,
    isLoading,
    setMaterialsFilters,
    materialsFilter,
    deleteMaterials,
  } = useMaterials();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(materials);
      return;
    }
    console.log("selected det sss");
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(selected);

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty materials.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - materials.length) : 0;

  const getFilteredMaterials = () =>
    table.filterData(materials, materialsFilter);

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
          <TableToolBar
            numSelected={selected.length}
            tableName="Materials"
            onSelectedDelete={() =>
              deleteMaterials(selected, [handleSelectAllClick, loadMaterials])
            }
          />
          <TableContainer sx={{ maxHeight: "47rem" }}>
            {!isLoading ? (
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="Materials"
                size={"medium"}
                stickyHeader
              >
                <CustomTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={getFilteredMaterials()?.length}
                  tableCells={materialsTableFields}
                  setFilters={setMaterialsFilters}
                  filters={materialsFilter}
                />

                <TableBody>
                  {table
                    .stableSort(
                      getFilteredMaterials(),
                      table.getComparator(order, orderBy)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ padding: "0px 0px 0px 5px" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="left"
                            width={"60%"}
                            sx={{ padding: "0px 0px 0px 5px" }}
                          >
                            <Box width={"90%"}>{row.description}</Box>
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ padding: "0px 0px 0px 5px" }}
                          >
                            {row.metaMaterial}
                          </TableCell>
                          <RowActions
                            row={row}
                            onEdit={() => console.log("edit")}
                            onDelete={() =>
                              deleteMaterials([row], [loadMaterials])
                            }
                          />
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ) : (
              <Loading message="loading materials..." />
            )}
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={getFilteredMaterials()?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default MaterialsTable;
