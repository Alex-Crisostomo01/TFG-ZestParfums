import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Dispara la animación de entrada tras montar el componente
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const categories = [
    { label: "Hombre",    href: "/tienda?gender=hombre",  icon: "🌿" },
    { label: "Mujer",     href: "/tienda?gender=mujer",   icon: "🌸" },
    { label: "Unisex",    href: "/tienda?gender=unisex",  icon: "✦"  },
    { label: "Ofertas",   href: "/tienda?onSale=true",    icon: "⭐" },
  ];

  return (
    <div className="relative min-h-screen bg-background dark:bg-card flex flex-col overflow-hidden">

      {/* ── Fondo decorativo: patrón + manchas de luz ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Patrón geométrico sutil */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,var(--color-primary,#8b6f47) 0,var(--color-primary,#8b6f47) 1px,transparent 0,transparent 50%)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Halo superior izquierdo */}
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        {/* Halo inferior derecho */}
        <div className="absolute -bottom-52 -right-52 w-[700px] h-[700px] rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl" />
      </div>

      {/* ── Header minimalista solo para esta página ── */}
      <header className="relative z-10 flex items-center justify-between px-8 py-7 border-b border-border/50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
            <span className="text-background text-lg">✦</span>
          </div>
          <span className="text-xl font-light tracking-[0.3em] text-primary uppercase">
            Zest Parfums
          </span>
        </div>

        {/* Accesos rápidos */}
        <div className="flex items-center gap-5 text-sm font-light">
          <Link
            to="/login"
            className="text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            Iniciar sesión
          </Link>
          <button
            onClick={() => navigate("/tienda")}
            className="btn-luxury border border-border hover:border-primary/60 bg-background dark:bg-card text-foreground hover:text-primary px-5 py-2 rounded-full transition-all text-sm tracking-wide"
          >
            Tienda
          </button>
        </div>
      </header>

      {/* ── Bloque central ── */}
      <main
        className={`relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Chip superior */}
        <div className="flex items-center gap-3 mb-8">
          <div className="divider-luxury w-14" />
          <span className="flex items-center gap-1.5 text-primary text-[10px] font-semibold uppercase tracking-[0.55em]">
            <Sparkles className="w-3 h-3" />
            Colección 2026
          </span>
          <div className="divider-luxury w-14" />
        </div>

        {/* Título principal usando las clases de luxury.css */}
        <h1 className="text-6xl md:text-8xl font-light leading-[1.05] mb-6 text-foreground">
          El arte de la
          <br />
          <span className="gradient-text-luxury italic font-extralight">
            fragancia
          </span>
        </h1>

        <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-md mb-12 tracking-wide">
          Descubre nuestra selección exclusiva de los perfumes más icónicos del
          mundo. Cada aroma, una historia. Cada botella, una obra de arte.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/tienda")}
            className="btn-luxury glow-subtle flex items-center justify-center gap-2 bg-animated-luxury text-white px-12 py-4 text-xs font-semibold uppercase tracking-[0.3em] rounded-sm hover:opacity-90 transition-opacity"
          >
            Explorar catálogo
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/recommender")}
            className="btn-luxury border border-border text-muted-foreground hover:border-primary hover:text-primary px-12 py-4 text-xs font-semibold uppercase tracking-[0.3em] rounded-sm transition-all"
          >
            Dr. Fragancia ✦
          </button>
        </div>

        {/* Indicador de scroll */}
        <div className="mt-20 flex flex-col items-center gap-2 text-muted-foreground/40">
          <span className="text-[9px] tracking-[0.45em] uppercase">
            Descubrir
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-muted-foreground/30 to-transparent animate-pulse" />
        </div>
      </main>

      {/* ── Franja inferior: acceso rápido por categoría ── */}
      <footer className="relative z-10 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {categories.map(({ label, href, icon }) => (
            <Link
              key={label}
              to={href}
              className="border-luxury-hover flex flex-col items-center gap-1.5 py-6 text-muted-foreground hover:text-primary transition-all group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
