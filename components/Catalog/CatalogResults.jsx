import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'

export default function CatalogResults({ products, view, page, setPage, totalPages }) {
  return (
    <section>
      <div className="mb-6 rounded-[var(--radius-squish)] border-2 border-dashed border-[var(--baby-green)] bg-[var(--off-white)] p-6">
        <p className="text-xs font-bold tracking-widest text-[var(--matcha-deep)] uppercase">Weekly Deal</p>
        <h3 className="mt-2 text-2xl font-bold">Build Bundle Savings up to 35%</h3>
        <p className="mt-1 text-sm font-medium text-[color:var(--charcoal-dark)]/70">Pair a CPU + motherboard + RAM and unlock automatic combo discounts in checkout.</p>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} actionLabel="View Product" onAction={() => {}} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="window-container flex flex-col items-start gap-4 border-none p-4 sm:flex-row sm:items-center">
              <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--matcha-deep)]">{product.brand}</p>
                <h4 className="text-lg font-bold">{product.name}</h4>
                <p className="text-sm text-[color:var(--charcoal-dark)]/60">{product.category} • ⭐ {product.rating}</p>
              </div>
              <div className="w-full text-left sm:w-auto sm:text-right">
                <p className="text-2xl font-bold text-[var(--matcha-deep)]">{product.price}</p>
                <Link to="/product" className="mt-2 inline-block rounded-lg bg-[var(--baby-green)] px-4 py-2 text-sm font-bold text-[var(--charcoal-dark)]">
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
          className="rounded-xl bg-[var(--off-white)] px-4 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm font-bold">Page {page} of {totalPages}</p>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="rounded-xl bg-[var(--baby-green)] px-4 py-2 font-bold text-[var(--charcoal-dark)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  )
}
