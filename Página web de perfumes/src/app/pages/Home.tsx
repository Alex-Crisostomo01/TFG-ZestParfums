import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../components/Header";
import { FilterSidebar, Filters } from "../components/FilterSidebar";
import { ProductCard } from "../components/ProductCard";
import { Cart } from "../components/Cart";
import { Perfume } from "../data/perfumes";

export default function Home() {
  const [backendPerfumes, setBackendPerfumes] = useState<Perfume[]>([]);
  const [marcasDB, setMarcasDB] = useState<any[]>([]);
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

  useEffect(() => {
    // 1. Carga de Marcas
    fetch("http://localhost:8080/api/marcas")
      .then((res) => res.json())
      .then((data) => setMarcasDB(data))
      .catch((err) => console.error("Error cargando marcas:", err));

    // 2. Carga de Perfumes con Mapeo Robusto
    fetch("http://localhost:8080/api/perfumes")
      .then((res) => res.json())
      .then((data) => {
        const perfumesMapeados = data.map((p: any) => {
          // --- Lógica de Categoría ---
          const categorias: Record<number, string> = {
            1: "amaderado",
            2: "fresco",
            3: "oriental",
            4: "floral",
            5: "aromatico",
          };
          const idCat = p.idCategoria || p.id_categoria;
          const categoriaTexto = categorias[idCat as number] || "oriental";

          // --- Lógica de Marca ---
          const marcaNombre = p.marca?.nombre || "Perfume Zets";

          // --- Lógica de Imagen (PUNTO CRÍTICO CORREGIDO) ---
          // Usamos 'nombreImagen' para centralizar la búsqueda del campo
          const nombreImagen = p.imagenUrl || p.imagen_url || p.imagenURL;
          const finalImage = nombreImagen
            ? `/productos/${nombreImagen}`
            : "/productos/default.jpg";

          // --- Lógica de Género ---
          const idGen = p.idGenero || p.id_genero || p.id_Genero;
          const generos: Record<number, string> = {
            1: "hombre",
            2: "mujer",
            3: "unisex",
          };
          const generoTexto = generos[idGen as number] || "unisex";

          // --- Lógica de Precios y Ofertas ---
          const enOferta =
            p.enOferta === true ||
            p.en_oferta === true ||
            p.enOferta === 1 ||
            p.en_oferta === 1;
          const precioBase = p.precio || 0;

          return {
            ...p,
            id: p.id_perfume || p.id,
            name: p.nombre,
            price: enOferta ? precioBase * 0.8 : precioBase,
            originalPrice: precioBase,
            category: categoriaTexto,
            image: finalImage, // Ruta absoluta corregida
            brand: marcaNombre,
            gender: generoTexto,
            inStock: (p.stock || 0) > 0,
            rating: 4.5,
            reviews: 10,
            onSale: enOferta,
          };
        });

        setBackendPerfumes(perfumesMapeados);
      })
      .catch((err) => console.error("Error conectando al Backend:", err));
  }, []);

  // --- Filtros Optimizados ---
  const filteredPerfumes = useMemo(() => {
    return backendPerfumes.filter((perfume) => {
      // Búsqueda por nombre
      if (
        searchQuery &&
        !perfume.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Categoría
      if (filters.category !== "all" && perfume.category !== filters.category) {
        return false;
      }
      // Rango de precio
      if (
        perfume.price > filters.priceRange[1] ||
        perfume.price < filters.priceRange[0]
      ) {
        return false;
      }
      // Marca
      if (filters.brand !== "all" && perfume.brand !== filters.brand) {
        return false;
      }
      // Género
      if (
        filters.gender !== "all" &&
        perfume.gender.toLowerCase() !== filters.gender.toLowerCase()
      ) {
        return false;
      }
      // Stock
      if (filters.onlyInStock && !perfume.inStock) {
        return false;
      }
      // Ofertas
      if (filters.onSale && !perfume.onSale) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters, backendPerfumes]);

  // --- Renderizado (Se mantiene tu estructura pero limpia) ---
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          <div
            className={`hidden lg:block transition-all duration-300 ${isDesktopFilterOpen ? "w-64" : "w-12"} flex-shrink-0`}
          >
            <div className="sticky top-28">
              <button
                onClick={() => setIsDesktopFilterOpen(!isDesktopFilterOpen)}
                className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors mb-4 shadow-sm"
              >
                {isDesktopFilterOpen ? (
                  <ChevronLeft size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>

              {isDesktopFilterOpen && (
                <div className="animate-in fade-in slide-in-from-left-5 duration-300">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    marcas={marcasDB}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
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

              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} /> Filtros
              </button>
            </div>

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
                  onClick={() =>
                    setFilters({
                      ...filters,
                      category: "all",
                      brand: "all",
                      gender: "all",
                    })
                  }
                  className="text-amber-600 hover:underline"
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
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-medium">Filtros</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              isMobile
              onClose={() => setIsMobileFilterOpen(false)}
              marcas={marcasDB}
            />
          </div>
        </>
      )}
    </div>
  );
}
