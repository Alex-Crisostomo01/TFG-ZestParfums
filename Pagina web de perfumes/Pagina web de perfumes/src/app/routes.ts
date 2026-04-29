import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { createElement } from "react";

// Definición de todas las rutas de la aplicación
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,           // Página principal con catálogo
  },
  {
    path: "/product/:id",
    Component: ProductDetail,  // Detalle de un perfume (id dinámico)
  },
  {
    path: "/login",
    Component: LoginPage,      // Formulario de login y registro
  },
  {
    path: "/admin",
    // ProtectedRoute comprueba que el usuario esté logueado Y sea ADMIN
    // Si no cumple, redirige automáticamente (ver ProtectedRoute.tsx)
    element: createElement(ProtectedRoute, null, createElement(AdminPage)),
  },
]);
