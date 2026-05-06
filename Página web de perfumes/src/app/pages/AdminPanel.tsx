import { FormEvent, useEffect, useMemo, useState } from "react";
import { PlusCircle, Trash2, Pencil, Loader2 } from "lucide-react";
import adminService, {
  AdminMarcaRequest,
  AdminPerfumeDTO,
  AdminPerfumeRequest,
  CategoriaDTO,
  MarcaDTO,
} from "../../services/admin.service";
import { Header } from "../components/Header";

const initialPerfume: AdminPerfumeRequest = {
  nombre: "",
  descripcion: "",
  precio: 0,
  imagenUrl: "",
  stock: 0,
  enOferta: false,
  idGenero: 3,
  idCategoria: 1,
  idMarca: 1,
};

export default function AdminPanel() {
  const [perfumes, setPerfumes] = useState<AdminPerfumeDTO[]>([]);
  const [marcas, setMarcas] = useState<MarcaDTO[]>([]);
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const [form, setForm] = useState<AdminPerfumeRequest>(initialPerfume);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [perfumesData, marcasData, categoriasData] = await Promise.all([
        adminService.getAdminPerfumes(),
        adminService.getBrands(),
        adminService.getCategories(),
      ]);
      setPerfumes(perfumesData || []);
      setMarcas(marcasData || []);
      setCategorias(categoriasData || []);
    } catch (err: any) {
      console.error(err);
      setError(
        "No se pudo cargar la información del administrador. Revisa tu token o el backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const resetForm = () => {
    setSelectedId(null);
    setForm(initialPerfume);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (selectedId) {
        await adminService.updatePerfume(selectedId, form);
      } else {
        await adminService.createPerfume(form);
      }
      await loadAdminData();
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(
        "Error al guardar el producto. Comprueba los datos y vuelve a intentar.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deletePerfume(id);
      await loadAdminData();
    } catch (err: any) {
      console.error(err);
      setError("No se pudo eliminar el producto. Intenta de nuevo.");
    }
  };

  const startEdit = (perfume: AdminPerfumeDTO) => {
    setSelectedId(perfume.id);
    setForm({
      nombre: perfume.nombre || "",
      descripcion: perfume.descripcion || "",
      precio: perfume.precio ?? 0,
      imagenUrl: perfume.imagenUrl || "",
      stock: perfume.stock ?? 0,
      enOferta: perfume.enOferta ?? false,
      idGenero: perfume.idGenero ?? 3,
      idCategoria: perfume.idCategoria ?? categorias[0]?.id ?? 1,
      idMarca: perfume.marca?.id ?? marcas[0]?.id ?? 1,
    });
  };

  const handleBrandSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!brandName.trim()) {
      return setError("El nombre de la marca no puede estar vacío.");
    }

    const payload: AdminMarcaRequest = {
      nombre: brandName.trim(),
      descripcion: "Marca creada desde el panel admin",
      activo: 1,
    };

    try {
      await adminService.createBrand(payload);
      setBrandName("");
      await loadAdminData();
    } catch (err: any) {
      console.error(err);
      setError(
        "No se pudo crear la marca. Comprueba los datos e inténtalo de nuevo.",
      );
    }
  };

  const formIsValid = useMemo(
    () =>
      Boolean(
        form.nombre && form.precio != null && form.idMarca && form.idCategoria,
      ),
    [form],
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={() => {}} searchValue="" />
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Panel de administración
                  </h2>
                  <p className="text-gray-600">
                    Gestiona perfumes, marcas y categorías desde el backend.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-amber-700">
                  <PlusCircle className="w-5 h-5" /> Admin
                </div>
              </div>

              {error && (
                <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Marca
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Categoría
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Precio
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {perfumes.map((perfume) => (
                      <tr key={perfume.id}>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {perfume.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {perfume.nombre}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {perfume.marca?.nombre || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {perfume.categoria || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {perfume.precio?.toFixed(2) ?? "0.00"}€
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 space-x-2">
                          <button
                            onClick={() => startEdit(perfume)}
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <Pencil className="w-3.5 h-3.5" /> Editar
                          </button>
                          <button
                            onClick={() => handleDelete(perfume.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Agregar / editar perfume
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Nombre
                    </span>
                    <input
                      value={form.nombre}
                      onChange={(event) =>
                        setForm({ ...form, nombre: event.target.value })
                      }
                      className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                      placeholder="Nombre del perfume"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Precio
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={form.precio}
                      onChange={(event) =>
                        setForm({ ...form, precio: Number(event.target.value) })
                      }
                      className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Stock
                    </span>
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(event) =>
                        setForm({ ...form, stock: Number(event.target.value) })
                      }
                      className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Género
                    </span>
                    <select
                      value={form.idGenero}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          idGenero: Number(event.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    >
                      <option value={1}>Hombre</option>
                      <option value={2}>Mujer</option>
                      <option value={3}>Unisex</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Marca
                    </span>
                    <select
                      value={form.idMarca}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          idMarca: Number(event.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    >
                      {marcas.map((marca) => (
                        <option key={marca.id} value={marca.id}>
                          {marca.nombre}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Categoría
                    </span>
                    <select
                      value={form.idCategoria}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          idCategoria: Number(event.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Imagen URL
                  </span>
                  <input
                    value={form.imagenUrl}
                    onChange={(event) =>
                      setForm({ ...form, imagenUrl: event.target.value })
                    }
                    className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="https://..."
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Descripción
                  </span>
                  <textarea
                    value={form.descripcion}
                    onChange={(event) =>
                      setForm({ ...form, descripcion: event.target.value })
                    }
                    className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    rows={4}
                  />
                </label>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={Boolean(form.enOferta)}
                      onChange={(event) =>
                        setForm({ ...form, enOferta: event.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    En oferta
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={!formIsValid || saving}
                    className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-6 py-3 text-white font-semibold hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {selectedId ? "Actualizar producto" : "Crear producto"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50"
                  >
                    Limpiar formulario
                  </button>
                </div>
              </form>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Marcas</h3>
              <form onSubmit={handleBrandSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Nueva marca
                  </span>
                  <input
                    value={brandName}
                    onChange={(event) => setBrandName(event.target.value)}
                    className="mt-1 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="Nombre de marca"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-white font-semibold hover:bg-amber-700"
                >
                  Agregar marca
                </button>
              </form>
              <div className="mt-6 space-y-2">
                {marcas.map((marca) => (
                  <div
                    key={marca.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
                  >
                    <p className="font-semibold">{marca.nombre}</p>
                    <p>{marca.paisOrigen || "Origen no disponible"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Categorías</h3>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
                  >
                    <p className="font-semibold">{categoria.nombre}</p>
                    <p>{categoria.activo === 1 ? "Activo" : "Inactivo"}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
