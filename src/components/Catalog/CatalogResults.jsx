import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'

export default function CatalogResults({ products, view, page, setPage, totalPages }) {
  return (
    <section>
      {view === 'grid' ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} actionLabel="QUICK ADD TO CART" />

            // <ProductCard key={product.id} product={product} actionLabel="QUICK ADD TO CART" onAction={() => window.location.href = `/product/${product.id}`} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="bg-pure-white border-4 border-pure-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-0 items-stretch group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all overflow-hidden">
              <Link to={`/product/${product.id}`} className="shrink-0 block aspect-square h-32 w-full sm:w-32 border-b-4 sm:border-b-0 sm:border-r-4 border-pure-black bg-[#f4f7f2] group-hover:bg-[#ebf1e8] p-3 flex items-center justify-center transition-colors">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply group-hover:scale-[1.08] group-hover:rotate-2 transition-transform duration-500" />
              </Link>
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center p-4 sm:p-5 gap-4 sm:gap-6 overflow-hidden w-full bg-pure-white">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#4A5D44] bg-[#E8EFE5] px-2 py-0.5 border border-black shadow-brutal-sm">{product.brand}</p>
                  </div>
                  <Link to={`/product/${product.id}`} className="block">
                    <h4 className="text-lg sm:text-xl font-display font-black uppercase line-clamp-2 hover:text-matcha-dark transition-colors">{product.name}</h4>
                  </Link>
                  <p className="text-xs font-bold text-gray-400 tracking-wide mt-2">{product.category}</p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-4 border-t-2 sm:border-t-0 border-gray-100 pt-3 sm:pt-0 w-full sm:w-auto">
                  <p className="text-xl sm:text-2xl font-black text-black">{product.price}</p>
                  <button onClick={() => window.location.href = `/product/${product.id}`} className="bg-matcha-bg text-pure-black px-6 py-2.5 sm:px-8 sm:py-3 font-black uppercase tracking-widest text-xs border-2 border-pure-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-pure-black hover:text-matcha-bg hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-3 flex-wrap">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className={`w-12 h-12 flex items-center justify-center border-4 font-black transition-all ${
              page === 1 
                ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'bg-white text-black border-black hover:bg-matcha-bg shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
            }`}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`hidden sm:flex w-12 h-12 font-display font-black text-lg border-4 transition-all items-center justify-center ${
                p === page 
                  ? 'bg-black text-matcha-bg border-black shadow-none translate-x-[2px] translate-y-[2px]' 
                  : 'bg-white text-black border-black hover:bg-matcha-bg shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
            >
              {p}
            </button>
          ))}

          <span className="sm:hidden flex items-center justify-center font-black text-xs uppercase tracking-widest px-3 border-2 border-black bg-pure-black text-matcha-bg shadow-brutal-sm">
            Page {page} / {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className={`w-12 h-12 flex items-center justify-center border-4 font-black transition-all ${
              page === totalPages 
                ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'bg-white text-black border-black hover:bg-matcha-bg shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
            }`}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </section>
  )
}
