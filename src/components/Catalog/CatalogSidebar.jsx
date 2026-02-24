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
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-matcha-bg border-4 border-black p-6 shadow-brutal mb-8 lg:sticky lg:top-32">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black uppercase tracking-widest text-black">Filter</h3>
          <span className="material-symbols-outlined text-2xl font-black">tune</span>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">category</span> Category
          </h4>
          <div className="space-y-3">
            {categories.length > 0 ? (
              categories.map((category) => {
                const isSelected = queryCategory === category.name
                return (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleCategoryClick(category.name)}>
                    <div className="relative w-6 h-6 border-4 border-black bg-white group-hover:bg-matcha-dark transition-colors flex items-center justify-center">
                      <div className={`w-3 h-3 bg-black ${isSelected ? 'block' : 'hidden'}`}></div>
                    </div>
                    <span className="font-bold uppercase tracking-wider text-sm group-hover:underline">{category.name}</span>
                  </label>
                )
              })
            ) : (
              <p className="text-sm font-bold uppercase tracking-wider text-charcoal">Loading...</p>
            )}
            {/* All option */}
            <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setSearchParams({})}>
              <div className="relative w-6 h-6 border-4 border-black bg-white group-hover:bg-matcha-dark transition-colors flex items-center justify-center">
                <div className={`w-3 h-3 bg-black ${!queryCategory ? 'block' : 'hidden'}`}></div>
              </div>
              <span className="font-bold uppercase tracking-wider text-sm group-hover:underline">All</span>
            </label>
          </div>
        </div>

        {subCategories.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">account_tree</span> Subcategory
            </h4>
            <div className="space-y-3">
              {subCategories.map((subCat) => {
                const isSelected = selectedSubCategories.includes(subCat.name)
                return (
                  <label key={subCat.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSubCategory(subCat.name)}>
                    <div className="relative w-6 h-6 border-4 border-black bg-white group-hover:bg-matcha-dark transition-colors flex items-center justify-center">
                      <div className={`w-3 h-3 bg-black ${isSelected ? 'block' : 'hidden'}`}></div>
                    </div>
                    <span className="font-bold uppercase tracking-wider text-sm group-hover:underline">{subCat.name}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {brands.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">branding_watermark</span> Brand
            </h4>
            <select
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
              className="w-full bg-white border-4 border-black p-3 font-bold uppercase tracking-wider text-sm outline-none focus:bg-matcha-dark transition-colors cursor-pointer appearance-none"
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
          <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">sell</span> Max Price
          </h4>
          <div className="space-y-4">
            <input
              type="range"
              min="100"
              max="1000000"
              step="1000"
              value={priceCap}
              onChange={(event) => setPriceCap(Number(event.target.value))}
              className="w-full accent-black h-2 bg-white border-2 border-black appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs font-black font-mono bg-white border-2 border-black px-2 py-1">
              <span>₹100</span>
              <span>₹{priceCap.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  )
}
