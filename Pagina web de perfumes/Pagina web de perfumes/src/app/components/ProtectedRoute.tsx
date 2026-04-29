import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// Componente guardián para rutas que requieren ser ADMIN
// Uso: envuelve el componente de la ruta en routes.ts
// Ejemplo: <ProtectedRoute><AdminPage /></ProtectedRoute>
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();

  // Si no hay sesión activa → redirige al login
  if (!user) return <Navigate to="/login" replace />;

  // Si hay sesión pero el rol no es ADMIN → redirige a la tienda
  if (!isAdmin()) return <Navigate to="/" replace />;

  // Si pasa los dos filtros, renderiza el componente hijo normalmente
  return <>{children}</>;
}
