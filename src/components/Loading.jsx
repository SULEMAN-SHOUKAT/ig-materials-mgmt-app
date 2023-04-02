import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "10rem",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "6rem",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
