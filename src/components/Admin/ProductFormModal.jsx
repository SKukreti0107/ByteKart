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
    image_urls: [],
    variant_combinations: []
}

// Reusable brutalist input class
const brutalistInput = "w-full bg-[#f9f9f9] border-4 border-black p-3 font-bold text-black outline-none focus:bg-white focus:border-matcha-dark transition-colors rounded-none appearance-none"
const brutalistLabel = "text-xs font-black uppercase tracking-widest text-black"

export default function ProductFormModal({ isOpen, onClose, initialData, onSave }) {
    const [formData, setFormData] = useState(initialFormState)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const isEditing = !!initialData

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
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddVariant = () => {
        setFormData(prev => ({ ...prev, variants: [...prev.variants, { name: '', values: '' }] }))
    }

    const handleVariantChange = (index, field, value) => {
        setFormData(prev => {
            const newVariants = [...prev.variants]
            newVariants[index][field] = value
            return { ...prev, variants: newVariants }
        })
    }

    const handleRemoveVariant = (index) => {
        setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }))
    }

    // Gallery image handlers
    const handleAddGalleryImage = () => {
        setFormData(prev => ({ ...prev, image_urls: [...(prev.image_urls || []), ''] }))
    }

    const handleGalleryImageChange = (index, value) => {
        setFormData(prev => {
            const updated = [...(prev.image_urls || [])]
            updated[index] = value
            return { ...prev, image_urls: updated }
        })
    }

    const handleRemoveGalleryImage = (index) => {
        setFormData(prev => ({ ...prev, image_urls: (prev.image_urls || []).filter((_, i) => i !== index) }))
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
            return { attributes: combo, MRP: formData.MRP || 0, supplier_price: formData.supplier_price || 0, our_cut: formData.our_cut || 0, stock: 10 }
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
            variant_combinations: formData.variant_combinations,
            image_urls: (formData.image_urls || []).filter(url => url.trim() !== '')
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
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-[#F7F5EE] border-4 border-black shadow-brutal my-8 mx-auto">
                {/* Modal Header */}
                <div className="bg-black text-matcha-bg px-8 py-5 flex items-center justify-between border-b-4 border-black">
                    <h2 className="text-2xl font-black uppercase tracking-widest">
                        {isEditing ? 'Edit_Product' : 'New_Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center bg-matcha-bg text-black border-2 border-matcha-bg hover:bg-white hover:border-white transition-colors"
                        aria-label="Close modal"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {error && (
                    <div className="mx-8 mt-6 border-4 border-red-600 bg-red-50 p-4 text-sm font-black uppercase tracking-wider text-red-700">
                        ⚠ {error}
                    </div>
                )}

                <form onSubmit={handleSubmitWrapped} className="p-8 flex flex-col gap-8">

                    {/* Section: Core Info */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-black text-matcha-bg px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block w-fit">
                            01 / Core Info
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className={brutalistLabel}>Product Name *</label>
                            <input required name="name" value={formData.name || ''} onChange={handleChange} className={brutalistInput} placeholder="e.g. RTX 4090 Ti" />
                        </div>
                    </div>

                    {/* Section: Pricing */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-black text-matcha-bg px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block w-fit">
                            02 / Pricing (₹)
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <label className={brutalistLabel}>MRP *</label>
                                <input required type="number" step="0.01" min="0" name="MRP" value={formData.MRP || ''} onChange={handleChange} className={brutalistInput} placeholder="0" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={brutalistLabel}>Supplier Price *</label>
                                <input required type="number" step="0.01" min="0" name="supplier_price" value={formData.supplier_price || ''} onChange={handleChange} className={brutalistInput} placeholder="0" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={brutalistLabel}>Our Cut *</label>
                                <input required type="number" step="0.01" min="0" name="our_cut" value={formData.our_cut || ''} onChange={handleChange} className={brutalistInput} placeholder="0" />
                            </div>
                        </div>
                        {/* Live price preview */}
                        {(formData.supplier_price || formData.our_cut) ? (
                            <div className="border-4 border-matcha-dark bg-matcha-bg p-4 flex flex-wrap gap-6 items-center">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/60">Selling Price</p>
                                    <p className="text-2xl font-black text-black">₹{(parseFloat(formData.supplier_price || 0) + parseFloat(formData.our_cut || 0)).toFixed(0)}</p>
                                </div>
                                {formData.MRP > 0 && (parseFloat(formData.supplier_price || 0) + parseFloat(formData.our_cut || 0)) < parseFloat(formData.MRP) && (
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60">Discount</p>
                                        <p className="text-2xl font-black text-red-600">
                                            {Math.round(((parseFloat(formData.MRP) - (parseFloat(formData.supplier_price || 0) + parseFloat(formData.our_cut || 0))) / parseFloat(formData.MRP)) * 100)}% OFF
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    {/* Section: Classification */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-black text-matcha-bg px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block w-fit">
                            03 / Classification
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <label className={brutalistLabel}>Category *</label>
                                <select required name="category_id" value={formData.category_id || ''} onChange={handleChange} className={brutalistInput}>
                                    <option value="" disabled>Select</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={brutalistLabel}>Subcategory</label>
                                <select name="subcategory_id" value={formData.subcategory_id || ''} onChange={handleChange} className={brutalistInput}>
                                    <option value="">None</option>
                                    {subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={brutalistLabel}>Brand *</label>
                                <select required name="brand_id" value={formData.brand_id || ''} onChange={handleChange} className={brutalistInput}>
                                    <option value="" disabled>Select</option>
                                    {brands.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-1/3">
                            <label className={brutalistLabel}>Stock Status *</label>
                            <select required name="stock_status" value={formData.stock_status || 'in-stock'} onChange={handleChange} className={brutalistInput}>
                                <option value="in-stock">In Stock</option>
                                <option value="low-stock">Low Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    {/* Section: Media & Description */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-black text-matcha-bg px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block w-fit">
                            04 / Media &amp; Description
                        </div>

                        {/* Primary image (used on cards, hero, thumbnail) */}
                        <div className="flex flex-col gap-2">
                            <label className={brutalistLabel}>Primary Image URL <span className="text-black/40">(shown on cards &amp; hero)</span></label>
                            <input type="text" name="image_url" value={formData.image_url || ''} onChange={handleChange} className={brutalistInput} placeholder="https://..." />
                            {formData.image_url && (
                                <img src={formData.image_url} alt="Preview" className="h-24 w-auto object-contain border-4 border-black p-2 bg-white" onError={e => e.target.style.display = 'none'} />
                            )}
                        </div>

                        {/* Gallery images */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <label className={brutalistLabel}>Gallery Images <span className="text-black/40">(shown in product detail carousel)</span></label>
                                <button type="button" onClick={handleAddGalleryImage} className="px-4 py-2 border-4 border-black bg-white font-black uppercase tracking-wider text-xs hover:bg-black hover:text-matcha-bg transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                                    + Add Image
                                </button>
                            </div>
                            <div className="border-4 border-black bg-white p-4 flex flex-col gap-3">
                                {(!formData.image_urls || formData.image_urls.length === 0) ? (
                                    <p className="text-xs font-black uppercase tracking-widest text-black/40 text-center py-2">No gallery images. Add URLs to show a carousel on the product page.</p>
                                ) : (
                                    formData.image_urls.map((url, idx) => (
                                        <div key={idx} className="flex gap-3 items-center">
                                            {/* Thumbnail preview */}
                                            <div className="w-14 h-14 border-4 border-black flex-shrink-0 overflow-hidden bg-off-white flex items-center justify-center">
                                                {url ? (
                                                    <img src={url} alt={`img-${idx}`} className="w-full h-full object-contain mix-blend-multiply" onError={e => { e.target.style.display = 'none' }} />
                                                ) : (
                                                    <span className="material-symbols-outlined text-black/30 text-2xl">image</span>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={url}
                                                onChange={e => handleGalleryImageChange(idx, e.target.value)}
                                                className={`${brutalistInput} flex-1`}
                                                placeholder={`Image ${idx + 1} URL`}
                                            />
                                            <button type="button" onClick={() => handleRemoveGalleryImage(idx)} className="h-[54px] w-12 bg-red-600 text-white border-4 border-black flex items-center justify-center hover:bg-red-700 transition-colors flex-shrink-0">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className={brutalistLabel}>Description</label>
                            <textarea name="description" rows={4} value={formData.description || ''} onChange={handleChange} className={brutalistInput} placeholder="Technical specs, features, etc..." />
                        </div>
                    </div>

                    {/* Section: Variants */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="bg-black text-matcha-bg px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block">
                                05 / Variants (Optional)
                            </div>
                            <button
                                type="button"
                                onClick={handleAddVariant}
                                className="px-4 py-2 border-4 border-black bg-white font-black uppercase tracking-wider text-xs hover:bg-black hover:text-matcha-bg transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            >
                                + Add Variant
                            </button>
                        </div>

                        <div className="border-4 border-black bg-white p-6 flex flex-col gap-4">
                            {(!formData.variants || formData.variants.length === 0) ? (
                                <p className="text-xs font-black uppercase tracking-widest text-black/40 text-center py-4">
                                    No variants. Add sizes, colors, etc. if applicable.
                                </p>
                            ) : (
                                formData.variants.map((variant, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row gap-4 items-end border-b-4 border-black/10 pb-4 last:border-0 last:pb-0">
                                        <div className="flex flex-col gap-2 w-full sm:w-1/3">
                                            <label className={brutalistLabel}>Variant Name</label>
                                            <input required value={variant.name} onChange={(e) => handleVariantChange(idx, 'name', e.target.value)} className={brutalistInput} placeholder="Color" />
                                        </div>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label className={brutalistLabel}>Values (comma-separated)</label>
                                            <div className="flex gap-2">
                                                <input required value={variant.values} onChange={(e) => handleVariantChange(idx, 'values', e.target.value)} className={brutalistInput} placeholder="Red, Blue, Green" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveVariant(idx)}
                                                    className="h-[54px] w-12 bg-red-600 text-white border-4 border-black flex items-center justify-center hover:bg-red-700 transition-colors flex-shrink-0"
                                                    title="Remove Variant"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {formData.variants && formData.variants.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleGenerateSKUs}
                                    className="mt-2 self-start px-6 py-3 border-4 border-black bg-matcha-bg text-black font-black uppercase tracking-wider text-xs hover:bg-black hover:text-matcha-bg transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                >
                                    ⚡ Generate Price &amp; Stock Grid
                                </button>
                            )}
                        </div>
                    </div>

                    {/* SKU Grid */}
                    {formData.variant_combinations && formData.variant_combinations.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <div className="bg-matcha-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block w-fit">
                                06 / Variant Combinations
                            </div>
                            <div className="border-4 border-black overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[520px]">
                                    <thead>
                                        <tr className="bg-black text-matcha-bg">
                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest border-r-4 border-matcha-dark/30">Variant</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest border-r-4 border-matcha-dark/30">MRP</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest border-r-4 border-matcha-dark/30">Supplier</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest border-r-4 border-matcha-dark/30">Our Cut</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.variant_combinations.map((sku, idx) => (
                                            <tr key={idx} className="border-b-4 border-black last:border-b-0 hover:bg-matcha-bg/20 transition-colors">
                                                <td className="px-4 py-3 font-black text-xs uppercase border-r-4 border-black whitespace-nowrap">
                                                    {Object.values(sku.attributes).join(' / ')}
                                                </td>
                                                <td className="px-4 py-3 border-r-4 border-black">
                                                    <input type="number" step="0.01" min="0" value={sku.MRP} onChange={e => handleSKUChange(idx, 'MRP', e.target.value)} className="w-full border-2 border-black px-2 py-1 text-sm font-bold outline-none focus:border-matcha-dark" />
                                                </td>
                                                <td className="px-4 py-3 border-r-4 border-black">
                                                    <input type="number" step="0.01" min="0" value={sku.supplier_price} onChange={e => handleSKUChange(idx, 'supplier_price', e.target.value)} className="w-full border-2 border-black px-2 py-1 text-sm font-bold outline-none focus:border-matcha-dark" />
                                                </td>
                                                <td className="px-4 py-3 border-r-4 border-black">
                                                    <input type="number" step="0.01" min="0" value={sku.our_cut} onChange={e => handleSKUChange(idx, 'our_cut', e.target.value)} className="w-full border-2 border-black px-2 py-1 text-sm font-bold outline-none focus:border-matcha-dark" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input type="number" min="0" value={sku.stock} onChange={e => handleSKUChange(idx, 'stock', e.target.value)} className="w-full border-2 border-black px-2 py-1 text-sm font-bold outline-none focus:border-matcha-dark" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-matcha-bg py-5 font-black uppercase tracking-widest text-lg border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : (isEditing ? '✓ Save Changes' : '+ Create Product')}
                    </button>
                </form>
            </div>
        </div>
    )
}
