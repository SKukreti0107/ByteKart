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
            <div key={product.id} className="window-container flex flex-row items-center gap-3 sm:gap-4 border-none p-3 sm:p-4">
              <Link to={`/product/${product.id}`} className="shrink-0 block bg-pure-white rounded-xl overflow-hidden aspect-square h-24 w-24 sm:h-32 sm:w-32">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 overflow-hidden">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-matcha-deep line-clamp-1">{product.brand}</p>
                  <Link to={`/product/${product.id}`} className="block">
                    <h4 className="text-sm sm:text-lg font-bold line-clamp-1 sm:line-clamp-none hover:text-baby-green transition-colors">{product.name}</h4>
                  </Link>
                  <p className="text-xs sm:text-sm text-charcoal-dark/60 line-clamp-1">{product.category} • ⭐ {product.rating}</p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center">
                  <p className="text-lg sm:text-2xl font-bold text-matcha-deep">{product.price}</p>
                  <Link to={`/product/${product.id}`} className="rounded-lg bg-baby-green px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-charcoal-dark transition-colors hover:bg-baby-green/80">
                    Open
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="rounded-xl bg-off-white px-4 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm font-bold">Page {page} of {totalPages}</p>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="rounded-xl bg-baby-green px-4 py-2 font-bold text-charcoal-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  )
}
