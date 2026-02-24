import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'

export default function CatalogResults({ products, view, page, setPage, totalPages }) {
  return (
    <section>
      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} actionLabel="View Product" onAction={() => window.location.href = `/product/${product.id}`} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-pure-white border-4 border-black p-4 shadow-brutal flex flex-col sm:flex-row gap-6 items-center group hover:-translate-y-1 transition-transform">
              <Link to={`/product/${product.id}`} className="shrink-0 block aspect-square h-24 w-24 sm:h-32 sm:w-32 border-4 border-black bg-[#f9f9f9] p-2 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
              </Link>
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 overflow-hidden w-full">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-black mb-1">{product.brand}</p>
                  <Link to={`/product/${product.id}`} className="block">
                    <h4 className="text-lg sm:text-xl font-black uppercase line-clamp-2 hover:text-matcha-dark transition-colors">{product.name}</h4>
                  </Link>
                  <p className="text-xs sm:text-sm font-bold text-gray-500 tracking-wide mt-2">{product.category}</p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-3">
                  <p className="text-2xl sm:text-3xl font-black text-black">{product.price}</p>
                  <button onClick={() => window.location.href = `/product/${product.id}`} className="bg-matcha-bg text-black px-6 py-2 sm:px-8 sm:py-3 font-black uppercase tracking-widest text-xs sm:text-sm border-4 border-black shadow-brutal-sm hover:translate-y-1 hover:translate-x-1 hover:shadow-none hover:bg-black hover:text-matcha-bg transition-all">
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-2 flex-wrap">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className={`w-12 h-12 flex items-center justify-center border-4 font-black transition-all ${page === 1 ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' : 'bg-white text-black border-black hover:bg-matcha-bg hover:-translate-y-1 shadow-brutal-sm hover:shadow-none'}`}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`hidden sm:flex w-12 h-12 font-black text-lg border-4 transition-all items-center justify-center shadow-brutal-sm ${p === page ? 'bg-black text-matcha-bg border-black' : 'bg-white text-black border-black hover:bg-matcha-bg hover:-translate-y-1 hover:shadow-none'}`}
            >
              {p}
            </button>
          ))}

          <span className="sm:hidden flex items-center justify-center font-black text-lg px-2">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className={`w-12 h-12 flex items-center justify-center border-4 font-black transition-all ${page === totalPages ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' : 'bg-white text-black border-black hover:bg-matcha-bg hover:-translate-y-1 shadow-brutal-sm hover:shadow-none'}`}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </section>
  )
}
