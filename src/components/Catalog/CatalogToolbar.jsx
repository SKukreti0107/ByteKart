export default function CatalogToolbar({ sortBy, setSortBy, view, setView, resultCount }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-[#f4f7f2] border-4 border-black p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:12px_12px]"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-black">Catalog</h2>
        <p className="text-xs font-black text-gray-500 uppercase tracking-widest mt-1">{resultCount} products found</p>
      </div>

      <div className="flex flex-wrap gap-4 w-full md:w-auto relative z-10">
        <div className="relative group w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full bg-white border-3 border-black p-3 pr-10 font-bold uppercase tracking-wider text-xs sm:text-sm outline-none focus:bg-[#f3f6f1] transition-all cursor-pointer appearance-none shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Sort: Rating</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">expand_more</span>
        </div>

        <div className="flex border-3 border-black hidden sm:flex shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={`p-3 flex items-center justify-center transition-colors border-r-3 border-black ${view === 'grid' ? 'bg-black text-matcha-bg' : 'bg-white text-black hover:bg-[#f3f6f1]'}`}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`p-3 flex items-center justify-center transition-colors ${view === 'list' ? 'bg-black text-matcha-bg' : 'bg-white text-black hover:bg-[#f3f6f1]'}`}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </div>
    </div>
  )
}
