import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import NavBar from '../NavBar'
import InventoryTableSkeleton from '../Loaders/InventoryTableSkeleton'
import api from '../../api'

export default function EntityManagerPage({ config }) {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [formData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Dependency tracking for select dropdowns (e.g. SubCategories need Categories)
    const [dependencies, setDependencies] = useState({})

    const fetchItems = async () => {
        try {
            setLoading(true)
            const response = await api.get(config.api.get)
            setRows(response.data)

            // Fetch dependencies if needed or use static options
            const deps = {}
            for (const field of config.fields) {
                if (field.type === 'select') {
                    if (field.endpoint) {
                        const res = await api.get(field.endpoint)
                        deps[field.name] = res.data
                    } else if (field.options) {
                        deps[field.name] = field.options
                    }
                }
            }
            setDependencies(deps)
        } catch (err) {
            console.error(`Failed to fetch ${config.title}:`, err)
            setError(`Failed to load ${config.title}.`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [config.api.get])

    const handleEdit = (item) => {
        setEditingItem(item)
        setFormData(item)
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this ${config.singularTitle}?`)) {
            try {
                await api.delete(`${config.api.delete}/${id}`)
                api.clearCache()
                setRows((prev) => prev.filter((row) => row.id !== id))
            } catch (err) {
                console.error(`Failed to delete ${config.singularTitle}:`, err)
                alert(`Failed to delete ${config.singularTitle}.`)
            }
        }
    }

    const handleAdd = () => {
        setEditingItem(null)
        const initialData = {}
        config.fields.forEach(f => { initialData[f.name] = '' })
        setFormData(initialData)
        setIsModalOpen(true)
    }

    const handleChange = (e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        if (e.target.type === 'number') {
            value = value === '' ? '' : Number(value)
        }
        setFormData({ ...formData, [e.target.name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            if (editingItem) {
                await api.put(`${config.api.put}/${editingItem.id}`, formData)
            } else {
                await api.post(config.api.post, formData)
            }
            api.clearCache()
            await fetchItems()
            setIsModalOpen(false)
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.detail || 'An error occurred while saving.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif]">
            <NavBar showSearch={false} />
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[280px_1fr] lg:p-8">
                <AdminSidebar />
                <main className="space-y-6">
                    <section className="window-container border-none p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Entity Management</p>
                                <h1 className="text-3xl font-bold">{config.title}</h1>
                            </div>
                            <button onClick={handleAdd} className="rounded-xl bg-matcha-deep px-4 py-2 font-bold text-white">+ Add {config.singularTitle}</button>
                        </div>
                    </section>

                    {loading ? (
                        <InventoryTableSkeleton />
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : (
                        <section className="window-container border-none p-5">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-baby-green/50 text-xs font-bold tracking-wider text-matcha-deep uppercase">
                                            {config.columns.map(col => (
                                                <th key={col.key} className="px-3 py-3">{col.label}</th>
                                            ))}
                                            <th className="px-3 py-3 w-32">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row) => (
                                            <tr key={row.id} className="border-b border-off-white last:border-none">
                                                {config.columns.map(col => (
                                                    <td key={col.key} className="px-3 py-3 font-medium text-sm">
                                                        {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                                                    </td>
                                                ))}
                                                <td className="px-3 py-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(row)}
                                                            className="rounded-lg bg-baby-green/30 px-3 py-1.5 text-xs font-bold text-matcha-deep transition-colors hover:bg-baby-green"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(row.id)}
                                                            className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {rows.length === 0 && (
                                            <tr><td colSpan={config.columns.length + 1} className="p-4 text-center">No records found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-dark/40 p-4 sm:p-6 backdrop-blur-sm">
                    <div className="relative w-full max-w-[95vw] sm:max-w-[80vw] lg:max-w-4xl overflow-y-auto rounded-3xl border border-pure-white/20 bg-pure-white/80 p-6 shadow-2xl backdrop-blur-2xl md:p-8 max-h-[95vh] sm:max-h-[90vh]">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-off-white text-charcoal-dark transition-colors hover:bg-baby-green"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                        <h2 className="mb-6 text-2xl font-bold text-charcoal-dark font-['Fredoka',sans-serif]">
                            {editingItem ? `Edit ${config.singularTitle}` : `Add ${config.singularTitle}`}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-['Fredoka',sans-serif]">
                            {config.fields.map(field => (
                                <div key={field.name} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-charcoal-dark">{field.label} {field.required && '*'}</label>
                                    {(field.type === 'text' || field.type === 'number') && (
                                        <input
                                            type={field.type}
                                            required={field.required}
                                            name={field.name}
                                            value={formData[field.name] ?? ''}
                                            onChange={handleChange}
                                            className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                                        />
                                    )}
                                    {field.type === 'checkbox' && (
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={!!formData[field.name]}
                                            onChange={handleChange}
                                            className="h-5 w-5 rounded border-baby-green/50 text-matcha-deep focus:ring-matcha-deep"
                                        />
                                    )}
                                    {field.type === 'select' && (
                                        <select
                                            required={field.required}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                                        >
                                            <option value="" disabled>Select {field.label}</option>
                                            {(dependencies[field.name] || []).map(opt => (
                                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 w-full rounded-xl bg-matcha-deep py-3 font-bold text-white transition-all hover:bg-matcha-deep/90 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
