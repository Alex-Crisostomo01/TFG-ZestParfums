import React, { useState, FormEvent } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.register({
        nombre: name,
        email,
        password,
        telefono: phone,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.message ||
          "No se pudo crear la cuenta. Revisa los datos e inténtalo de nuevo.",
      );
    } finally {
      setLoading(false);
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
            Crea tu cuenta de cliente
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Regístrate para guardar tu carrito y comprar fragancias exclusivas.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Nombre</span>
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-amber-400 focus:ring-amber-400/30"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Email</span>
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
              minLength={6}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Teléfono</span>
            <input
              type="tel"
              placeholder="Opcional"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-amber-400 focus:ring-amber-400/30"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          {error && (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
          <p className="font-medium text-slate-200">Solo clientes</p>
          <p className="mt-2 leading-6">
            Esta cuenta es solo para clientes. El acceso administrativo no se
            crea desde aquí.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
