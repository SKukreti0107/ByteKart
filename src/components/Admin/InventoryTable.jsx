export default function InventoryTable({ rows, onEdit, onDelete, page, setPage, totalPages }) {
  return (
    <section className="window-container border-none p-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-baby-green/50 text-xs font-bold tracking-wider text-matcha-deep uppercase">
              <th className="px-3 py-3">Product</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Stock</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-off-white last:border-none">
                <td className="px-3 py-3">
                  <p className="font-bold">{row.name}</p>
                  <p className="text-xs text-charcoal-dark/50">SKU-{row.id}</p>
                </td>
                <td className="px-3 py-3 text-sm font-medium">{row.category}</td>
                <td className="px-3 py-3 text-sm font-medium">{row.stock}</td>
                <td className="px-3 py-3 text-sm font-bold text-matcha-deep">₹{row.price}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${row.status === 'in-stock' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="rounded-lg bg-baby-green/30 px-3 py-1.5 text-xs font-bold text-matcha-deep transition-colors hover:bg-baby-green"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row.id)}
                      className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button" disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))} className="rounded-lg bg-off-white px-4 py-2 font-bold disabled:opacity-50">Prev</button>
        <p className="text-sm font-bold">Page {page} / {totalPages}</p>
        <button type="button" disabled={page === totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} className="rounded-lg bg-baby-green px-4 py-2 font-bold text-charcoal-dark disabled:opacity-50">Next</button>
      </div>
    </section>
  )
}
