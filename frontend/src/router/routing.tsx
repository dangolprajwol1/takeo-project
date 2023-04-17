import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddTask from "../components/addTask";
import Login from "../components/login";
import Register from "../components/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "/addtask",
    element: <AddTask />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
