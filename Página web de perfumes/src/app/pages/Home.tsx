import { useState, useMemo, useEffect } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Header } from "../components/Header";
import { FilterSidebar, Filters } from "../components/FilterSidebar";
import { ProductCard } from "../components/ProductCard";
import { Cart } from "../components/Cart";
import { Perfume } from "../data/perfumes";
import api from "../../api/axios";

interface BackendMarcaDTO {
  id?: number;
  id_marca?: number;
  nombre: string;
  paisOrigen?: string;
  descripcion?: string;
  activo?: number;
  logoUrl?: string;
}

interface BackendPerfumeDTO {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  imagenUrl?: string;
  idCategoria?: number;
  categoria?: string;
  idGenero?: number;
  genero?: string;
  stock?: number;
  enOferta?: boolean;
  marca?: BackendMarcaDTO;
}

const formatCategoryLabel = (categoria?: string) => {
  if (!categoria) return "General";
  const normalized = categoria.trim();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
};

const normalizeGender = (genero?: string) => {
  const value = genero?.toLowerCase() || "unisex";
  if (value.includes("hombre") || value.includes("masculino")) return "Hombre";
  if (value.includes("mujer") || value.includes("femenino")) return "Mujer";
  return "Unisex";
};

export default function Home() {
  const [backendPerfumes, setBackendPerfumes] = useState<Perfume[]>([]);
  const [marcasDB, setMarcasDB] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intento de conexión con el Backend
        const [resMarcas, resPerfumes] = await Promise.all([
          api.get("/marcas"),
          api.get("/perfumes"),
        ]);

        setMarcasDB(resMarcas.data);

        const perfumesData: BackendPerfumeDTO[] = resPerfumes.data || [];
        const perfumesMapeados: Perfume[] = perfumesData.map((p) => {
          const safePrice = Number(p.precio ?? 0);
          return {
            id: Number(p.id ?? 0),
            name: p.nombre || "Sin nombre",
            description:
              p.descripcion || "Una esencia exclusiva diseñada para perdurar.",
            price: p.enOferta ? safePrice * 0.8 : safePrice,
            originalPrice: p.enOferta ? safePrice : undefined,
            enOferta: p.enOferta ?? false,
            image: p.imagenUrl?.startsWith("http")
              ? p.imagenUrl
              : `/productos/${p.imagenUrl || "default.jpg"}`,
            category: p.categoria ?? "general",
            brand: p.marca?.nombre || "Marca desconocida",
            gender: p.genero ?? "unisex",
            inStock: (p.stock ?? 0) > 0,
            onSale: p.enOferta ?? false,
            rating: 4.5,
            reviews: 12,
          };
        });

        setBackendPerfumes(perfumesMapeados);
      } catch (err: any) {
        console.error("Error detallado:", err);
        // Si el error es 403, mandamos un mensaje específico
        if (err.response?.status === 403) {
          setError(
            "Acceso denegado (403): El backend bloquea la ruta de marcas/perfumes.",
          );
        } else {
          setError(
            "No se pudo sincronizar el catálogo. Revisa si el Backend está encendido.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPerfumes = useMemo(() => {
    return backendPerfumes.filter((perfume) => {
      if (
        searchQuery &&
        !perfume.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (
        filters.category !== "all" &&
        perfume.category.toLowerCase() !== filters.category
      )
        return false;
      if (
        perfume.price > filters.priceRange[1] ||
        perfume.price < filters.priceRange[0]
      )
        return false;
      if (filters.brand !== "all" && perfume.brand !== filters.brand)
        return false;
      if (
        filters.gender !== "all" &&
        perfume.gender.toLowerCase() !== filters.gender.toLowerCase()
      )
        return false;
      if (filters.onlyInStock && !perfume.inStock) return false;
      if (filters.onSale && !perfume.onSale) return false;
      return true;
    });
  }, [searchQuery, filters, backendPerfumes]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 font-light">
            Sincronizando base de datos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} searchValue={searchQuery} />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center animate-pulse">
            {error}
          </div>
        )}

        <div className="flex gap-8">
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

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-light mb-1">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : "Catálogo Profesional"}
                </h1>
                <p className="text-sm text-gray-600">
                  {filteredPerfumes.length} productos disponibles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPerfumes.map((perfume) => (
                <ProductCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
