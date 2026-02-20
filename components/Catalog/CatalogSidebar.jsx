const categories = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard']
const brands = ['LeafCore', 'MatchaPro', 'ZenWare', 'EcoTech']

export default function CatalogSidebar({ selectedCategories, toggleCategory, selectedBrand, setSelectedBrand, priceCap, setPriceCap }) {
  return (
    <aside className="window-container h-fit w-full border-none p-6 lg:sticky lg:top-28 lg:w-80">
      <h3 className="mb-6 text-xl font-bold">Filters</h3>

      <div className="mb-7">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--matcha-deep)]">Category</p>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`w-full rounded-xl px-4 py-2 text-left text-sm font-semibold transition ${
                selectedCategories.includes(category)
                  ? 'bg-[var(--baby-green)] text-[var(--matcha-deep)]'
                  : 'bg-[var(--off-white)] text-[var(--charcoal-dark)] hover:bg-[var(--baby-green)]/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--matcha-deep)]">Brand</p>
        <select
          value={selectedBrand}
          onChange={(event) => setSelectedBrand(event.target.value)}
          className="w-full rounded-xl border-none bg-[var(--off-white)] px-4 py-3 font-medium focus:ring-2 focus:ring-[var(--baby-green)]"
        >
          <option value="All">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--matcha-deep)]">Max Price</p>
          <span className="rounded-full bg-[var(--baby-green)] px-3 py-1 text-xs font-bold">${priceCap}</span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          step="10"
          value={priceCap}
          onChange={(event) => setPriceCap(Number(event.target.value))}
          className="w-full accent-[var(--matcha-deep)]"
        />
      </div>
    </aside>
  )
}
