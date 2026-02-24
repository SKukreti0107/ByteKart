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
        <div className="min-h-screen bg-pure-white text-black font-['Inter',sans-serif]">
            <NavBar showSearch={false} />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 lg:mt-12 px-6 lg:px-12 max-w-[1600px] mx-auto mb-20">
                <AdminSidebar />
                <main className="flex-grow">
                    <div className="mb-8 border-b-4 border-black pb-6 flex justify-between items-end flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-black" style={{ textShadow: '3px 3px 0px #C6DCBA' }}>{config.title}</h1>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">{config.singularTitle} Management</p>
                        </div>
                        <button onClick={handleAdd} className="bg-black text-matcha-bg px-6 py-3 font-black uppercase tracking-widest text-sm border-4 border-black shadow-brutal-sm hover:shadow-none hover:translate-y-1 hover:bg-white hover:text-black transition-all flex items-center">
                            <span className="material-symbols-outlined mr-2">add</span> Add {config.singularTitle}
                        </button>
                    </div>

                    {loading ? (
                        <InventoryTableSkeleton />
                    ) : error ? (
                        <div className="p-8 text-center text-red-500 font-bold uppercase">{error}</div>
                    ) : (
                        <div className="bg-white border-4 border-black shadow-brutal overflow-hidden mb-12">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[760px]">
                                    <thead>
                                        <tr className="border-b-4 border-black bg-gray-50">
                                            {config.columns.map(col => (
                                                <th key={col.key} className="p-4 text-xs font-black uppercase tracking-widest text-black border-r-4 border-black last:border-r-0">{col.label}</th>
                                            ))}
                                            <th className="p-4 text-xs font-black uppercase tracking-widest text-black w-32 border-l-4 border-black">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.length === 0 ? (
                                            <tr>
                                                <td colSpan={config.columns.length + 1} className="p-8 text-center font-black uppercase tracking-widest text-gray-400 border-b-4 border-black">No records found.</td>
                                            </tr>
                                        ) : rows.map((row) => (
                                            <tr key={row.id} className="border-b-4 border-black hover:bg-gray-50 transition-colors last:border-b-0">
                                                {config.columns.map((col, idx) => (
                                                    <td key={col.key} className={`p-4 font-bold text-sm uppercase ${idx !== config.columns.length - 1 ? 'border-r-4 border-black' : ''}`}>
                                                        {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                                                    </td>
                                                ))}
                                                <td className="p-4 border-l-4 border-black">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(row)}
                                                            className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center hover:bg-matcha-bg hover:text-black transition-colors"
                                                            title="Edit"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(row.id)}
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
                        </div>
                    )}
                </main>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-sm">
                    <div className="relative w-full max-w-[95vw] sm:max-w-[80vw] lg:max-w-xl overflow-y-auto bg-white border-4 border-black p-6 shadow-brutal md:p-8 max-h-[95vh] sm:max-h-[90vh]">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-white border-2 border-black font-black hover:bg-black hover:text-matcha-bg transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                        <h2 className="mb-6 text-3xl font-black uppercase tracking-widest text-black">
                            {editingItem ? `Edit ${config.singularTitle}` : `Add ${config.singularTitle}`}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {config.fields.map(field => (
                                <div key={field.name} className="flex flex-col gap-2">
                                    <label className="text-sm font-black uppercase tracking-widest text-black">{field.label} {field.required && '*'}</label>
                                    {(field.type === 'text' || field.type === 'number') && (
                                        <input
                                            type={field.type}
                                            required={field.required}
                                            name={field.name}
                                            value={formData[field.name] ?? ''}
                                            onChange={handleChange}
                                            className="w-full bg-[#f9f9f9] border-4 border-black p-3 font-bold text-black outline-none focus:bg-white transition-colors"
                                        />
                                    )}
                                    {field.type === 'checkbox' && (
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={!!formData[field.name]}
                                            onChange={handleChange}
                                            className="h-6 w-6 border-4 border-black accent-black appearance-none cursor-pointer checked:bg-black relative after:content-[''] after:absolute after:hidden checked:after:block after:left-1.5 after:top-0.5 after:w-2 after:h-3 after:border-white after:border-r-2 after:border-b-2 after:rotate-45"
                                        />
                                    )}
                                    {field.type === 'select' && (
                                        <select
                                            required={field.required}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="w-full bg-[#f9f9f9] border-4 border-black p-3 font-bold text-black outline-none focus:bg-white transition-colors appearance-none"
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
                                className="mt-4 bg-black text-matcha-bg px-6 py-4 font-black uppercase tracking-widest text-lg border-4 border-black shadow-brutal-sm hover:shadow-none hover:translate-y-1 hover:bg-matcha-bg hover:text-black transition-all disabled:opacity-50"
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
