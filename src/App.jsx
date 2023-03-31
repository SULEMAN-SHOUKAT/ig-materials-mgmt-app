import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Grid from "@mui/material/Grid";

import NavBar from "./Layout/NavBar";
import Header from "./Layout/Header";
import Toast from "./components/Toast";

import Materials from "./pages/Materials";
import Parameters from "./pages/Parameters";
import Texture from "./pages/Texture";
import Mappings from "./pages/Mappings";

import "./App.css";

function MetaMaterials() {
  return <h1>meta-materials</h1>;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Materials />,
  },
  {
    path: "/parameters",
    element: <Parameters />,
  },
  {
    path: "/textures",
    element: <Texture />,
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
          <Grid item xs={2} marginTop={8}>
            <NavBar />
          </Grid>
        )}
        <Grid item xs={showNavBar ? 10 : 12} marginTop={8}>
          <RouterProvider router={router} />
        </Grid>
      </Grid>
      <Toast />
    </>
  );
};

export default App;
