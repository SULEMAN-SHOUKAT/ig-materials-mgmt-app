import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Grid from "@mui/material/Grid";

import NavBar from "./Layout/NavBar";
import Header from "./Layout/Header";
import Toast from "./components/Toast";

import Materials from "./pages/Materials";
import Parameters from "./pages/Parameters";
import Texture from "./pages/Texture";
import Mappings from "./pages/Mappings";
import MetaMaterials from "./pages/MetaMaterials";
import Files from "./pages/Files";

import "./App.css";

const App = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  return (
    <Router>
      <Header toggleNavBar={() => setShowNavBar(!showNavBar)} />
      <Grid container spacing={2} style={{ height: "100vh" }}>
        {showNavBar && (
          <Grid item xs={2} marginTop={8}>
            <NavBar />
          </Grid>
        )}
        <Grid item xs={showNavBar ? 10 : 12} marginTop={8}>
          <Routes>
            <Route path="/" element={<Materials />} />
            <Route path="/parameters" element={<Parameters />} />
            <Route path="/textures" element={<Texture />} />
            <Route path="/mappings" element={<Mappings />} />
            <Route path="/meta-materials" element={<MetaMaterials />} />
            <Route path="/files" element={<Files />} />
          </Routes>
        </Grid>
      </Grid>
      <Toast />
    </Router>
  );
};

export default App;
