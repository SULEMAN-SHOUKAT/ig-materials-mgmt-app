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

import TableToolBar from "../../components/TableToolBar";
import CustomTableHead from "../../components/CustomTableHead";
import RowActions from "../../components/RowActions";
import Loading from "../../components/Loading";

import MappingsForm from "./MappingsForm";

import { table } from "../../utils";

import useMappings from "../../store/mappings";

const colGroups = [
  {
    label: "Mapping",
    colSpan: 3,
  },
  {
    label: "Offset",
    colSpan: 3,
  },
  {
    label: "Scale IG.GFX",
    colSpan: 2,
  },
  {
    label: "Scale Blender",
    colSpan: 2,
  },
  {
    label: "",
    reason: "empty label because of action colummn",
  },
];
const mappingsTableFields = [
  {
    id: "name",
    fieldKey: "name",
    label: "Name",
    width: "11%",
  },
  {
    id: "description",
    fieldKey: "description",
    label: "Description",
    width: "23%",
  },
  {
    id: "translationS",
    fieldKey: "translationS",
    label: "Trans S (0.0) {}",
    headerFontSize: "10px",
    width: "9%",
    isNumber: true,
  },
  {
    id: "translationT",
    headerFontSize: "10px",
    fieldKey: "translationT",
    label: "Trans T (0.0) {}",
    width: "9%",
    isNumber: true,
  },
  {
    id: "rotation",
    fieldKey: "rotation",
    label: "Rot (0.0 D) {}",
    headerFontSize: "10px",
    width: "9%",
    isNumber: true,
  },
  {
    id: "scaleS",
    fieldKey: "scaleS",
    label: "Scale S (1.0) {}",
    headerFontSize: "10px",
    width: "9%",
    isNumber: true,
  },
  {
    id: "scaleT",
    fieldKey: "scaleT",
    label: "Scale T (1.0) {}",
    headerFontSize: "10px",
    width: "9%",
    isNumber: true,
  },
  {
    id: "repeatS",
    fieldKey: "repeatS",
    label: "Repeat S (1.0)",
    headerFontSize: "10px",
    width: "9%",
    isNumber: true,
  },
  {
    id: "repeatT",
    fieldKey: "repeatT",
    label: "Repeat T (1.0)",
    headerFontSize: "10px",
    width: "9%",
    isNumber: true,
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
  },
];

const Mappings = () => {
  const {
    mappings,
    isLoadingMappings,
    mappingsFilter,
    loadMappings,
    setMappingsFilters,
    deleteMappings,
  } = useMappings();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showForm, setShowForm] = useState(false);
  const [editMapping, setEditMapping] = useState(null);

  useEffect(() => {
    loadMappings();
  }, [loadMappings]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(mappings);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mappings.length) : 0;

  const getFilteredMappings = () => table.filterData(mappings, mappingsFilter);

  const getFilteredFields = () =>
    mappingsTableFields.filter((field) => field.id !== "actions");

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
            tableName="Mappings"
            onSelectedDelete={() =>
              deleteMappings(selected, [handleSelectAllClick, loadMappings])
            }
            showForm={() => setShowForm(true)}
          />
          <TableContainer sx={{ maxHeight: "47rem" }}>
            {!isLoadingMappings ? (
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="Mappings"
                size={"medium"}
                stickyHeader
              >
                <CustomTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={getFilteredMappings()?.length}
                  tableCells={mappingsTableFields}
                  setFilters={setMappingsFilters}
                  filters={mappingsFilter}
                  colGroups={colGroups}
                />

                <TableBody>
                  {table
                    .stableSort(
                      getFilteredMappings(),
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
                            setEditMapping(row);
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
                              sx={{
                                padding: "0px 22px 0px 5px",
                                width: field.isNumber ? "77px" : "",
                                textAlign: !field.isNumber ? "justify" : "",
                              }}
                            >
                              {row[field.fieldKey]}
                            </TableCell>
                          ))}

                          <RowActions
                            onEdit={() => {
                              setEditMapping(row);
                              setShowForm(true);
                            }}
                            onDelete={() => {
                              deleteMappings([row], [loadMappings]);
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
              <Loading message="loading mappings..." />
            )}
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={getFilteredMappings()?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {showForm && (
        <MappingsForm
          open={showForm}
          handleModalClose={() => {
            setShowForm(false);
            setEditMapping(null);
          }}
          fields={getFilteredFields()}
          mappings={editMapping}
          formMode={editMapping ? "edit" : "new"}
        />
      )}
    </Box>
  );
};

export default Mappings;
