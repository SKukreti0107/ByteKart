import { useMemo, useState } from 'react'
import { matchaThemeVars } from '../theme'
import AdminSidebar from './AdminSidebar'
import InventoryTable from './InventoryTable'

const initialRows = [
  { id: 101, name: 'Leaf Core i9', category: 'CPU', stock: 31, price: 499, status: 'in-stock' },
  { id: 102, name: 'Matcha Pro RTX 5080', category: 'GPU', stock: 8, price: 899, status: 'low-stock' },
  { id: 103, name: 'Glow RAM 32GB', category: 'RAM', stock: 54, price: 189, status: 'in-stock' },
  { id: 104, name: 'Zen NVMe 2TB', category: 'Storage', stock: 12, price: 219, status: 'in-stock' },
  { id: 105, name: 'Eco Board B760', category: 'Motherboard', stock: 6, price: 209, status: 'low-stock' },
  { id: 106, name: 'Zen Headset 2.0', category: 'Peripherals', stock: 27, price: 149, status: 'in-stock' },
  { id: 107, name: 'Matcha Keyboard V2', category: 'Peripherals', stock: 9, price: 129, status: 'low-stock' },
]

const perPage = 5

export default function AdminInventoryPage() {
  const [rows, setRows] = useState(initialRows)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = row.name.toLowerCase().includes(query.toLowerCase()) || row.category.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' ? true : row.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [query, rows, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const currentRows = filteredRows.slice((currentPage - 1) * perPage, currentPage * perPage)

  const kpi = {
    totalSku: rows.length,
    lowStock: rows.filter((item) => item.status === 'low-stock').length,
    inStock: rows.filter((item) => item.status === 'in-stock').length,
  }

  const onToggleStatus = (id) => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'in-stock' ? 'low-stock' : 'in-stock' }
          : item,
      ),
    )
  }

  return (
    <div
      style={matchaThemeVars}
      className="min-h-screen bg-[var(--matcha-bg)] text-[var(--charcoal-dark)] font-['Fredoka',sans-serif]"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[280px_1fr] lg:p-8">
        <AdminSidebar />

        <main className="space-y-6">
          <section className="window-container border-none p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-widest text-[var(--matcha-deep)] uppercase">Inventory Dashboard</p>
                <h1 className="text-3xl font-bold">Admin Control</h1>
              </div>
              <button className="rounded-xl bg-[var(--matcha-deep)] px-4 py-2 font-bold text-white">+ Add Product</button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-[var(--off-white)] p-4"><p className="text-xs font-bold uppercase text-[var(--matcha-deep)]">Total SKUs</p><p className="text-3xl font-bold">{kpi.totalSku}</p></div>
              <div className="rounded-xl bg-[var(--off-white)] p-4"><p className="text-xs font-bold uppercase text-[var(--matcha-deep)]">In Stock</p><p className="text-3xl font-bold">{kpi.inStock}</p></div>
              <div className="rounded-xl bg-[var(--off-white)] p-4"><p className="text-xs font-bold uppercase text-[var(--matcha-deep)]">Low Stock</p><p className="text-3xl font-bold">{kpi.lowStock}</p></div>
            </div>
          </section>

          <section className="window-container border-none p-5">
            <div className="flex flex-wrap items-center gap-3">
              <input
                value={query}
                onChange={(event) => {
                  setPage(1)
                  setQuery(event.target.value)
                }}
                placeholder="Search products"
                className="w-full rounded-xl border-none bg-[var(--off-white)] px-4 py-2.5 sm:min-w-[260px] sm:flex-1"
              />
              {['all', 'in-stock', 'low-stock'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPage(1)
                    setStatusFilter(item)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold uppercase ${
                    statusFilter === item
                      ? 'bg-[var(--matcha-deep)] text-white'
                      : 'bg-[var(--off-white)] text-[var(--charcoal-dark)]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <InventoryTable rows={currentRows} onToggleStatus={onToggleStatus} page={currentPage} setPage={setPage} totalPages={totalPages} />
        </main>
      </div>
    </div>
  )
}
