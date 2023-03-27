import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import NavBar from "./Layout/NavBar";
import Header from "./Layout/Header";

import "./App.css";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "98%",
}));

function Home() {
  return <h1>home</h1>;
}
function Parameters() {
  return <h1>params</h1>;
}
function Textures() {
  return <h1>texture</h1>;
}

function Mappings() {
  return <h1>mappings</h1>;
}
function MetaMaterials() {
  return <h1>meta-materials</h1>;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/parameters",
    element: <Parameters />,
  },
  {
    path: "/textures",
    element: <Textures />,
  },
  {
    path: "/mappings",
    element: <Mappings />,
  },
  {
    path: "/meta-materials",
    element: <MetaMaterials />,
  },
]);

const App = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  return (
    <>
      <Header toggleNavBar={() => setShowNavBar(!showNavBar)} />
      <Grid container spacing={2} style={{ height: "100vh" }}>
        {showNavBar && (
          <Grid item xs={3} marginTop={8}>
            <NavBar />
          </Grid>
        )}
        <Grid item xs={showNavBar ? 9 : 12} marginTop={8}>
          <Item>
            <RouterProvider router={router} />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
