import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { PackagePlus, Image as ImageIcon, Euro, Hash, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();  // Necesitamos el token JWT para las peticiones protegidas
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estado del formulario de nuevo perfume
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagenUrl: "",
    idCategoria: 1,
    idGenero: 1,
    enOferta: false,
    marca: { id_marca: 1 },
  });

  const [marcasDB, setMarcasDB] = useState<any[]>([]);          // Lista de marcas del backend
  const [showNuevaMarca, setShowNuevaMarca] = useState(false);  // Toggle del mini-formulario de marca
  const [nombreNuevaMarca, setNombreNuevaMarca] = useState(""); // Campo del mini-formulario

  // Cabeceras reutilizables que incluyen el JWT en cada petición protegida
  // El backend leerá este token para verificar que el usuario es ADMIN
  const authHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user?.token}`,
  };

  // Al montar el componente, cargamos las marcas disponibles para el selector
  useEffect(() => {
    fetch("http://localhost:8080/api/marcas", { headers: authHeaders })
      .then((res) => res.json())
      .then((data) => setMarcasDB(data))
      .catch(() => toast.error("Error cargando marcas"));
  }, []);

  // Crea una nueva marca en el backend y la añade al selector sin recargar
  const handleAddMarca = async () => {
    if (!nombreNuevaMarca.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/api/marcas/agregar", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          nombre: nombreNuevaMarca.trim(),
          pais_origen: "España",
          activo: 1,
        }),
      });

      if (res.ok) {
        const nueva = await res.json();
        setMarcasDB([...marcasDB, nueva]); // Actualiza el selector en tiempo real
        toast.success(`Marca '${nueva.nombre}' creada`);
        setNombreNuevaMarca("");
        setShowNuevaMarca(false);
      } else {
        const errorText = await res.text();
        toast.error(errorText || "Error al crear la marca");
      }
    } catch {
      toast.error("No se pudo conectar con el servidor");
    }
  };

  // Envía el formulario completo al backend para guardar el perfume
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/perfumes/agregar", {
        method: "POST",
        headers: authHeaders,  // Token JWT incluido → el backend verifica rol ADMIN
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("¡Perfume añadido correctamente!");
        // Limpiamos el formulario para poder añadir otro perfume
        setFormData({
          nombre: "",
          descripcion: "",
          precio: 0,
          stock: 0,
          imagenUrl: "",
          idCategoria: 1,
          idGenero: 1,
          enOferta: false,
          marca: { id_marca: marcasDB[0]?.id_marca || 1 },
        });
      } else {
        const msg = await response.text();
        toast.error(msg || "Error al guardar el perfume");
      }
    } catch {
      toast.error("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Cabecera del panel con nombre del admin logueado */}
        <div className="bg-black p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PackagePlus className="w-6 h-6" />
            <h1 className="text-xl font-bold">Panel de Administración</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">{user?.nombre}</p>
            <p className="text-xs text-amber-400">ADMIN</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Nombre del perfume */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Perfume
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          {/* Selector de marca con opción de crear nueva en línea */}
          <div className="md:col-span-2 space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Marca del Perfume
            </label>
            <div className="flex gap-2">
              <select
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                value={formData.marca.id_marca}
                onChange={(e) =>
                  setFormData({ ...formData, marca: { id_marca: Number(e.target.value) } })
                }
              >
                {marcasDB.map((m) => (
                  <option key={m.id_marca} value={m.id_marca}>
                    {m.nombre}
                  </option>
                ))}
              </select>
              {/* Botón "+" para mostrar/ocultar el mini-formulario de nueva marca */}
              <button
                type="button"
                onClick={() => setShowNuevaMarca(!showNuevaMarca)}
                className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                title="Añadir nueva marca"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Mini-formulario de nueva marca (solo visible al pulsar "+") */}
            {showNuevaMarca && (
              <div className="flex gap-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <input
                  placeholder="Nombre de la nueva marca..."
                  className="flex-1 px-3 py-1 border rounded"
                  value={nombreNuevaMarca}
                  onChange={(e) => setNombreNuevaMarca(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddMarca}
                  className="bg-blue-600 text-white px-4 py-1 rounded text-sm font-bold"
                >
                  Añadir
                </button>
              </div>
            )}
          </div>

          {/* Categoría: IDs mapeados igual que en Home.tsx */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.idCategoria}
              onChange={(e) => setFormData({ ...formData, idCategoria: Number(e.target.value) })}
            >
              <option value={1}>Amaderado</option>
              <option value={2}>Fresco</option>
              <option value={3}>Oriental</option>
              <option value={4}>Floral</option>
              <option value={5}>Aromático</option>
            </select>
          </div>

          {/* Género: IDs mapeados igual que en Home.tsx */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.idGenero}
              onChange={(e) => setFormData({ ...formData, idGenero: Number(e.target.value) })}
            >
              <option value={1}>Hombre</option>
              <option value={2}>Mujer</option>
              <option value={3}>Unisex</option>
            </select>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Euro className="w-3 h-3" /> Precio (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Hash className="w-3 h-3" /> Stock inicial
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            />
          </div>

          {/* Nombre de imagen: debe coincidir con el archivo en /public/productos/ */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Nombre del archivo de imagen (ej: sauvage.jpg)
            </label>
            <input
              type="text"
              placeholder="Escribe el nombre del archivo que subirás a la carpeta public"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={formData.imagenUrl}
              onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
            />
          </div>

          {/* Checkbox oferta: si se activa, el frontend mostrará el precio con -20% */}
          <div className="flex items-center gap-2 md:col-span-2 py-2">
            <input
              type="checkbox"
              id="oferta"
              className="w-4 h-4 accent-black"
              checked={formData.enOferta}
              onChange={(e) => setFormData({ ...formData, enOferta: e.target.checked })}
            />
            <label htmlFor="oferta" className="text-sm font-bold text-red-600 uppercase">
              ¿Activar precio de oferta (-20%)?
            </label>
          </div>

          {/* Botón submit: deshabilitado mientras se espera respuesta del backend */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Guardando..." : "GUARDAR PERFUME"}
          </button>
        </form>
      </div>
    </div>
  );
}
