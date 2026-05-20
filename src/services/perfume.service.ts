import api from "../api/axios";

// 1. Define la interfaz EXACTAMENTE como salen los campos en tu JSON del Back
export interface Perfume {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  descripcion: string;
  imagenUrl: string; // Verifica si en Java es imagenUrl o imagen_url
  stock: number;
}

const getAll = async (): Promise<Perfume[]> => {
  try {
    const response = await api.get<Perfume[]>("/perfumes");
    return response.data;
  } catch (error) {
    console.error("Error en la petición de perfumes:", error);
    return []; // Retorna array vacío para que el Front no explote
  }
};

export default { getAll };
