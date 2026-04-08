// src/components/Sidebar.jsx
export function Sidebar() {
  return (
    <aside className="w-64 bg-white p-8 border-r border-gray-50 hidden lg:block">
      <div className="sticky top-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-8">
          Explorar
        </h2>

        <section className="mb-10">
          <h3 className="text-sm font-bold mb-4 text-gray-400">Familias</h3>
          <ul className="space-y-3 text-sm font-medium text-gray-500">
            <li className="hover:text-black transition-colors cursor-default">Florales</li>
            <li className="hover:text-black transition-colors cursor-default">Cítricos</li>
            <li className="hover:text-black transition-colors cursor-default">Amaderados</li>
            <li className="hover:text-black transition-colors cursor-default">Orientales</li>
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-bold mb-4 text-gray-400">Marcas Destacadas</h3>
          <ul className="space-y-3 text-sm font-medium text-gray-500">
            <li className="hover:text-black transition-colors cursor-default">Chanel</li>
            <li className="hover:text-black transition-colors cursor-default">Dior</li>
            <li className="hover:text-black transition-colors cursor-default">Tom Ford</li>
          </ul>
        </section>
      </div>
    </aside>
  );
}

export default Sidebar;