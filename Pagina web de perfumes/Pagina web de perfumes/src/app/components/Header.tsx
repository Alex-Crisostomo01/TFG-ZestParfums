import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingBag, Menu, X, Heart, User, LogOut, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface HeaderProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
}

export function Header({ onSearchChange, searchValue }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Dropdown del usuario
  const { getCartCount, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();  // Leemos el estado de sesión
  const navigate = useNavigate();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Hombre', href: '/?gender=hombre' },
    { name: 'Mujer', href: '/?gender=mujer' },
    { name: 'Unisex', href: '/?gender=unisex' },
    { name: 'Ofertas', href: '/?sale=true' },
  ];

  // Llama a logout del contexto y redirige al inicio
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    toast.success('Sesión cerrada');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✦</span>
            </div>
            <span className="text-2xl font-light tracking-wider">LUXE PARFUM</span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm tracking-wide hover:text-amber-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* El enlace "Admin" solo aparece si el usuario tiene rol ADMIN */}
            {isAdmin() && (
              <Link
                to="/admin"
                className="text-sm tracking-wide text-amber-600 font-medium flex items-center gap-1 hover:text-amber-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {/* Buscador */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar perfumes..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-500"
              />
            </div>

            {/* Botón de usuario: si hay sesión muestra nombre + dropdown, si no muestra "Entrar" */}
            <div className="relative hidden md:block">
              {user ? (
                <>
                  {/* Botón que abre el dropdown con opciones de cuenta */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm"
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-24 truncate">{user.nombre}</span>
                  </button>

                  {/* Dropdown con info del usuario, acceso a admin y logout */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-medium truncate">{user.email}</p>
                        <p className="text-xs text-amber-600 capitalize">{user.rol}</p>
                      </div>
                      {/* Acceso directo al panel admin solo para admins */}
                      {isAdmin() && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Panel Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Sin sesión: botón directo a la página de login
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Entrar
                </Link>
              )}
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
              <Heart className="w-5 h-5" />
            </button>

            {/* Carrito con badge del número de ítems */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Buscador móvil (siempre visible en pantallas pequeñas) */}
        <div className="md:hidden pb-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar perfumes..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-wide hover:text-amber-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {isAdmin() && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-amber-600 font-medium flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Panel Admin
                </Link>
              )}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm"
                  >
                    <User className="w-4 h-4" />
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Capa invisible para cerrar el dropdown de usuario al clicar fuera */}
      {isUserMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
      )}
    </header>
  );
}
