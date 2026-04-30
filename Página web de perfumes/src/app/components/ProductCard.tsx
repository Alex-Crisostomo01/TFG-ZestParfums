import { ShoppingBag, Star, Heart } from "lucide-react";
import { Link } from "react-router"; // Asegúrate de que sea 'react-router-dom' si usas v6+
import { Perfume } from "../data/perfumes";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface ProductCardProps {
  perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
  const { addToCart } = useCart();

  // Bloqueamos la propagación para que el clic en el botón no active el <Link>
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 👈 CRÍTICO: Evita que el Link detecte el clic

    if (!perfume.inStock) {
      toast.error("Producto agotado");
      return;
    }

    addToCart(perfume);
    toast.success(`${perfume.name} añadido al carrito`);
  };

  // Validación de seguridad para precios (evita crashes si el backend manda null)
  const displayPrice = Number(perfume.price || 0).toFixed(2);
  const displayOriginalPrice = perfume.originalPrice
    ? Number(perfume.originalPrice).toFixed(2)
    : null;

  return (
    <Link to={`/product/${perfume.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {!perfume.inStock && (
              <span className="bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
                Agotado
              </span>
            )}

            {/* Verificación estricta de oferta */}
            {perfume.onSale && (
              <span className="bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
                Oferta
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-red-500 shadow-sm z-10"
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Quick Add Button */}
          {perfume.inStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 left-3 right-3 bg-black text-white py-2.5 rounded-lg flex items-center justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 z-10 font-medium text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Añadir
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1 font-semibold">
            {perfume.brand || "Zets Exclusive"}
          </p>

          <h3 className="font-medium text-sm mb-1 line-clamp-2 text-gray-900 group-hover:text-amber-700 transition-colors">
            {perfume.name}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="capitalize">{perfume.category}</span>
            {perfume.size && (
              <>
                <span className="text-gray-300">•</span>
                <span>{perfume.size}</span>
              </>
            )}
          </div>

          {/* Spacer para empujar el precio al final si los títulos tienen distinta longitud */}
          <div className="flex-grow" />

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700">
              {perfume.rating || "5.0"}
            </span>
            <span className="text-[10px] text-gray-400">
              ({perfume.reviews || 0})
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span
              className={`text-base font-bold ${perfume.onSale ? "text-red-600" : "text-gray-900"}`}
            >
              €{displayPrice}
            </span>

            {perfume.onSale && displayOriginalPrice && (
              <span className="text-xs text-gray-400 line-through font-normal">
                €{displayOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
