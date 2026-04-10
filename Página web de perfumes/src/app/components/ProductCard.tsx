import { ShoppingBag, Star, Heart } from "lucide-react";
import { Link } from "react-router";
import { Perfume } from "../data/perfumes";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface ProductCardProps {
  perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(perfume);
    toast.success(`${perfume.name} añadido al carrito`);
  };

  return (
    <Link to={`/product/${perfume.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!perfume.inStock && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                Agotado
              </span>
            )}

            {/* 🚀 CORRECCIÓN AQUÍ: Solo mostrar si onSale es estrictamente true */}
            {perfume.onSale === true && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                Oferta
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 shadow-sm">
            <Heart className="w-4 h-4" />
          </button>

          {/* Quick Add Button */}
          {perfume.inStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 left-3 right-3 bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800"
            >
              <ShoppingBag className="w-4 h-4" />
              Añadir al carrito
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 tracking-wider uppercase mb-1">
            {perfume.brand}
          </p>

          <h3 className="font-medium text-sm mb-2 line-clamp-1 text-gray-900">
            {perfume.name}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <span className="capitalize">{perfume.category}</span>
            <span>•</span>
            <span>{perfume.size}</span>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{perfume.rating}</span>
            <span className="text-xs text-gray-500">({perfume.reviews})</span>
          </div>

          {/* Price Section */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-sm font-bold ${
                perfume.onSale === true ? "text-red-600" : "text-gray-900"
              }`}
            >
              €{Number(perfume.price || 0).toFixed(2)}
            </span>

            {/* Precio Original tachado */}
            {perfume.onSale === true && perfume.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                €{Number(perfume.originalPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
