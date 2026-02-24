export default function CatalogToolbar({ sortBy, setSortBy, view, setView, resultCount }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white border-4 border-black p-4 shadow-brutal-sm">
      <div>
        <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-black">Catalog</h2>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">{resultCount} products found</p>
      </div>

      <div className="flex flex-wrap gap-4 w-full md:w-auto">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="bg-white border-4 border-black p-3 font-bold uppercase tracking-wider text-sm outline-none focus:bg-matcha-bg transition-colors w-full md:w-auto appearance-none cursor-pointer text-center"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Sort: Rating</option>
        </select>

        <div className="flex border-4 border-black hidden sm:flex">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={`p-3 flex items-center justify-center transition-colors ${view === 'grid' ? 'bg-black text-matcha-bg' : 'bg-white text-black hover:bg-matcha-bg'}`}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`p-3 flex items-center justify-center transition-colors ${view === 'list' ? 'bg-black text-matcha-bg' : 'bg-white text-black hover:bg-matcha-bg'}`}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </div>
    </div>
  )
}
