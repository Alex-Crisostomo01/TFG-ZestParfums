import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./components/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    element: createElement(ProtectedRoute),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/admin",
    element: createElement(ProtectedRoute, { adminOnly: true }),
    children: [
      {
        index: true,
        Component: AdminPanel,
      },
    ],
  },
]);
