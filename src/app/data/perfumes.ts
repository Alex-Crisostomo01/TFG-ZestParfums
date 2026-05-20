export interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  enOferta?: boolean; // Opcional por si quieres mostrar precio tachado
  image: string;
  category: string;
  gender: string;
  inStock: boolean;
  onSale?: boolean;
  rating: number;
  reviews: number;
  notes?: string[]; // Opcional
  description?: string; // Opcional
  size?: string; // Opcional
}
export const categories = [
  { value: "all", label: "Todos" },
  { value: "amaderado", label: "Amaderado" }, // id 1
  { value: "fresco", label: "Fresco" }, // id 2
  { value: "oriental", label: "Oriental" }, // id 3
  { value: "floral", label: "Floral" }, // id 4
  { value: "aromatico", label: "Aromático" },
];

export const brands = [
  { value: "all", label: "Todas las marcas" },
  { value: "Maison Luxe", label: "Maison Luxe" },
  { value: "Minimal", label: "Minimal" },
  { value: "Arabesque", label: "Arabesque" },
  { value: "Fleur Divine", label: "Fleur Divine" },
];

export const genders = [
  { value: "all", label: "Todos" },
  { value: "hombre", label: "Hombre" },
  { value: "mujer", label: "Mujer" },
  { value: "unisex", label: "Unisex" },
];

export const types = [
  { value: "all", label: "Todos los tipos" },
  { value: "eau-de-parfum", label: "Eau de Parfum" },
  { value: "eau-de-toilette", label: "Eau de Toilette" },
  { value: "eau-de-cologne", label: "Eau de Cologne" },
  { value: "extrait-de-parfum", label: "Extrait de Parfum" },
];
