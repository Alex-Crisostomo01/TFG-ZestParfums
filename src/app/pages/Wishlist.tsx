import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (perfumeId: number) => {
    const perfume = wishlist.find((item) => item.id === perfumeId);
    if (!perfume) return;

    if (!perfume.inStock) {
      toast.error("Este perfume está agotado");
      return;
    }

    addToCart(perfume);
    toast.success(`${perfume.name} añadido al carrito`);
  };

  const handleRemove = (perfumeId: number) => {
    removeFromWishlist(perfumeId);
    toast.success("Eliminado de tu lista de deseados");
  };

  return (
    <div className="min-h-screen bg-background dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 mb-4">
            <Heart className="w-4 h-4" />
            Tus Deseados
          </span>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">Mi lista de deseos</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Guarda tus fragancias favoritas y agrégalas al carrito cuando estés listo.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card dark:bg-primary/5 p-12 text-center">
            <p className="text-lg text-foreground font-medium mb-4">No tienes ningún perfume en tu lista de deseos todavía.</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 font-medium hover:shadow-lg transition-all"
            >
              Volver al catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wishlist.map((perfume) => (
              <div key={perfume.id} className="bg-card dark:bg-primary/5 rounded-3xl border border-border p-6 flex flex-col">
                <div className="flex items-start gap-6">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-28 h-28 rounded-3xl object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${perfume.id}`} className="text-xl font-medium text-foreground hover:text-primary transition-colors">
                      {perfume.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-2">{perfume.brand || "Zets Exclusive"}</p>
                    <p className="mt-4 text-2xl font-semibold text-foreground">€{Number(perfume.price || 0).toFixed(2)}</p>
                    {perfume.onSale && perfume.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">€{Number(perfume.originalPrice).toFixed(2)}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(perfume.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Añadir al carrito
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(perfume.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background dark:bg-card px-4 py-3 text-foreground font-medium hover:bg-muted dark:hover:bg-muted/50 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
