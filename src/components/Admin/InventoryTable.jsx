export default function InventoryTable({ rows, onEdit, onDelete, page, setPage, totalPages }) {
  return (
    <div className="bg-white border-4 border-black shadow-brutal overflow-hidden mb-12">
      <div className="p-6 border-b-4 border-black flex justify-between items-center bg-matcha-bg">
        <h3 className="text-2xl font-black uppercase tracking-widest text-black">Inventory Status</h3>
        {/* Placeholder export action to match mock */}
        <button className="bg-black text-matcha-bg px-4 py-2 font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-white hover:text-black transition-colors flex items-center shadow-brutal-sm hover:translate-y-1 hover:shadow-none">
          <span className="material-symbols-outlined text-base mr-1">download</span> Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b-4 border-black bg-gray-50">
              <th className="p-4 text-xs font-black uppercase tracking-widest text-black border-r-4 border-black">Product</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-black border-r-4 border-black">Category</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-black border-r-4 border-black">Stock</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-black border-r-4 border-black">Price</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-black border-r-4 border-black">Status</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center font-black uppercase tracking-widest text-gray-400 border-b-4 border-black">No inventory results found.</td>
              </tr>
            ) : rows.map((row) => (
              <tr key={row.id} className="border-b-4 border-black hover:bg-gray-50 transition-colors last:border-b-0">
                <td className="p-4 border-r-4 border-black">
                  <p className="font-black uppercase text-sm text-black">{row.name}</p>
                  <p className="text-xs font-bold text-gray-500 font-mono mt-1">SKU-{row.id}</p>
                </td>
                <td className="p-4 border-r-4 border-black font-bold text-sm uppercase">{row.category}</td>
                <td className="p-4 border-r-4 border-black font-black text-sm">{row.stock}</td>
                <td className="p-4 border-r-4 border-black font-black text-sm font-mono">₹{row.price}</td>
                <td className="p-4 border-r-4 border-black">
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black ${row.status === 'in-stock' ? 'bg-black text-matcha-bg' : 'bg-white text-black'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center hover:bg-matcha-bg hover:text-black transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row.id)}
                      className="w-8 h-8 bg-white text-red-600 border-2 border-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t-4 border-black flex justify-between items-center bg-white">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="bg-white text-black px-4 py-2 font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-black hover:text-matcha-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
        >
          Prev
        </button>
        <span className="font-black uppercase tracking-widest text-sm text-black">Page {page} / {totalPages}</span>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="bg-black text-matcha-bg px-4 py-2 font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-matcha-bg"
        >
          Next
        </button>
      </div>
    </div>
  )
}
