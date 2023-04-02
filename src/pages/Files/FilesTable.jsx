import React, { useEffect, useState } from "react";
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

import TableToolBar from "../../components/TableToolBar";
import CustomTableHead from "../../components/CustomTableHead";
import RowActions from "../../components/RowActions";
import Loading from "../../components/Loading";

import FilesForm from "./FilesForm";

import useFiles from "../../store/files";
import { table } from "../../utils";

const filesTableFields = [
  {
    id: "mode",
    fieldKey: "mode",
    label: "Mode/Resolution ",
  },
  {
    id: "type",
    fieldKey: "type",
    label: "Format",
  },
  {
    id: "size",
    fieldKey: "size",
    label: "Size (Kb)",
    isNumber: "true",
  },
  {
    id: "actions",
    fieldKey: null,
    label: null,
  },
];

const sourcelabel = {
  materials: "Material",
  textures: "Texture",
};
const FilesTable = ({ source, name, setSelectedFile, selectedFile }) => {
  const {
    files,
    isLoadingFiles,
    filesFilters,
    loadFiles,
    setFilesFilters,
    deleteFiles,
  } = useFiles();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (name) {
      loadFiles(source, name);
    }
  }, [loadFiles, source, name]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      setSelected(files);
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

  // Avoid a layout jump when reaching the last page with empty files.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0;

  const getFilteredFiles = () => table.filterData(files, filesFilters);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ maxHeight: "78%" }}>
          <TableToolBar
            numSelected={selected.length}
            tableName={`${sourcelabel[source]} ${name}`}
            onSelectedDelete={() => {
              deleteFiles(source, name, selected, [
                handleSelectAllClick,
                () => loadFiles(source, name),
              ]);
              setSelectedFile(undefined);
            }}
            showForm={() => setShowForm(true)}
          />
          <TableContainer sx={{ maxHeight: "47rem" }}>
            {!isLoadingFiles ? (
              <Table
                sx={{ minWidth: 100 }}
                aria-labelledby="Files"
                size={"medium"}
                stickyHeader
              >
                <CustomTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={getFilteredFiles()?.length}
                  tableCells={filesTableFields}
                  setFilters={setFilesFilters}
                  filters={filesFilters}
                />

                <TableBody>
                  {table
                    .stableSort(
                      getFilteredFiles(),
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
                          selected={
                            isItemSelected || selectedFile?._id === row._id
                          }
                          sx={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(row);
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
                            {row.mode}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ padding: "0px 0px 0px 5px" }}
                          >
                            <Box>{row.type}</Box>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ padding: "0px 10px 0px 5px" }}
                          >
                            <Box>{Math.round(row.size / 1024)}</Box>
                          </TableCell>
                          <RowActions
                            onDelete={() => {
                              deleteFiles(
                                source,
                                name,
                                [row],
                                [() => loadFiles(source, name)]
                              );
                              if (selectedFile?._id === row._id)
                                setSelectedFile(undefined);
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
              <Loading message="loading files..." />
            )}
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={getFilteredFiles()?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {showForm && (
        <FilesForm
          open={showForm}
          handleModalClose={() => {
            setShowForm(false);
          }}
          source={source}
          name={name}
        />
      )}
    </Box>
  );
};

FilesTable.defaultProps = {
  selectedFile: undefined,
  name: undefined,
};

FilesTable.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string,
  setSelectedFile: PropTypes.func.isRequired,
  selectedFile: PropTypes.object,
};

export default FilesTable;
