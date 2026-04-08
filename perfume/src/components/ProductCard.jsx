// src/components/ProductCard.jsx

export function ProductCard({ product }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100">
      {/* Imagen del producto real (ahora usa product.imgUrl) */}
      <div className="aspect-square bg-white rounded-xl mb-5 flex items-center justify-center overflow-hidden">
        <img 
          src={product.imgUrl} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
        />
      </div>

      {/* Info del producto */}
      <div className="flex-grow">
        <p className="text-xs text-pink-600 font-semibold mb-1">Eau de Parfum</p>
        <h3 className="font-semibold text-lg text-gray-950 mb-1 group-hover:text-pink-700">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      </div>

      {/* Precio + botón */}
      <div className="flex justify-between items-end mt-2 pt-3 border-t border-gray-100">
        <span className="font-bold text-2xl text-gray-950">{product.price.toFixed(2)}€</span>

        <button className="text-sm bg-gray-950 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
          Añadir
        </button>
      </div>
    </div>
  );
}

export default ProductCard;