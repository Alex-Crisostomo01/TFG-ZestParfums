import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Controlamos si estamos en modo login o registro con un mismo formulario
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle ojo contraseña

  // Un único objeto de estado para todos los campos del formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        toast.success("¡Bienvenido de nuevo!");
      } else {
        await register(form.nombre, form.email, form.password);
        toast.success("¡Cuenta creada correctamente!");
      }
      // Tras login/registro exitoso, volvemos a la tienda
      navigate("/");
    } catch (err: any) {
      // El error viene del throw en AuthContext (mensaje del backend)
      toast.error(err.message || "Ha ocurrido un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Cabecera con logo */}
        <div className="bg-black text-white p-8 text-center">
          <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✦</span>
          </div>
          <h1 className="text-2xl font-light tracking-widest">LUXE PARFUM</h1>
          <p className="text-gray-400 text-sm mt-1">
            {mode === "login" ? "Accede a tu cuenta" : "Crea tu cuenta"}
          </p>
        </div>

        {/* Tabs para cambiar entre login y registro */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === "login"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LogIn className="w-4 h-4 inline mr-2" />
            Iniciar sesión
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === "register"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <UserPlus className="w-4 h-4 inline mr-2" />
            Crear cuenta
          </button>
        </div>

        {/* Formulario principal */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">

          {/* Campo nombre: solo visible en modo registro */}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                required
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>

          {/* Campo contraseña con botón para mostrar/ocultar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-black outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Botón submit: texto dinámico según modo y estado loading */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 text-sm"
          >
            {loading
              ? "Cargando..."
              : mode === "login"
                ? "Iniciar sesión"
                : "Crear cuenta"}
          </button>

          {/* Enlace para cambiar de modo sin recargar la página */}
          <p className="text-center text-xs text-gray-500">
            {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-amber-600 hover:underline font-medium"
            >
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}











