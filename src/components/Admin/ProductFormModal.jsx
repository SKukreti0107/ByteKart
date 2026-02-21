import { useState, useEffect } from 'react'
import api from '../../api'

const initialFormState = {
    name: '',
    price: '',
    category_id: '',
    subcategory_id: '',
    brand_id: '',
    stock_status: 'in-stock',
    item_status: 'New',
    description: '',
    image_url: ''
}

export default function ProductFormModal({ isOpen, onClose, initialData, onSave }) {
    const [formData, setFormData] = useState(initialFormState)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const isEditing = !!initialData

    // Reset form when modal opens or closes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData)
            } else {
                setFormData(initialFormState)
            }
            setError(null)
        }
    }, [isOpen, initialData])

    // Fetch dropdown data ideally once
    useEffect(() => {
        if (isOpen) {
            const fetchDropdowns = async () => {
                try {
                    const [catRes, subRes, brandRes] = await Promise.all([
                        api.get('/categories'),
                        api.get('/subCategories'),
                        api.get('/brands')
                    ])
                    setCategories(catRes.data)
                    setSubCategories(subRes.data)
                    setBrands(brandRes.data)
                } catch (err) {
                    console.error('Failed to fetch modal dropdowns:', err)
                    setError('Failed to load form dependencies.')
                }
            }
            fetchDropdowns()
        }
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const payload = {
            ...formData,
            price: parseFloat(formData.price)
        }

        try {
            if (isEditing) {
                await api.put(`/admin/listing/${initialData.id}`, payload)
            } else {
                await api.post('/admin/listing', payload)
            }
            onSave()
            onClose()
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.detail || 'An error occurred while saving.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/40 px-4 pt-10 pb-10 sm:px-0 lg:pt-0 lg:pb-0 backdrop-blur-sm z-[100] overflow-y-auto">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-pure-white/20 bg-pure-white/80 p-6 shadow-2xl backdrop-blur-2xl md:p-8 m-auto top-10 sm:top-0 h-auto self-start sm:self-center max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-off-white text-charcoal-dark transition-colors hover:bg-baby-green"
                    aria-label="Close modal"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>

                <h2 className="mb-6 text-2xl font-bold text-charcoal-dark font-['Fredoka',sans-serif]">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>

                {error && <div className="mb-4 rounded-xl bg-red-100 p-3 text-sm text-red-700">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-['Fredoka',sans-serif]">
                    {/* Core Info */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Product Name *</label>
                            <input
                                required
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Price ($) *</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Relations (Dropdowns) */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Category *</label>
                            <select
                                required
                                name="category_id"
                                value={formData.category_id || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Subcategory</label>
                            <select
                                name="subcategory_id"
                                value={formData.subcategory_id || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            >
                                <option value="">None</option>
                                {subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Brand *</label>
                            <select
                                required
                                name="brand_id"
                                value={formData.brand_id || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            >
                                <option value="" disabled>Select Brand</option>
                                {brands.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Status Enums */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Stock Status *</label>
                            <select
                                required
                                name="stock_status"
                                value={formData.stock_status || 'in-stock'}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            >
                                <option value="in-stock">In Stock</option>
                                <option value="low-stock">Low Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Item Condition *</label>
                            <select
                                required
                                name="item_status"
                                value={formData.item_status || 'New'}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            >
                                <option value="New">New</option>
                                <option value="OpenBox">Open Box</option>
                                <option value="used">Used</option>
                                <option value="preowned">Pre-owned</option>
                                <option value="Returned">Returned</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-charcoal-dark">Image URL (Optional)</label>
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url || ''}
                            onChange={handleChange}
                            className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 mb-2">
                        <label className="text-sm font-bold text-charcoal-dark">Description (Optional)</label>
                        <textarea
                            name="description"
                            rows={3}
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-matcha-deep py-3 font-bold text-white transition-all hover:bg-matcha-deep/90 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Product')}
                    </button>
                </form>
            </div>
        </div>
    )
}
