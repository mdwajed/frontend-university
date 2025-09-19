import { createBrowserRouter } from "react-router";
import App from "../App";
import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import routeGenerator from "../utils/routeGenerator";
import { adminPaths } from "./adminRoutes";
import { facultyPaths } from "./facultyRoutes ";
import ProtectedRoutes from "./ProtectedRoutes";
import { studentPaths } from "./studentPaths";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoutes role="faculty">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoutes role="student">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);
export default router;
