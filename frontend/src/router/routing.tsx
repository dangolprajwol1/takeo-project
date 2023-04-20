import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddTask from "../components/addTask";
import Login from "../components/login";
import Register from "../components/register";
import ProtectedPage from "../components/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPage>
        <App />
      </ProtectedPage>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedPage>
        <App />
      </ProtectedPage>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedPage>
        <App />
      </ProtectedPage>
    ),
  },
  {
    path: "/addtask",
    element: (
      <ProtectedPage>
        <AddTask />
      </ProtectedPage>
    ),
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
