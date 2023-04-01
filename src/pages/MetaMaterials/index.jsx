import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

import TableToolBar from "../../components/TableToolBar";
import CustomTableHead from "../../components/CustomTableHead";
import RowActions from "../../components/RowActions";
import Loading from "../../components/Loading";

import MetaMaterialsForm from "./MetaMaterialsForm";

import { table } from "../../utils";

import useMetaMaterial from "../../store/metaMaterial";
import MetaMaterialParameters from "./MetaMaterialParameters";

const metaMaterialsTableFields = [
  {
    id: "name",
    fieldKey: "name",
    label: "Name",
  },
  {
    id: "description",
    fieldKey: "description",
    label: "Description",
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
  },
];

const MetaMaterials = () => {
  const {
    metaMaterials,
    loadMetaMaterials,
    isLoading,
    setMetaMaterialsFilters,
    metaMaterialsFilter,
    deleteMetaMaterials,
  } = useMetaMaterial();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showForm, setShowForm] = useState(false);
  const [editMetaMaterial, setEditMetaMaterial] = useState(null);
  const [selectedForParameters, setSelectedForParameters] = useState("");

  useEffect(() => {
    loadMetaMaterials();
  }, [loadMetaMaterials]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(metaMaterials);
      return;
    }
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

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty metaMaterials.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - metaMaterials.length) : 0;

  const getFilteredMetaMaterials = () =>
    table.filterData(metaMaterials, metaMaterialsFilter);

  const getFilteredFields = () =>
    metaMaterialsTableFields.filter((field) => field.id !== "actions");

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
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
                tableName="Meta Materials"
                onSelectedDelete={async () => {
                  await deleteMetaMaterials(selected, [
                    handleSelectAllClick,
                    loadMetaMaterials,
                  ]);
                  setSelectedForParameters("");
                }}
                showForm={() => setShowForm(true)}
              />
              <TableContainer sx={{ maxHeight: "47rem" }}>
                {!isLoading ? (
                  <Table
                    aria-labelledby="Meta Materials"
                    size={"medium"}
                    stickyHeader
                  >
                    <CustomTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={getFilteredMetaMaterials()?.length}
                      tableCells={metaMaterialsTableFields}
                      setFilters={setMetaMaterialsFilters}
                      filters={metaMaterialsFilter}
                    />

                    <TableBody>
                      {table
                        .stableSort(
                          getFilteredMetaMaterials(),
                          table.getComparator(order, orderBy)
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row._id}
                              selected={
                                isItemSelected ||
                                selectedForParameters === row.name
                              }
                              sx={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedForParameters(row.name);
                              }}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleClick(event, row);
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
                                width={"40%"}
                                sx={{ padding: "0px 0px 0px 5px" }}
                              >
                                <Box width={"90%"}>{row.description}</Box>
                              </TableCell>
                              <RowActions
                                onEdit={() => {
                                  setEditMetaMaterial(row);
                                  setShowForm(true);
                                }}
                                onDelete={async () => {
                                  await deleteMetaMaterials(
                                    [row],
                                    [loadMetaMaterials]
                                  );
                                  setSelectedForParameters("");
                                }}
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
                  <Loading message="loading Meta Materials..." />
                )}
              </TableContainer>
            </Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={getFilteredMetaMaterials()?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {showForm && (
            <MetaMaterialsForm
              open={showForm}
              handleModalClose={() => {
                setShowForm(false);
                setEditMetaMaterial(null);
              }}
              fields={getFilteredFields()}
              metaMaterial={editMetaMaterial}
              formMode={editMetaMaterial ? "edit" : "new"}
            />
          )}
        </Grid>
        <Grid xs={7}>
          <MetaMaterialParameters
            metaMaterialName={
              selectedForParameters === ""
                ? metaMaterials[0]?.name
                : selectedForParameters
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MetaMaterials;
