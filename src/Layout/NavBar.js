import React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Home from "@mui/icons-material/Home";
import ViewInAr from "@mui/icons-material/ViewInAr";
import Settings from "@mui/icons-material/Settings";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import Texture from "@mui/icons-material/Texture";
import Info from "@mui/icons-material/Info";

const data = [
  { icon: <ViewInAr />, label: "Materials" },
  { icon: <Settings />, label: "Parameters" },
  { icon: <Texture />, label: "Textures" },
  { icon: <ThreeDRotationIcon />, label: "Mappings" },
  { icon: <Info />, label: "Meta Materials" },
];

const links = {
  Materials: "/",
  Parameters: "/parameters",
  Textures: "/textures",
  Mappings: "/mappings",
  "Meta Materials": "/meta-materials",
};

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const navigateTo = (url) => {
  window.location.href = url;
};

const NavBar = () => {
  return (
    <Box height={"100%"} style={{ borderRadius: "1px", border: "none" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "light",
            primary: { main: "rgb(255,255,255)" },
            background: { paper: "rgb(255,255,255)" },
          },
        })}
      >
        <Paper elevation={0} style={{ height: "100%" }}>
          <FireNav component="nav" disablePadding height={"100%"}>
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="black" />
                </ListItemIcon>
                <ListItemText
                  primary="IG. Material Mgmt App"
                  primaryTypographyProps={{
                    color: "black",
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: "rgb(255,255,255)",
                pb: 2,
              }}
            >
              {data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{
                    py: 0.6,
                    minHeight: 32,
                  }}
                  onClick={() => navigateTo(links[item.label])}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default NavBar;
