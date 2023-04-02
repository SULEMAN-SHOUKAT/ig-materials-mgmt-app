import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "90%",
};

const FileViewer = ({ file }) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isZoom, setIsZoom] = useState(false);

  const handleImageLoad = () => {
    const img = new Image();
    img.src = file.data;
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      setImageDimensions({
        width: width,
        height: height,
      });
    };
  };

  useEffect(() => {
    if (file) handleImageLoad();
  }, [file]);

  const ShowBiggerImage = () => {
    return (
      <Modal
        open={isZoom}
        onClose={() => setIsZoom(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            height: imageDimensions.height,
            width: imageDimensions.width,
          }}
        >
          {file && (
            <CardMedia
              sx={{
                height: imageDimensions.height,
                width: imageDimensions.width,
              }}
              image={file.data}
              title={file.name}
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>
      </Modal>
    );
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Card
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {!file && (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              No File Selected
            </Typography>
          </CardContent>
        )}
        {file && (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {file?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dimensions:{" "}
              {`${imageDimensions.width} x ${imageDimensions.height}`} <br />
              Type: {file.type}
              <br />
              Size in KB : {Math.round(file.size / 1024)}
              <br />
              Created on : {file.createdAt}
            </Typography>
          </CardContent>
        )}
        {file && (
          <CardMedia
            onClick={() => setIsZoom(true)}
            sx={{ height: "40%", width: "100%" }}
            image={file.data}
            title={file.name}
            style={{ objectFit: "contain" }}
          />
        )}
      </Card>
      {isZoom && <ShowBiggerImage />}
    </Box>
  );
};

FileViewer.defaultProps = {
  file: undefined,
};
FileViewer.propTypes = {
  file: PropTypes.object,
};

export default FileViewer;
