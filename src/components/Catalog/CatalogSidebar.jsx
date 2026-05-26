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
      <div className="bg-matcha-bg border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] lg:shadow-brutal mb-8 lg:sticky lg:top-32 relative overflow-hidden">
        {/* Dot Grid Background */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6 border-b-2 border-pure-black pb-2">
            <h3 className="text-2xl font-display font-black uppercase tracking-widest text-black">Filter</h3>
            <span className="material-symbols-outlined text-2xl font-black">tune</span>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-display font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">category</span> Category
            </h4>
            <div className="space-y-3">
              {categories.length > 0 ? (
                categories.map((category) => {
                  const isSelected = queryCategory === category.name
                  return (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleCategoryClick(category.name)}>
                      <div className={`relative w-6.5 h-6.5 border-3 border-black transition-all flex items-center justify-center ${isSelected ? 'bg-pure-black shadow-brutal-sm' : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-matcha-bg"></div>}
                      </div>
                      <span className="font-black uppercase tracking-wider text-xs sm:text-sm group-hover:text-matcha-dark transition-colors">{category.name}</span>
                    </label>
                  )
                })
              ) : (
                <p className="text-sm font-bold uppercase tracking-wider text-charcoal">Loading...</p>
              )}
              {/* All option */}
              <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setSearchParams({})}>
                <div className={`relative w-6.5 h-6.5 border-3 border-black transition-all flex items-center justify-center ${!queryCategory ? 'bg-pure-black shadow-brutal-sm' : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}>
                  {!queryCategory && <div className="w-2.5 h-2.5 rounded-full bg-matcha-bg"></div>}
                </div>
                <span className="font-black uppercase tracking-wider text-xs sm:text-sm group-hover:text-matcha-dark transition-colors">All</span>
              </label>
            </div>
          </div>

          {subCategories.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm font-display font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">account_tree</span> Subcategory
              </h4>
              <div className="space-y-3">
                {subCategories.map((subCat) => {
                  const isSelected = selectedSubCategories.includes(subCat.name)
                  return (
                    <label key={subCat.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSubCategory(subCat.name)}>
                      <div className={`relative w-6.5 h-6.5 border-3 border-black transition-all flex items-center justify-center ${isSelected ? 'bg-pure-black shadow-brutal-sm' : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-matcha-bg"></div>}
                      </div>
                      <span className="font-black uppercase tracking-wider text-xs sm:text-sm group-hover:text-matcha-dark transition-colors">{subCat.name}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {brands.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm font-display font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">branding_watermark</span> Brand
              </h4>
              <div className="relative group">
                <select
                  value={selectedBrand}
                  onChange={(event) => setSelectedBrand(event.target.value)}
                  className="w-full bg-white border-3 border-black p-3 font-bold uppercase tracking-wider text-xs sm:text-sm outline-none focus:bg-[#f3f6f1] transition-all cursor-pointer appearance-none shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5"
                >
                  <option value="All">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">expand_more</span>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-display font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
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
              <div className="flex justify-between text-xs font-black font-mono bg-pure-black text-matcha-bg border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_#fff]">
                <span>₹100</span>
                <span>₹{priceCap.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
