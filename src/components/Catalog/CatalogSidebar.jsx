import { useSearchParams } from 'react-router-dom'

export default function CatalogSidebar({
  categories,
  queryCategory,
  selectedSubCategories,
  toggleSubCategory,
  selectedBrand,
  setSelectedBrand,
  priceCap,
  setPriceCap,
  subCategories,
  brands
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleCategoryClick = (categoryName) => {
    setSearchParams({ category: categoryName })
  }

  return (
    <aside className="window-container h-fit w-full border-none p-6 lg:sticky lg:top-28 lg:w-80">
      <h3 className="mb-6 text-xl font-bold">Filters</h3>

      <div className="mb-7">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-matcha-deep">Category</p>
        <div className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.name)}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm font-semibold transition ${queryCategory === category.name
                  ? 'bg-baby-green text-matcha-deep'
                  : 'bg-off-white text-charcoal-dark hover:bg-baby-green/60'
                  }`}
              >
                {category.name}
              </button>
            ))
          ) : (
            <p className="text-sm text-charcoal-dark/60">Loading...</p>
          )}
        </div>
      </div>

      {subCategories.length > 0 && (
        <div className="mb-7">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-matcha-deep">Subcategory</p>
          <div className="space-y-2">
            {subCategories.map((subCat) => (
              <button
                key={subCat.id}
                type="button"
                onClick={() => toggleSubCategory(subCat.name)}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm font-semibold transition ${selectedSubCategories.includes(subCat.name)
                  ? 'bg-baby-green text-matcha-deep'
                  : 'bg-off-white text-charcoal-dark hover:bg-baby-green/60'
                  }`}
              >
                {subCat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {brands.length > 0 && (
        <div className="mb-7">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-matcha-deep">Brand</p>
          <select
            value={selectedBrand}
            onChange={(event) => setSelectedBrand(event.target.value)}
            className="w-full rounded-xl border-none bg-off-white px-4 py-3 font-medium focus:ring-2 focus:ring-baby-green"
          >
            <option value="All">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-wider text-matcha-deep">Max Price</p>
          <span className="rounded-full bg-baby-green px-3 py-1 text-xs font-bold">₹{priceCap.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="100"
          max="1000000"
          step="1000"
          value={priceCap}
          onChange={(event) => setPriceCap(Number(event.target.value))}
          className="w-full accent-matcha-deep"
        />
      </div>
    </aside>
  )
}
