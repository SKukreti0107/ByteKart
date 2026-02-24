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
      const [listingsRes, categoriesRes] = await Promise.all([
        api.get('/admin/listings'),
        api.get('/categories')
      ])

      const categoriesMap = categoriesRes.data.reduce((acc, cat) => {
        acc[cat.id] = cat.name
        return acc
      }, {})

      const mappedRows = listingsRes.data.map(item => ({
        ...item,
        category: categoriesMap[item.category_id] || 'General',
        stock: item.variant_combinations?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0,
        status: item.stock_status,
        price: (item.supplier_price || 0) + (item.our_cut || 0)
      }))
      setRows(mappedRows)
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
      const matchesQuery = row.name.toLowerCase().includes(query.toLowerCase()) ||
        (row.category || '').toLowerCase().includes(query.toLowerCase())
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
        api.clearCache();
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

  if (error) return <div className="p-8 text-center text-red-500 font-bold uppercase">{error}</div>

  return (
    <div className="min-h-screen bg-pure-white text-black font-['Inter',sans-serif]">
      <NavBar showSearch={false} />
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 lg:mt-12 px-6 lg:px-12 mb-20 w-full">
        <AdminSidebar />

        <main className="flex-grow">
          <div className="mb-8 border-b-4 border-black pb-6 flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-black" style={{ textShadow: '3px 3px 0px #C6DCBA' }}>Inventory</h1>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Manage Products</p>
            </div>
            <button onClick={handleAddProduct} className="bg-black text-matcha-bg px-6 py-3 font-black uppercase tracking-widest text-sm border-4 border-black shadow-brutal-sm hover:shadow-none hover:translate-y-1 hover:bg-white hover:text-black transition-all flex items-center">
              <span className="material-symbols-outlined mr-2">add</span> Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
              <p className="text-sm font-black uppercase tracking-widest text-black mb-4">Total SKUs</p>
              <p className="text-4xl font-black text-black">{kpi.totalSku}</p>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
              <p className="text-sm font-black uppercase tracking-widest text-black mb-4">In Stock</p>
              <p className="text-4xl font-black text-black">{kpi.inStock}</p>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
              <p className="text-sm font-black uppercase tracking-widest text-black mb-4">Low Stock</p>
              <p className="text-4xl font-black text-red-600">{kpi.lowStock}</p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-4 mb-8 flex flex-col sm:flex-row gap-4 shadow-brutal-sm">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                value={query}
                onChange={(event) => {
                  setPage(1)
                  setQuery(event.target.value)
                }}
                placeholder="Search products..."
                className="w-full bg-[#f9f9f9] border-4 border-black pl-12 pr-4 py-3 font-bold text-black outline-none focus:bg-white transition-colors placeholder:font-bold placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {['all', 'in-stock', 'low-stock'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPage(1)
                    setStatusFilter(item)
                  }}
                  className={`px-4 py-3 font-black uppercase tracking-widest text-xs border-4 border-black whitespace-nowrap transition-colors ${statusFilter === item
                    ? 'bg-black text-matcha-bg'
                    : 'bg-white text-black hover:bg-black hover:text-matcha-bg'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

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
