export interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type: string;
  gender: string;
  notes: string[];
  description: string;
  size: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Oud Royal",
    brand: "Maison Luxe",
    price: 189.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZ29sZHxlbnwxfHx8fDE3NzMwNzg4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "oriental",
    type: "eau-de-parfum",
    gender: "unisex",
    notes: ["Oud", "Ámbar", "Rosa"],
    description:
      "Una fragancia lujosa y profunda con notas de oud auténtico y ámbar dorado.",
    size: "100ml",
    inStock: true,
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 2,
    name: "Essence Pure",
    brand: "Minimal",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1743309043742-9b4976a16478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzczMTU2NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fresh",
    type: "eau-de-toilette",
    gender: "unisex",
    notes: ["Bergamota", "Té blanco", "Almizcle"],
    description: "Frescura minimalista con un toque de elegancia atemporal.",
    size: "75ml",
    inStock: true,
    rating: 4.6,
    reviews: 189,
  },
  {
    id: 3,
    name: "Mystique Noir",
    brand: "Arabesque",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1687202163645-8be2de10ba7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBlcmZ1bWUlMjBib3R0bGUlMjBkYXJrfGVufDF8fHx8MTc3MzE1Njc0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "oriental",
    type: "eau-de-parfum",
    gender: "hombre",
    notes: ["Pachulí", "Vainilla", "Tabaco"],
    description: "Intenso y seductor, perfecto para las noches especiales.",
    size: "100ml",
    inStock: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 4,
    name: "Rose Garden",
    brand: "Fleur Divine",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1761937841527-fac9281e53fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBwZXJmdW1lJTIwYm90dGxlJTIwcGlua3xlbnwxfHx8fDE3NzMxNTUzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "floral",
    type: "eau-de-parfum",
    gender: "mujer",
    notes: ["Rosa búlgara", "Jazmín", "Peonía"],
    description: "Un bouquet floral romántico y sofisticado.",
    size: "50ml",
    inStock: true,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 5,
    name: "Arctic Breeze",
    brand: "Minimal",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1770331168812-06a793129c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZXJmdW1lJTIwYm90dGxlJTIwd2hpdGV8ZW58MXx8fHwxNzczMTIyMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fresh",
    type: "eau-de-toilette",
    gender: "hombre",
    notes: ["Menta", "Cedro", "Vetiver"],
    description: "Frescura glacial para el hombre moderno.",
    size: "100ml",
    inStock: true,
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 6,
    name: "Amber Nights",
    brand: "Maison Luxe",
    price: 179.99,
    originalPrice: 219.99,
    image:
      "https://images.unsplash.com/photo-1759848547378-d59542dcb935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGUlMjBsdXh1cnl8ZW58MXx8fHwxNzczMDgwMTQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "woody",
    type: "eau-de-parfum",
    gender: "unisex",
    notes: ["Ámbar gris", "Sándalo", "Incienso"],
    description: "Calidez envolvente con profundidad amaderada.",
    size: "100ml",
    inStock: true,
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 7,
    name: "Citrus Harmony",
    brand: "Fleur Divine",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZ29sZHxlbnwxfHx8fDE3NzMwNzg4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fresh",
    type: "eau-de-cologne",
    gender: "unisex",
    notes: ["Naranja", "Limón", "Pomelo"],
    description: "Energía cítrica para comenzar el día con vitalidad.",
    size: "50ml",
    inStock: true,
    rating: 4.4,
    reviews: 143,
  },
  {
    id: 8,
    name: "Velvet Orchid",
    brand: "Arabesque",
    price: 169.99,
    image:
      "https://images.unsplash.com/photo-1743309043742-9b4976a16478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzczMTU2NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "floral",
    type: "eau-de-parfum",
    gender: "mujer",
    notes: ["Orquídea negra", "Ámbar", "Vainilla"],
    description: "Sensualidad floral con un toque oriental cautivador.",
    size: "75ml",
    inStock: false,
    rating: 4.9,
    reviews: 289,
  },
  {
    id: 9,
    name: "Cedar Forest",
    brand: "Minimal",
    price: 139.99,
    image:
      "https://images.unsplash.com/photo-1687202163645-8be2de10ba7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBlcmZ1bWUlMjBib3R0bGUlMjBkYXJrfGVufDF8fHx8MTc3MzE1Njc0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "woody",
    type: "eau-de-parfum",
    gender: "hombre",
    notes: ["Cedro", "Musgo", "Pimienta"],
    description: "Masculinidad natural con esencia de bosque.",
    size: "100ml",
    inStock: true,
    rating: 4.6,
    reviews: 201,
  },
  {
    id: 10,
    name: "Jasmine Dream",
    brand: "Fleur Divine",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1761937841527-fac9281e53fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBwZXJmdW1lJTIwYm90dGxlJTIwcGlua3xlbnwxfHx8fDE3NzMxNTUzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "floral",
    type: "eau-de-toilette",
    gender: "mujer",
    notes: ["Jazmín", "Neroli", "Almizcle blanco"],
    description: "Dulzura floral con elegancia primaveral.",
    size: "75ml",
    inStock: true,
    rating: 4.7,
    reviews: 178,
  },
  {
    id: 11,
    name: "Desert Mirage",
    brand: "Arabesque",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZ29sZHxlbnwxfHx8fDE3NzMwNzg4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "oriental",
    type: "extrait-de-parfum",
    gender: "unisex",
    notes: ["Azafrán", "Oud", "Dátiles"],
    description: "Lujo árabe en su máxima expresión.",
    size: "50ml",
    inStock: true,
    rating: 5.0,
    reviews: 342,
  },
  {
    id: 12,
    name: "Ocean Mist",
    brand: "Maison Luxe",
    price: 109.99,
    image:
      "https://images.unsplash.com/photo-1770331168812-06a793129c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZXJmdW1lJTIwYm90dGxlJTIwd2hpdGV8ZW58MXx8fHwxNzczMTIyMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fresh",
    type: "eau-de-toilette",
    gender: "unisex",
    notes: ["Sal marina", "Bergamota", "Ámbar gris"],
    description: "La brisa del mar en un frasco.",
    size: "100ml",
    inStock: true,
    rating: 4.5,
    reviews: 165,
  },
];

export const categories = [
  { value: "all", label: "Todos" },
  { value: "oriental", label: "Oriental" },
  { value: "floral", label: "Floral" },
  { value: "fresh", label: "Fresh" },
  { value: "woody", label: "Amaderado" },
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
