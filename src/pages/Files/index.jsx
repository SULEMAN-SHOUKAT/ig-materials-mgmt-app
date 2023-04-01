import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import FilesSourceTable from "./FilesSourceTable";
import FilesTable from "./FilesTable";

import useMaterials from "../../store/materials";
import useTexture from "../../store/texture";

const Files = () => {
  const { materials, loadMaterials, setMaterialsFilters, materialsFilter } =
    useMaterials();
  const { textures, loadTextures, setTexturesFilters, texturesFilter } =
    useTexture();
  const [source, setSource] = useState("textures");
  const [selectedSource, setSelectedSource] = useState({ name: "", table: "" });

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
      <Grid container spacing={3} sx={{ width: "100%", height: "100%" }}>
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
            }}
            selectedTable={source}
            setFilter={onFilterUpdate}
            tableData={getTableData()}
            setSelectedSource={setSelectedSource}
            selectedSource={selectedSource}
          />
        </Grid>
        <Grid item xs={5}>
          <FilesTable source={source} name={selectedSource.name} />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default Files;
