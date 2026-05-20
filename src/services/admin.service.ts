import api from "../api/axios";

export interface AdminPerfumeRequest {
  nombre: string;
  descripcion?: string;
  precio?: number;
  imagenUrl?: string;
  stock?: number;
  enOferta?: boolean;
  idGenero?: number;
  idCategoria?: number;
  idMarca?: number;
}

export interface AdminMarcaRequest {
  nombre: string;
  paisOrigen?: string;
  descripcion?: string;
  activo?: number;
  logoUrl?: string;
}

export interface CategoriaDTO {
  id: number;
  nombre: string;
  activo?: number;
}

export interface MarcaDTO {
  id: number;
  nombre: string;
  paisOrigen?: string;
  descripcion?: string;
  activo?: number;
  logoUrl?: string;
}

export interface AdminPerfumeDTO {
  id: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  imagenUrl?: string;
  stock?: number;
  enOferta?: boolean;
  idGenero?: number;
  genero?: string;
  idCategoria?: number;
  categoria?: string;
  marca?: MarcaDTO;
}

const getAdminPerfumes = async (): Promise<AdminPerfumeDTO[]> => {
  const response = await api.get<AdminPerfumeDTO[]>("/admin/perfumes");
  return response.data;
};

const createPerfume = async (payload: AdminPerfumeRequest) => {
  const response = await api.post<AdminPerfumeDTO>("/admin/perfumes", payload);
  return response.data;
};

const updatePerfume = async (id: number, payload: AdminPerfumeRequest) => {
  const response = await api.put<AdminPerfumeDTO>(
    `/admin/perfumes/${id}`,
    payload,
  );
  return response.data;
};

const deletePerfume = async (id: number) => {
  await api.delete(`/admin/perfumes/${id}`);
};

const getCategories = async (): Promise<CategoriaDTO[]> => {
  const response = await api.get<CategoriaDTO[]>("/categorias");
  return response.data;
};

const getBrands = async (): Promise<MarcaDTO[]> => {
  const response = await api.get<MarcaDTO[]>("/admin/marcas");
  return response.data;
};

const createBrand = async (payload: AdminMarcaRequest) => {
  const response = await api.post<MarcaDTO>("/admin/marcas", payload);
  return response.data;
};

export default {
  getAdminPerfumes,
  createPerfume,
  updatePerfume,
  deletePerfume,
  getCategories,
  getBrands,
  createBrand,
};
