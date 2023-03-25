import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Button from "@mui/material/Button";

function Home() {
  return <Button variant="contained">Hello World</Button>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
