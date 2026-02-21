import { useMemo, useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import InventoryTableSkeleton from '../Loaders/InventoryTableSkeleton'
import InventoryTable from './InventoryTable'
import ProductFormModal from './ProductFormModal'
import NavBar from '../NavBar'
import api from '../../api'

const perPage = 5

export default function AdminInventoryPage() {
  const [rows, setRows] = useState([])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/listings')
      setRows(response.data)
    } catch (err) {
      console.error("Failed to fetch listings:", err)
      setError("Failed to load inventory.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = row.name.toLowerCase().includes(query.toLowerCase()) || row.category.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' ? true : row.stock_status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [query, rows, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const currentRows = filteredRows.slice((currentPage - 1) * perPage, currentPage * perPage)

  const kpi = {
    totalSku: rows.length,
    lowStock: rows.filter((item) => item.stock_status === 'low-stock').length,
    inStock: rows.filter((item) => item.stock_status === 'in-stock').length,
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/admin/listing/${id}`);
        setRows((prev) => prev.filter((row) => row.id !== id));
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product.");
      }
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  // if (loading) return <div className="p-8 text-center">Loading inventory...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div
      className="min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif]"
    >
      <NavBar showSearch={false} />
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[280px_1fr] lg:p-8">
        <AdminSidebar />

        <main className="space-y-6">
          <section className="window-container border-none p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Inventory Dashboard</p>
                <h1 className="text-3xl font-bold">Admin Control</h1>
              </div>
              <button onClick={handleAddProduct} className="rounded-xl bg-matcha-deep px-4 py-2 font-bold text-white">+ Add Product</button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-off-white p-4"><p className="text-xs font-bold uppercase text-matcha-deep">Total SKUs</p><p className="text-3xl font-bold">{kpi.totalSku}</p></div>
              <div className="rounded-xl bg-off-white p-4"><p className="text-xs font-bold uppercase text-matcha-deep">In Stock</p><p className="text-3xl font-bold">{kpi.inStock}</p></div>
              <div className="rounded-xl bg-off-white p-4"><p className="text-xs font-bold uppercase text-matcha-deep">Low Stock</p><p className="text-3xl font-bold">{kpi.lowStock}</p></div>
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
                className="w-full rounded-xl border-none bg-off-white px-4 py-2.5 sm:min-w-[260px] sm:flex-1"
              />
              {['all', 'in-stock', 'low-stock'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPage(1)
                    setStatusFilter(item)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold uppercase ${statusFilter === item
                    ? 'bg-matcha-deep text-white'
                    : 'bg-off-white text-charcoal-dark'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {loading ? (
            <InventoryTableSkeleton />
          ) : (
            <InventoryTable rows={currentRows} onEdit={handleEdit} onDelete={handleDelete} page={currentPage} setPage={setPage} totalPages={totalPages} />
          )}
        </main>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingProduct}
        onSave={fetchListings}
      />
    </div>
  )
}
