import { createContext, useContext, useState, ReactNode } from "react";

// --- TIPOS ---
// Define la forma del objeto usuario que guardaremos tras el login
interface User {
  nombre: string;
  email: string;
  rol: "ADMIN" | "USER"; // Solo estos dos roles posibles
  token: string;         // JWT que devuelve el backend
}

// Lo que expone el contexto a toda la app
interface AuthContextType {
  user: User | null;                                                    // null = no hay sesión
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Creamos el contexto vacío (se rellena en AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER ---
// Envuelve toda la app en App.tsx para que cualquier componente pueda usar useAuth()
export function AuthProvider({ children }: { children: ReactNode }) {

  // Intentamos recuperar la sesión guardada en localStorage al recargar la página
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  // --- LOGIN ---
  // Llama al endpoint POST /api/auth/login con email y contraseña
  // Si el backend responde OK, guarda el usuario en estado y en localStorage
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Credenciales incorrectas"); // El error lo captura LoginPage y lo muestra con toast
    }

    const data = await res.json();
    const userData: User = {
      nombre: data.nombre,
      email: data.email,
      rol: data.rol,
      token: data.token, // JWT para las peticiones protegidas
    };
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData)); // Persiste la sesión
  };

  // --- REGISTER ---
  // Igual que login pero llama a POST /api/auth/register
  // Si todo va bien, inicia sesión directamente (sin paso extra)
  const register = async (nombre: string, email: string, password: string) => {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Error al crear la cuenta");
    }

    const data = await res.json();
    const userData: User = {
      nombre: data.nombre,
      email: data.email,
      rol: data.rol,
      token: data.token,
    };
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  // --- LOGOUT ---
  // Borra la sesión del estado y del localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  // Helper para saber rápido si el usuario actual es admin
  const isAdmin = () => user?.rol === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- HOOK ---
// Atajo para usar el contexto: const { user, login } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}


