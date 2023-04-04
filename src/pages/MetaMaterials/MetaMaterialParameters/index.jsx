import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import TableToolBar from "../../../components/TableToolBar";
import CustomTableHead from "../../../components/CustomTableHead";
import RowActions from "../../../components/RowActions";
import Loading from "../../../components/Loading";

import MetaMaterialParametersForm from "./MetaMaterialParametersForm";

import { table } from "../../../utils";

import useMetaMaterialParameters from "../../../store/metaMaterialParameters";

const metaMaterialParametersTableFields = [
  {
    id: "key",
    fieldKey: "key",
    label: "Key",
  },
  {
    id: "value",
    fieldKey: "value",
    label: "Value (Default)",
  },
  {
    id: "texture",
    fieldKey: "texture",
    label: "Value (Texture)",
  },
  {
    id: "mapping",
    fieldKey: "mapping",
    label: "Value (Mapping)",
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
  },
];

const MetaMaterialParameters = ({ metaMaterialName }) => {
  const {
    metaMaterialParameters,
    loadMetaMaterialParameters,
    isLoading,
    setMetaMaterialParametersFilters,
    metaMaterialParametersFilter,
    deleteMetaMaterialParameters,
  } = useMetaMaterialParameters();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showForm, setShowForm] = useState(false);
  const [editMetaMaterialParameters, setEditMetaMaterialParameters] =
    useState(null);

  useEffect(() => {
    loadMetaMaterialParameters(metaMaterialName);
  }, [loadMetaMaterialParameters, metaMaterialName]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(metaMaterialParameters);
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

  // Avoid a layout jump when reaching the last page with empty metaMaterialParameters.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - metaMaterialParameters.length)
      : 0;

  const getFilteredMetaMaterialParameters = () =>
    table.filterData(metaMaterialParameters, metaMaterialParametersFilter);

  const getFilteredFields = () =>
    metaMaterialParametersTableFields.filter((field) => field.id !== "actions");

  return (
    <Paper
      sx={{
        width: "98%",
        marginTop: "18px",
        marginLeft: "10px",
        height: "99.5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ maxHeight: "78%" }}>
        <TableToolBar
          numSelected={selected.length}
          tableName={`${
            metaMaterialName ? "Meta Materia " + metaMaterialName : " "
          }`}
          onSelectedDelete={() =>
            deleteMetaMaterialParameters(selected, [
              handleSelectAllClick,
              () => loadMetaMaterialParameters(metaMaterialName),
            ])
          }
          showForm={() => {
            if (metaMaterialName) setShowForm(true);
          }}
        />
        <TableContainer sx={{ maxHeight: "47rem" }}>
          {!isLoading ? (
            <Table
              sx={{ minWidth: 750 }}
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
                rowCount={getFilteredMetaMaterialParameters()?.length}
                tableCells={metaMaterialParametersTableFields}
                setFilters={setMetaMaterialParametersFilters}
                filters={metaMaterialParametersFilter}
              />

              <TableBody>
                {table
                  .stableSort(
                    getFilteredMetaMaterialParameters(),
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
                          setEditMetaMaterialParameters(row);
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
                            sx={{ padding: "0px 22px 0px 5px" }}
                          >
                            {row[field.fieldKey]}
                          </TableCell>
                        ))}
                        <RowActions
                          onDelete={() =>
                            deleteMetaMaterialParameters(
                              [row],
                              [
                                () =>
                                  loadMetaMaterialParameters(metaMaterialName),
                              ]
                            )
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
            <Loading message="loading Meta Material Parameters..." />
          )}
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={getFilteredMetaMaterialParameters()?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showForm && (
        <MetaMaterialParametersForm
          open={showForm}
          handleModalClose={() => {
            setShowForm(false);
            setEditMetaMaterialParameters(null);
          }}
          metaMaterialName={metaMaterialName}
        />
      )}
    </Paper>
  );
};

MetaMaterialParameters.propTypes = {
  metaMaterialName: PropTypes.string.isRequired,
};

export default MetaMaterialParameters;
