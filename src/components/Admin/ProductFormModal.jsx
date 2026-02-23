import { useState, useEffect } from 'react'
import api from '../../api'

const initialFormState = {
    name: '',
    MRP: '',
    supplier_price: '',
    our_cut: '',
    variants: [],
    category_id: '',
    subcategory_id: '',
    brand_id: '',
    stock_status: 'in-stock',
    item_status: 'New',
    description: '',
    image_url: '',
    variant_combinations: []
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
                const formattedInitialData = {
                    ...initialData,
                    variants: initialData.variants ? initialData.variants.map(v => ({
                        ...v,
                        values: Array.isArray(v.values) ? v.values.join(', ') : v.values
                    })) : [],
                    variant_combinations: initialData.variant_combinations || []
                }
                setFormData(formattedInitialData)
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
            MRP: parseFloat(formData.MRP) || 0,
            supplier_price: parseFloat(formData.supplier_price) || 0,
            our_cut: parseFloat(formData.our_cut) || 0,
            variants: formData.variants
        }

        try {
            if (isEditing) {
                await api.put(`/admin/listing/${initialData.id}`, payload)
            } else {
                await api.post('/admin/listing', payload)
            }
            api.clearCache()
            onSave()
            onClose()
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.detail || 'An error occurred while saving.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAddVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { name: '', values: '' }]
        }))
    }

    const handleVariantChange = (index, field, value) => {
        setFormData(prev => {
            const newVariants = [...prev.variants]
            newVariants[index][field] = value
            return { ...prev, variants: newVariants }
        })
    }

    const handleRemoveVariant = (index) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }))
    }

    const formatVariantsForPayload = (variants) => {
        return variants.map(v => ({
            name: v.name,
            values: v.values.split(',').map(val => val.trim()).filter(val => val)
        }))
    }

    const handleGenerateSKUs = () => {
        const formattedVariants = formatVariantsForPayload(formData.variants).filter(v => v.values.length > 0)
        if (formattedVariants.length === 0) {
            setFormData(prev => ({ ...prev, variant_combinations: [] }))
            return
        }

        const combine = (arr) => arr.reduce((a, b) => a.flatMap(x => b.values.map(y => ({ ...x, [b.name]: y }))), [{}])
        const combinations = combine(formattedVariants)

        const newCombinations = combinations.map(combo => {
            const existing = formData.variant_combinations?.find(c => {
                return Object.keys(combo).every(k => c.attributes && c.attributes[k] === combo[k])
            })
            if (existing) return existing

            return {
                attributes: combo,
                MRP: formData.MRP || 0,
                supplier_price: formData.supplier_price || 0,
                our_cut: formData.our_cut || 0,
                stock: 10
            }
        })

        setFormData(prev => ({ ...prev, variant_combinations: newCombinations }))
    }

    const handleSKUChange = (index, field, value) => {
        setFormData(prev => {
            const newCombos = [...(prev.variant_combinations || [])]
            newCombos[index][field] = value === '' ? '' : parseFloat(value) || 0
            return { ...prev, variant_combinations: newCombos }
        })
    }

    // Wrap handle submit payload formats
    const handleSubmitWrapped = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const payload = {
            ...formData,
            MRP: parseFloat(formData.MRP) || 0,
            supplier_price: parseFloat(formData.supplier_price) || 0,
            our_cut: parseFloat(formData.our_cut) || 0,
            variants: formatVariantsForPayload(formData.variants),
            variant_combinations: formData.variant_combinations
        }

        try {
            if (isEditing) {
                await api.put(`/admin/listing/${initialData.id}`, payload)
            } else {
                await api.post('/admin/listing', payload)
            }
            api.clearCache()
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
            <div className="relative w-full max-w-[95vw] lg:max-w-7xl h-[95vh] sm:h-[90vh] overflow-y-auto rounded-3xl border border-pure-white/20 bg-pure-white/80 p-6 shadow-2xl backdrop-blur-2xl md:p-8 m-auto top-10 sm:top-0 self-start sm:self-center">
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

                <form onSubmit={handleSubmitWrapped} className="flex flex-col gap-4 font-['Fredoka',sans-serif]">
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
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">MRP (₹) *</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0"
                                name="MRP"
                                value={formData.MRP || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Supplier Price (₹) *</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0"
                                name="supplier_price"
                                value={formData.supplier_price || ''}
                                onChange={handleChange}
                                className="rounded-xl border border-baby-green/50 bg-off-white px-4 py-2.5 text-charcoal-dark focus:border-baby-green focus:ring-0"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-charcoal-dark">Our Cut (₹) *</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0"
                                name="our_cut"
                                value={formData.our_cut || ''}
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

                    {/* Variants Section */}
                    <div className="flex flex-col gap-3 rounded-xl border border-baby-green/50 bg-off-white p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-charcoal-dark">Variants</h3>
                            <button
                                type="button"
                                onClick={handleAddVariant}
                                className="text-sm font-bold text-matcha-deep hover:underline"
                            >
                                + Add Variant
                            </button>
                        </div>
                        {formData.variants?.map((variant, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end border-t border-baby-green/20 pt-3">
                                <div className="flex flex-col gap-1.5 w-full sm:w-1/3">
                                    <label className="text-xs font-bold text-charcoal-dark/70">Variant Name (e.g. Size)</label>
                                    <input
                                        required
                                        value={variant.name}
                                        onChange={(e) => handleVariantChange(idx, 'name', e.target.value)}
                                        className="rounded-xl border border-baby-green/50 bg-white px-3 py-2 text-sm text-charcoal-dark focus:border-baby-green focus:ring-0"
                                        placeholder="Color"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 w-full sm:w-2/3">
                                    <label className="text-xs font-bold text-charcoal-dark/70">Values (comma separated)</label>
                                    <div className="flex gap-2">
                                        <input
                                            required
                                            value={variant.values}
                                            onChange={(e) => handleVariantChange(idx, 'values', e.target.value)}
                                            className="w-full rounded-xl border border-baby-green/50 bg-white px-3 py-2 text-sm text-charcoal-dark focus:border-baby-green focus:ring-0"
                                            placeholder="Red, Blue, Green"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveVariant(idx)}
                                            className="rounded-xl bg-red-100 p-2 text-red-600 hover:bg-red-200 transition-colors"
                                            title="Remove Variant"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!formData.variants || formData.variants.length === 0) ? (
                            <p className="text-xs text-charcoal-dark/60">No variants added. E.g. Add sizes or colors.</p>
                        ) : (
                            <button type="button" onClick={handleGenerateSKUs} className="mt-2 text-sm font-bold text-matcha-deep hover:underline self-start">
                                Generate Price & Stock Grid
                            </button>
                        )}
                    </div>

                    {/* SKU Grid */}
                    {formData.variant_combinations && formData.variant_combinations.length > 0 && (
                        <div className="flex flex-col gap-2 rounded-2xl bg-off-white/50 p-4 border border-baby-green/30 overflow-x-auto w-full">
                            <h3 className="text-sm font-bold tracking-wider text-charcoal-dark uppercase mb-2">Variant Combinations</h3>
                            <table className="min-w-full text-left text-sm table-auto w-full max-w-full overflow-hidden">
                                <thead>
                                    <tr className="border-b border-baby-green/30 text-[10px] sm:text-xs font-bold text-matcha-deep uppercase">
                                        <th className="py-2 pr-1 w-20">Variant</th>
                                        <th className="py-2 px-1 w-[20%]">MRP</th>
                                        <th className="py-2 px-1 w-[20%]">Supplier</th>
                                        <th className="py-2 px-1 w-[20%]">Our Cut</th>
                                        <th className="py-2 pl-1 w-[15%]">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.variant_combinations.map((sku, idx) => (
                                        <tr key={idx} className="border-b border-baby-green/10 last:border-0">
                                            <td className="py-2 pr-1 font-medium text-xs text-charcoal-dark/80 whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">
                                                {Object.values(sku.attributes).join(' / ')}
                                            </td>
                                            <td className="py-2 px-1">
                                                <input type="number" step="0.01" min="0" value={sku.MRP} onChange={e => handleSKUChange(idx, 'MRP', e.target.value)} className="w-full text-xs sm:text-sm rounded border border-baby-green/50 px-1 py-1 sm:px-2 focus:ring-0 focus:border-baby-green" />
                                            </td>
                                            <td className="py-2 px-1">
                                                <input type="number" step="0.01" min="0" value={sku.supplier_price} onChange={e => handleSKUChange(idx, 'supplier_price', e.target.value)} className="w-full text-xs sm:text-sm rounded border border-baby-green/50 px-1 py-1 sm:px-2 focus:ring-0 focus:border-baby-green" />
                                            </td>
                                            <td className="py-2 px-1">
                                                <input type="number" step="0.01" min="0" value={sku.our_cut} onChange={e => handleSKUChange(idx, 'our_cut', e.target.value)} className="w-full text-xs sm:text-sm rounded border border-baby-green/50 px-1 py-1 sm:px-2 focus:ring-0 focus:border-baby-green" />
                                            </td>
                                            <td className="py-2 pl-1">
                                                <input type="number" min="0" value={sku.stock} onChange={e => handleSKUChange(idx, 'stock', e.target.value)} className="w-full text-xs sm:text-sm rounded border border-baby-green/50 px-1 py-1 sm:px-2 focus:ring-0 focus:border-baby-green" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

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
