// src/components/Header.jsx
export function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100">
      {/* Lado Izquierdo: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white font-serif italic text-xl">
          P
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-gray-900">
          PERFUMESTORE
        </h1>
      </div>

      {/* Centro: Navegación (Solo texto, sin enlaces reales) */}
      <nav className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest text-gray-400">
        <span className="text-black border-b-2 border-black">Inicio</span>
        <span>Colecciones</span>
        <span>Marcas</span>
        <span>Contacto</span>
      </nav>

      {/* Lado Derecho: Iconos de adorno */}
      <div className="flex gap-6 items-center text-gray-300">
        {/* Un círculo simple que representa el perfil */}
        <div className="w-6 h-6 border-2 border-current rounded-full" />
        {/* Un círculo simple que representa el carrito */}
        <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center text-[10px] font-bold">
          0
        </div>
      </div>
    </header>
  );
}

export default Header;