import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./components/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import PerfumeRecommender from "./pages/PerfumeRecommender";
import Wishlist from "./pages/Wishlist";

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
    path: "/about",
    Component: About,
  },
  {
    path: "/recommender",
    Component: PerfumeRecommender,
  },
  {
    path: "/favorites",
    Component: Wishlist,
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
