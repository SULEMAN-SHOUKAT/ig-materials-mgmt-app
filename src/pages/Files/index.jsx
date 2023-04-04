import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import FilesSourceTable from "./FilesSourceTable";
import FilesTable from "./FilesTable";
import FileViewer from "./FileViewer";

import useMaterials from "../../store/materials";
import useTexture from "../../store/texture";

const Files = () => {
  const { materials, loadMaterials, setMaterialsFilters, materialsFilter } =
    useMaterials();
  const { textures, loadTextures, setTexturesFilters, texturesFilter } =
    useTexture();
  const [source, setSource] = useState("textures");
  const [selectedSource, setSelectedSource] = useState({ name: "", table: "" });
  const [selectedFile, setSelectedFile] = useState(undefined);

  useEffect(() => {
    loadMaterials();
    loadTextures();
  }, [loadMaterials, loadTextures]);

  const getTableData = () => (source === "textures" ? textures : materials);

  const getFilters = () =>
    source === "textures" ? texturesFilter : materialsFilter;

  const onFilterUpdate = (key, value) => {
    if (source === "textures") {
      setTexturesFilters({ ...texturesFilter, [key]: value });
    } else {
      setMaterialsFilters({ ...materialsFilter, [key]: value });
    }
  };

  return (
    <Box sx={{ width: "100%", height: "102%" }}>
      <Grid container spacing={3} sx={{ width: "100%", height: "101%" }}>
        <Grid item xs={3}>
          <FilesSourceTable
            filters={getFilters()}
            onTableChange={(value) => {
              setSource(value);
              setSelectedSource({
                name:
                  value === "textures" ? textures[0]?.name : materials[0]?.name,
                source: value,
              });
              setSelectedFile(undefined);
            }}
            selectedTable={source}
            setFilter={onFilterUpdate}
            tableData={getTableData()}
            setSelectedSource={(src) => {
              setSelectedSource(src);
              setSelectedFile(undefined);
            }}
            selectedSource={selectedSource}
          />
        </Grid>
        <Grid item xs={4}>
          <FilesTable
            source={source}
            name={
              selectedSource.name === ""
                ? textures[0]?.name
                : selectedSource.name
            }
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
        </Grid>
        <Grid item xs={5}>
          <FileViewer file={selectedFile} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Files;
