// src/components/ProductGrid.jsx
import ProductCard from "./ProductCard";

// Datos de productos más realistas para la primera fase
const PRODUCTS_DATA = [
  { 
    id: 1, 
    name: "Miss Floral", 
    description: "Eau de Parfum - 50ml", 
    price: 85,
    imgUrl: "https://placehold.co/400x400/fff8f0/6a0a38?text=Floral" // Imagen placeholder
  },
  { 
    id: 2, 
    name: "Classic Oud", 
    description: "Esencia intensa - 100ml", 
    price: 120,
    imgUrl: "https://placehold.co/400x400/fff3e6/6a0a38?text=Oud"
  },
  { 
    id: 3, 
    name: "Citrus Sky", 
    description: "Agua de colonia - 75ml", 
    price: 59,
    imgUrl: "https://placehold.co/400x400/e6f7ff/6a0a38?text=Citrus"
  },
  { 
    id: 4, 
    name: "Oceano Profundo", 
    description: "Vaporizador Fresh", 
    price: 72,
    imgUrl: "https://placehold.co/400x400/e6fff2/6a0a38?text=Ocean"
  },
  { 
    id: 5, 
    name: "Misterio", 
    description: "Perfume Intenso Noche", 
    price: 98,
    imgUrl: "https://placehold.co/400x400/f5f5ff/6a0a38?text=Mystere"
  },
  { 
    id: 6, 
    name: "Néctar de Rosa", 
    description: "Edición Limitada", 
    price: 110,
    imgUrl: "https://placehold.co/400x400/fff0f6/6a0a38?text=Rosa"
  }
];

export function ProductGrid() {
  return (
    <main className="flex-1 p-8">
      {/* HERO / BANNER SUPERIOR */}
      <div className="bg-pink-100 rounded-3xl p-8 mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 text-gray-950">Nueva colección</h2>
          <p className="text-pink-900 mb-6">
            Descubre las fragancias más exclusivas para esta temporada
          </p>
          <button className="bg-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-pink-700 transition">
            Ver más
          </button>
        </div>
        <div className="w-48 h-48 bg-white rounded-3xl flex items-center justify-center shadow-lg">
          {/* Placeholder para la imagen destacada */}
          <img src="https://placehold.co/300x300/fdf2f8/6a0a38?text=Featured" alt="Featured collection" className="rounded-xl w-32"/>
        </div>
      </div>

      {/* GRID DE PRODUCTOS: sm:grid-cols-3 es la clave */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS_DATA.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-16 -mx-8 px-16 py-8 text-sm text-gray-500 flex justify-between rounded-t-3xl">
        <span>© 2026 PerfumeStore. Todos los derechos reservados.</span>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-pink-600">Aviso Legal</span>
          <span className="cursor-pointer hover:text-pink-600">Privacidad</span>
          <span className="cursor-pointer hover:text-pink-600">Términos y Condiciones</span>
        </div>
      </footer>
    </main>
  );
}

export default ProductGrid;