export default function CatalogToolbar({ sortBy, setSortBy, view, setView, resultCount }) {
  return (
    <div className="window-container mb-6 flex flex-wrap items-center justify-between gap-4 border-none px-6 py-4">
      <div>
        <h2 className="text-2xl font-bold">Catalog</h2>
        <p className="text-sm font-medium text-charcoal-dark/60">{resultCount} products found</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-xl border-none bg-off-white px-4 py-2.5 font-semibold focus:ring-2 focus:ring-baby-green"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>

        <div className="hidden sm:flex rounded-xl bg-off-white p-1">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={`rounded-lg px-3 py-2 text-sm font-bold ${view === 'grid' ? 'bg-baby-green text-matcha-deep' : 'text-charcoal-dark/60'
              }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`rounded-lg px-3 py-2 text-sm font-bold ${view === 'list' ? 'bg-baby-green text-matcha-deep' : 'text-charcoal-dark/60'
              }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  )
}
