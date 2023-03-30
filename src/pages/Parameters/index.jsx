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

import useParameters from "../../store/parameters";
import { table } from "../../utils";
import ParametersForm from "./ParametersForm";

const parametersTableFields = [
  {
    id: "name",
    fieldKey: "name",
    label: "Name",
    width: "13%",
  },
  {
    id: "ambient",
    isColor: true,
    fieldKey: "ambient",
    label: "Ambient",
  },
  {
    id: "diffuse",
    isColor: true,
    fieldKey: "diffuse",
    label: "Diffuse",
  },
  {
    id: "specular",
    isColor: true,
    fieldKey: "specular",
    label: "Specular",
  },
  {
    id: "emission",
    isColor: true,
    fieldKey: "emission",
    label: "Emission",
  },
  {
    id: "shininess",
    fieldKey: "shininess",
    label: "Shininess",
    isNumber: true,
  },
  {
    id: "transparency",
    fieldKey: "transparency",
    label: "Transparency",
    isNumber: true,
  },
  {
    id: "texture",
    fieldKey: "texture",
    label: "Texture",
    width: "13%",
  },
  {
    id: "mapping",
    fieldKey: "mapping",
    label: "Mapping",
    width: "13%",
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
  },
];

const Parameters = () => {
  const {
    parameters,
    isLoadingParameters,
    parametersFilter,
    loadParameters,
    setParametersFilters,
    deleteParameters,
  } = useParameters();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showForm, setShowForm] = useState(false);
  const [editParameter, setEditParameter] = useState(null);

  useEffect(() => {
    loadParameters();
  }, [loadParameters]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(parameters);
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

  // Avoid a layout jump when reaching the last page with empty materials.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - parameters.length) : 0;

  const getFilteredParameters = () =>
    table.filterData(parameters, parametersFilter);

  const getFilteredFields = () =>
    parametersTableFields.filter((field) => field.id !== "actions");

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
            tableName="Parameters"
            onSelectedDelete={() =>
              deleteParameters(selected, [handleSelectAllClick, loadParameters])
            }
            showForm={() => setShowForm(true)}
          />
          <TableContainer sx={{ maxHeight: "47rem" }}>
            {!isLoadingParameters ? (
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="Parameters"
                size={"medium"}
                stickyHeader
              >
                <CustomTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={getFilteredParameters()?.length}
                  tableCells={parametersTableFields}
                  setFilters={setParametersFilters}
                  filters={parametersFilter}
                />

                <TableBody>
                  {table
                    .stableSort(
                      getFilteredParameters(),
                      table.getComparator(order, orderBy)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditParameter(row);
                            setShowForm(true);
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
                          {getFilteredFields().map((field) => (
                            <TableCell
                              component="th"
                              key={field.id}
                              id={labelId}
                              scope="row"
                              width={field.width}
                              align={field.isNumber ? "right" : "left"}
                              sx={{ padding: "0px 22px 0px 5px" }}
                            >
                              {field?.isColor ? (
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Box
                                    bgcolor={row[field.fieldKey]}
                                    height={"14px"}
                                    width={"14px"}
                                    marginRight={"8px"}
                                    borderRadius={"2px"}
                                  ></Box>
                                  <Box>{row[field.fieldKey]}</Box>
                                </Box>
                              ) : (
                                row[field.fieldKey]
                              )}
                            </TableCell>
                          ))}

                          <RowActions
                            onEdit={() => {
                              setEditParameter(row);
                              setShowForm(true);
                            }}
                            onDelete={() => {
                              deleteParameters([row], [loadParameters]);
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
              <Loading message="loading parameters..." />
            )}
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={getFilteredParameters()?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {showForm && (
        <ParametersForm
          open={showForm}
          handleModalClose={() => {
            setShowForm(false);
            setEditParameter(null);
          }}
          fields={getFilteredFields()}
          parameters={editParameter}
          formMode={editParameter ? "edit" : "new"}
        />
      )}
    </Box>
  );
};

export default Parameters;
