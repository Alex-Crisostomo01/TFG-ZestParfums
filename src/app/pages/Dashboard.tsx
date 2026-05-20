import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { Header } from "../components/Header";

export default function Dashboard() {
  const isAdmin = localStorage.getItem("isAdmin") === "1";
  const userEmail = localStorage.getItem("userEmail") || "Usuario";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={() => {}} searchValue="" />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-semibold mb-3">
            Bienvenido, {userEmail}
          </h1>
          <p className="text-gray-600 mb-6">
            {isAdmin
              ? "Estás en tu espacio administrativo. Puedes gestionar productos y marcas desde el panel de control."
              : "Puedes navegar el catálogo y revisar productos. Si necesitas editar tu perfil, utiliza el área de usuario."}
          </p>

          {isAdmin ? (
            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-white font-semibold hover:bg-amber-700 transition-colors"
            >
              Ir al panel de administración
            </Link>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-700">
                Si quieres volver al catálogo, haz clic en el botón inferior.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Ver catálogo
              </Link>
            </div>
          )}

          <button
            onClick={authService.logout}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
