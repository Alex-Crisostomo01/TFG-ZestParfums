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

  // Código para tus compañeros de React
  useEffect(() => {
    fetch("http://localhost:8080/api/marcas")
      .then((res) => res.json())
      .then((data) => setMarcasDB(data))
      .catch((err) => console.error("Error cargando marcas:", err));
    fetch("http://localhost:8080/api/perfumes") // Conexion con nuestra api donde recogemos los datos de los perfumes
      .then((res) => res.json())
      .then((data) => {
        const perfumesMapeados = data.map((p: any) => {
          // 1. Definimos la categoría (Traducción de ID a Texto)
          let categoriaTexto = "oriental";
          const idCat = p.idCategoria || p.id_categoria;
          switch (idCat) {
            case 1:
              categoriaTexto = "amaderado";
              break;
            case 2:
              categoriaTexto = "fresco";
              break;
            case 3:
              categoriaTexto = "oriental";
              break;
            case 4:
              categoriaTexto = "floral";
              break;
            case 5:
              categoriaTexto = "aromatico";
              break;
            default:
              categoriaTexto = "oriental";
          }
          const marcaEncontrada = p.marca?.nombre || "Perfume Zets";
          // 2. Extraemos el nombre de la imagen
          const nombreImagen = p.imagenUrl || p.imagen_url;

          let generoTexto = "unisex"; // Valor por defecto
          const idGen = p.idGenero || p.id_genero || p.id_Genero; // Asegúrate de que este campo venga de tu SQL
          if (idGen === 1) generoTexto = "hombre";
          else if (idGen === 2) generoTexto = "mujer";
          else if (idGen === 3) generoTexto = "unisex";

          const isSale =
            p.enOferta === true || p.en_oferta === true || p.enOferta === 1;
          const precioBase = p.precio || 0;

          // 3. Devolvemos el objeto formateado
          return {
            ...p,
            id: p.id_perfume || p.id,
            name: p.nombre,
            price: isSale ? precioBase * 0.8 : precioBase,
            originalPrice: precioBase,
            category: categoriaTexto, //  Esto ahora coincide con cat.value
            image: p.imagenUrl
              ? `/productos/${p.imagenUrl}`
              : "/productos/default.jpg",
            brand: marcaEncontrada, // Luego haremos lo mismo con id_marca
            gender: generoTexto,
            inStock: p.stock > 0,
            rating: 4.5,
            reviews: 10,
            notes: ["Fragancia"],
            onSale: p.enOferta === true || p.en_oferta === 1,
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
      // 4. Filtro de marca
      if (filters.brand !== "all" && perfume.brand !== filters.brand) {
        return false;
      }
      if (filters.gender !== "all") {
        if (perfume.gender.toLowerCase() !== filters.gender.toLowerCase()) {
          return false;
        }
      }
      if (filters.onlyInStock && !perfume.inStock) {
        return false;
      }

      if (filters.onSale && !perfume.onSale) {
        return false;
      }

      return true; //  Si pasa todos los filtros, se muestra
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
                    marcas={marcasDB}
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
              marcas={marcasDB}
            />
          </div>
        </>
      )}
    </div>
  );
}
