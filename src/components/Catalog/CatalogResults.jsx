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
            <div key={product.id} className="window-container flex flex-col items-start gap-4 border-none p-4 sm:flex-row sm:items-center">
              <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-matcha-deep">{product.brand}</p>
                <h4 className="text-lg font-bold">{product.name}</h4>
                <p className="text-sm text-charcoal-dark/60">{product.category} • ⭐ {product.rating}</p>
              </div>
              <div className="w-full text-left sm:w-auto sm:text-right">
                <p className="text-2xl font-bold text-matcha-deep">{product.price}</p>
                <Link to={`/product/${product.id}`} className="mt-2 inline-block rounded-lg bg-baby-green px-4 py-2 text-sm font-bold text-charcoal-dark transition-colors hover:bg-baby-green/80">
                  Open
                </Link>
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
