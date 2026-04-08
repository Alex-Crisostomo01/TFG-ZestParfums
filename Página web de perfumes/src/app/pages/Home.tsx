import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../components/Header";
import { FilterSidebar, Filters } from "../components/FilterSidebar";
import { ProductCard } from "../components/ProductCard";
import { Cart } from "../components/Cart";
import { Perfume } from "../data/perfumes";

export default function Home() {
  const [backendPerfumes, setBackendPerfumes] = useState<Perfume[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    brand: "all",
    gender: "all",
    type: "all",
    priceRange: [0, 300],
    onlyInStock: false,
    onSale: false,
  });

  // Código para tus compañeros de React
  useEffect(() => {
    fetch("http://localhost:8080/api/perfumes")
      .then((res) => res.json())
      // 💡 Mapeamos los datos de Java al formato de la interfaz Perfume.ts
      .then((data) => {
        const perfumesMapeados = data.map((p: any) => {
          // 💡 IMPORTANTE: Aquí hacemos el puente entre el número de SQL y el texto de React
          let categoriaTexto = "oriental"; // Valor por defecto

          // Comprobamos el nombre que venga en tu JSON (mira el navegador para confirmar)
          const idCat = p.idCategoria || p.id_categoria;

          if (idCat === 1) categoriaTexto = "oriental";
          if (idCat === 2) categoriaTexto = "floral";
          if (idCat === 3) categoriaTexto = "fresh";
          if (idCat === 4) categoriaTexto = "woody";
          console.log("Categoria asignada:", categoriaTexto);

          return {
            ...p,
            id: p.id_perfume || p.id,
            name: p.nombre,
            price: p.precio,
            category: categoriaTexto, // 👈 Esto es lo que usa el filtro de la izquierda
            brand: "Maison Luxe",
            image:
              p.imagen_url ||
              "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
            inStock: p.stock > 0,
            rating: 4.5,
            reviews: 10,
            notes: ["Fragancia"],
          };
        });
        setBackendPerfumes(perfumesMapeados);
      })
      .catch((err) => console.error("Error conectando al Backend:", err));
  }, []);
  const filteredPerfumes = useMemo(() => {
    return backendPerfumes.filter((perfume) => {
      // 1. Filtro de búsqueda (Search)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = perfume.name.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. FILTRO DE CATEGORÍA (Aquí está el fallo)
      // Si el filtro NO es "all" Y la categoría del perfume NO coincide con el filtro...
      if (filters.category !== "all") {
        if (perfume.category !== filters.category) {
          return false; // ❌ Si no coinciden, lo quitamos de la lista
        }
      }

      // 3. Filtro de precio
      if (perfume.price > filters.priceRange[1]) {
        return false;
      }

      return true; // ✅ Si pasa todos los filtros, se muestra
    });
  }, [searchQuery, filters, backendPerfumes]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar with Toggle */}
          <div
            className={`hidden lg:block transition-all duration-300 ${isDesktopFilterOpen ? "w-64" : "w-12"} flex-shrink-0`}
          >
            <div className="sticky top-28">
              {/* Toggle Button */}
              <button
                onClick={() => setIsDesktopFilterOpen(!isDesktopFilterOpen)}
                className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors mb-4 shadow-sm"
                title={
                  isDesktopFilterOpen ? "Ocultar filtros" : "Mostrar filtros"
                }
              >
                {isDesktopFilterOpen ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {/* Filters */}
              {isDesktopFilterOpen && (
                <div className="animate-in fade-in slide-in-from-left-5 duration-300">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with results count */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-light mb-1">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : "Todos los perfumes"}
                </h1>
                <p className="text-sm text-gray-600">
                  {filteredPerfumes.length}{" "}
                  {filteredPerfumes.length === 1 ? "producto" : "productos"}
                </p>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>
            </div>

            {/* Products Grid */}
            {filteredPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                  No se encontraron productos
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      category: "all",
                      brand: "all",
                      gender: "all",
                      type: "all",
                      priceRange: [0, 300],
                      onlyInStock: false,
                      onSale: false,
                    });
                  }}
                  className="text-amber-600 hover:text-amber-700"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <>
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          <div className="fixed top-0 left-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-medium">Filtros</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              isMobile
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
