import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ShoppingBag, Heart, Star } from "lucide-react";
import { Perfume } from "../data/perfumes";
import { useCart } from "../context/CartContext";
import { Header } from "../components/Header";
import { Cart } from "../components/Cart";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/perfumes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        // Mapeamos los datos de Java (español) a la interfaz de React (inglés)
        const mapeado: Perfume = {
          ...data,
          id: data.id,
          name: data.nombre || "Perfume sin nombre",
          // Priorizamos 'descripcion' que es como está en tu Perfume.java
          description:
            data.descripcion || "Una esencia exclusiva diseñada para perdurar.",
          price: data.enOferta
            ? data.precio * 0.8 // Si está en oferta, aplicamos un 20% de descuento
            : data.precio,

          originalPrice: data.enOferta ? data.precio : undefined, // Guardamos el precio original
          discountBadge: data.enOferta ? "-20%" : null,
          brand: data.marca?.nombre || "Luxe Parfum",

          // Mapeo manual de categorías basado en tus IDs de Java
          category:
            data.idCategoria === 1
              ? "Floral"
              : data.idCategoria === 2
                ? "Oriental"
                : data.idCategoria === 3
                  ? "Cítrico"
                  : "General",

          // Mapeo manual de género
          gender:
            data.idGenero === 1
              ? "Masculino"
              : data.idGenero === 2
                ? "Femenino"
                : "Unisex",

          image: data.imagenUrl
            ? `/productos/${data.imagenUrl}`
            : "/productos/default.jpg",
          inStock: data.stock > 0,

          // Valores por defecto para campos que quizás no tienes en DB aún
          rating: data.rating || 4.5,
          reviews: data.reviews || 0,
          notes: data.notas ? data.notas.split(",") : ["Notas premium"],
          type: "Eau de Parfum",
          size: "100ml",
        };

        setPerfume(mapeado);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando detalle:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Cargando fragancia...</p>
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">Producto no encontrado</p>
          <Link
            to="/"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(perfume);
    toast.success(`${perfume.name} añadido al carrito`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            <ImageWithFallback
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-400 tracking-widest uppercase mb-2 font-medium">
              {perfume.brand}
            </p>

            <h1 className="text-4xl font-light mb-4 text-gray-900">
              {perfume.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(perfume.rating || 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {perfume.rating}
              </span>
            </div>

            {/* Sección de Precios */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-semibold text-red-600">
                €{Number(perfume.price).toFixed(2)}
              </span>
              {perfume.enOferta && (
                <span className="text-xl text-gray-400 line-through">
                  €{Number(perfume.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed text-lg italic">
              "{perfume.description}"
            </p>

            <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Categoría</span>
                <span className="font-semibold text-gray-800 capitalize">
                  {perfume.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Género</span>
                <span className="font-semibold text-gray-800 capitalize">
                  {perfume.gender}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Stock</span>
                <span
                  className={`font-bold ${perfume.inStock ? "text-green-600" : "text-red-500"}`}
                >
                  {perfume.inStock
                    ? "✓ Disponible en tienda"
                    : "✗ Agotado temporalmente"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={!perfume.inStock}
                className="flex-1 bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                {perfume.inStock ? "Añadir al carrito" : "Sin existencias"}
              </button>
              <button className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-white hover:border-black transition-all active:scale-95">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
