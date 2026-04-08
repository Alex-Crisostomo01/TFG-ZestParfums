import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, ShoppingBag, Heart, Star, Check, Sparkles } from 'lucide-react';
import { perfumes } from '../data/perfumes';
import { useCart } from '../context/CartContext';
import { Header } from '../components/Header';
import { Cart } from '../components/Cart';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const perfume = perfumes.find((p) => p.id === Number(id));

  if (!perfume) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">Producto no encontrado</p>
          <Link to="/" className="text-amber-600 hover:text-amber-700">
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

  // Related products (same category)
  const relatedProducts = perfumes
    .filter((p) => p.category === perfume.category && p.id !== perfume.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-gray-200">
            <ImageWithFallback
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full object-cover"
            />
            {perfume.originalPrice && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Oferta -{Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)}%
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-sm text-gray-500 tracking-wider uppercase mb-2">
              {perfume.brand}
            </p>

            {/* Name */}
            <h1 className="text-4xl font-light mb-4">{perfume.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(perfume.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{perfume.rating}</span>
              <span className="text-sm text-gray-500">({perfume.reviews} reseñas)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold">€{perfume.price.toFixed(2)}</span>
              {perfume.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  €{perfume.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {perfume.description}
            </p>

            {/* Details */}
            <div className="space-y-3 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Categoría</span>
                <span className="text-sm font-medium capitalize">{perfume.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Género</span>
                <span className="text-sm font-medium capitalize">{perfume.gender}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tipo</span>
                <span className="text-sm font-medium">{perfume.type.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tamaño</span>
                <span className="text-sm font-medium">{perfume.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stock</span>
                <span className={`text-sm font-medium ${perfume.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {perfume.inStock ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="font-medium">Notas olfativas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {perfume.notes.map((note, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={!perfume.inStock}
                className="flex-1 bg-black text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                {perfume.inStock ? 'Añadir al carrito' : 'Agotado'}
              </button>
              <button className="w-14 h-14 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                Envío gratis en pedidos superiores a €50
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                Devoluciones gratuitas en 30 días
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                Auténtico y sellado de fábrica
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-6">También te puede gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} perfume={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}