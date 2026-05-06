import React, { useState, FormEvent } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await authService.login(email, password);
      const destination = response.esAdmin === 1 ? "/admin" : "/dashboard";
      navigate(destination);
    } catch (err: any) {
      setError("Error al iniciar sesión. Revisa tus credenciales.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/20 p-8 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 shadow-inner shadow-amber-500/10">
            <span className="text-2xl">✦</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Bienvenido a LUXE PARFUM
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Inicia sesión para acceder a tu cuenta y descubrir el mundo de los
            perfumes de lujo.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">
              Correo electrónico
            </span>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-amber-400 focus:ring-amber-400/30"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">
              Contraseña
            </span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-amber-400 focus:ring-amber-400/30"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-300"
          >
            Entrar
          </button>

          {error && (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">
              {error}
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">¿Aún no tienes cuenta?</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mt-3 inline-flex items-center justify-center rounded-3xl border border-slate-700/80 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-200"
          >
            Crear tu cuenta
          </button>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
          <p className="font-medium text-slate-200">Solo cuentas de cliente</p>
          <p className="mt-2 leading-6">
            Esta ruta de registro crea únicamente una cuenta para clientes y no
            incluye un apartado de administrador.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
