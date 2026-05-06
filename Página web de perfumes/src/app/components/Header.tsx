import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Heart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
}

export function Header({ onSearchChange, searchValue }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "1";

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Hombre", href: "/?gender=hombre" },
    { name: "Mujer", href: "/?gender=mujer" },
    { name: "Unisex", href: "/?gender=unisex" },
    { name: "Ofertas", href: "/?sale=true" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✦</span>
            </div>
            <span className="text-2xl font-light tracking-wider">
              ZEST PARFUMS
            </span>
          </Link>

          {/* Desktop Navigation */}
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
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Hidden on mobile */}
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

            {/* Icons */}
            {token ? (
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {isAdmin ? "Admin" : "Mi cuenta"}
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
              <Heart className="w-5 h-5" />
            </button>
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

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
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

        {/* Mobile Menu */}
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
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  Cuenta
                </button>
                <button className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4" />
                  Favoritos
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
