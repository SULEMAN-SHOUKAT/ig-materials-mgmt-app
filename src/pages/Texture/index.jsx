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

import TexturesForm from "./TextureForm";

import { table } from "../../utils";

import useTexture from "../../store/texture";

const TextureTableFields = [
  {
    id: "name",
    fieldKey: "name",
    label: "Name",
    width: "20%",
  },
  {
    id: "description",
    fieldKey: "description",
    label: "Description",
    width: "70%",
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
  },
];

const Texture = () => {
  const {
    textures,
    loadTextures,
    isLoading,
    setTexturesFilters,
    texturesFilter,
    deleteTextures,
  } = useTexture();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showForm, setShowForm] = useState(false);
  const [editTexture, setEditTexture] = useState(null);

  useEffect(() => {
    loadTextures();
  }, [loadTextures]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(textures);
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

  // Avoid a layout jump when reaching the last page with empty textures.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - textures.length) : 0;

  const getFilteredTextures = () => table.filterData(textures, texturesFilter);

  const getFilteredFields = () =>
    TextureTableFields.filter((field) => field.id !== "actions");

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
            tableName="Textures"
            onSelectedDelete={() =>
              deleteTextures(selected, [handleSelectAllClick, loadTextures])
            }
            showForm={() => setShowForm(true)}
          />
          <TableContainer sx={{ maxHeight: "47rem" }}>
            {!isLoading ? (
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="Textures"
                size={"medium"}
                stickyHeader
              >
                <CustomTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={getFilteredTextures()?.length}
                  tableCells={TextureTableFields}
                  setFilters={setTexturesFilters}
                  filters={texturesFilter}
                />

                <TableBody>
                  {table
                    .stableSort(
                      getFilteredTextures(),
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
                            setEditTexture(row);
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
                          <RowActions
                            onEdit={() => {
                              setEditTexture(row);
                              setShowForm(true);
                            }}
                            onDelete={() =>
                              deleteTextures([row], [loadTextures])
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
              <Loading message="loading textures..." />
            )}
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={getFilteredTextures()?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {showForm && (
        <TexturesForm
          open={showForm}
          handleModalClose={() => {
            setShowForm(false);
            setEditTexture(null);
          }}
          fields={getFilteredFields()}
          texture={editTexture}
          formMode={editTexture ? "edit" : "new"}
        />
      )}
    </Box>
  );
};

export default Texture;
