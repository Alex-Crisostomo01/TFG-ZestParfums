import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { categories, brands, genders, types } from "../data/perfumes";

export interface Filters {
  category: string;
  brand: string;
  gender: string;
  type: string;
  priceRange: [number, number];
  onlyInStock: boolean;
  onSale: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  isMobile?: boolean;
  onClose?: () => void;
  marcas?: any[]; // Agregado para recibir las marcas desde Home
}

export function FilterSidebar({
  filters,
  onFilterChange,
  isMobile = false,
  onClose,
  marcas = [],
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    gender: true,
    type: true,
    price: true,
    other: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFilterChange({
      category: "all",
      brand: "all",
      gender: "all",
      type: "all",
      priceRange: [0, 300],
      onlyInStock: false,
      onSale: false,
    });
  };

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full py-2 text-sm font-medium"
      >
        {title}
        {expandedSections[id] ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {expandedSections[id] && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );

  return (
    <div className={`${isMobile ? "p-4" : "space-y-6"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="font-medium">Filtros</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-amber-600 hover:text-amber-700"
        >
          Limpiar todo
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Categoría" id="category">
        {categories.map((cat) => (
          <label
            key={cat.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={cat.value}
              checked={filters.category === cat.value}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
            />
            <span className="text-sm">{cat.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Gender */}
      <FilterSection title="Género" id="gender">
        {genders.map((gender) => (
          <label
            key={gender.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="gender"
              value={gender.value}
              checked={filters.gender === gender.value}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
            />
            <span className="text-sm">{gender.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Marca" id="brand">
        {/* Opción por defecto siempre visible */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="brand"
            value="all"
            checked={filters.brand === "all"}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
          />
          <span className="text-sm">Todas las marcas</span>
        </label>

        {/* Mapeo de marcas traídas del Backend */}
        {marcas.map((m) => (
          <label
            key={m.idMarca || m.id_marca}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="brand"
              value={m.nombre}
              checked={filters.brand === m.nombre}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
            />
            <span className="text-sm">{m.nombre}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Precio" id="price">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [0, parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>€0</span>
            <span>€{filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Other Filters */}
      <FilterSection title="Otros" id="other">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) =>
              handleFilterChange("onlyInStock", e.target.checked)
            }
            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm">Solo en stock</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) => handleFilterChange("onSale", e.target.checked)}
            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm">En oferta</span>
        </label>
      </FilterSection>

      {isMobile && (
        <button
          onClick={onClose}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Aplicar filtros
        </button>
      )}
    </div>
  );
}
