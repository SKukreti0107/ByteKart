import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function PurchasePanel({ product, quantity, setQuantity, onVariantImageChange }) {
  const navigate = useNavigate()
  // Initialize first choice for each variant
  const initialVariants = {}
  if (product.variants && Array.isArray(product.variants)) {
    product.variants.forEach(v => {
      initialVariants[v.name] = v.values && v.values.length > 0 ? v.values[0] : ''
    })
  }
  const [selectedVariants, setSelectedVariants] = useState(initialVariants)
  const { addToCart } = useCart()

  const matchedSku = product.variant_combinations?.find(combo => {
    return Object.entries(selectedVariants).every(([key, val]) => combo.attributes[key] === val)
  })

  const displayPrice = matchedSku
    ? (parseFloat(matchedSku.supplier_price) || 0) + (parseFloat(matchedSku.our_cut) || 0)
    : (parseFloat(product.supplier_price) || 0) + (parseFloat(product.our_cut) || 0)

  const displayMrp = matchedSku ? matchedSku.MRP : product.MRP
  const displayStock = matchedSku ? matchedSku.stock : null

  const isOutOfStock = displayStock !== null
    ? displayStock <= 0
    : (product.stock_status === 'out-of-stock' || product.stock === 0)

  const handleVariantChange = (name, value) => {
    const next = { ...selectedVariants, [name]: value }
    setSelectedVariants(next)

    // Jump gallery to matching variant's image
    if (onVariantImageChange) {
      const sku = product.variant_combinations?.find(combo =>
        Object.entries(next).every(([k, v]) => combo.attributes[k] === v)
      )
      if (sku?.image_url) onVariantImageChange(sku.image_url)
    }
  }

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, matchedSku, selectedVariants, quantity)
    navigate('/checkout')
  }

  return (
    <section className="flex flex-col justify-start pt-4 sm:pt-8 w-full max-w-xl">
      <div>
        <p className="text-sm font-black tracking-widest text-black uppercase">Product Detail</p>
        <h1 className="mt-2 text-4xl font-display font-black uppercase tracking-tighter text-black sm:text-5xl">{product.name}</h1>

        <div className="mt-6 flex flex-wrap items-baseline gap-4">
          {displayMrp > displayPrice && (
            <p className="text-2xl font-black text-red-500 line-through">₹{displayMrp}</p>
          )}
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-black sm:text-5xl">₹{displayPrice}</p>
            <span className="text-sm font-bold text-gray-700 uppercase">(GST inclusive)</span>
          </div>
          <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black">
            {product.stock_status || 'In Stock'}
          </span>
          <span className="bg-[#C6DCBA] text-black border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest shadow-brutal-sm">
            Supplier Fulfilled
          </span>
          {displayStock !== null && (
            <span className="bg-white text-black border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest">
              {displayStock > 0 ? `${displayStock} Available` : 'Out of Stock'}
            </span>
          )}
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="mt-8 flex flex-col gap-6">
            {product.variants.map((variant, idx) => (
              <div key={idx}>
                <p className="mb-3 text-sm font-black uppercase tracking-widest text-black">{variant.name}</p>
                <div className="flex flex-wrap gap-3">
                  {variant.values.map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleVariantChange(variant.name, val)}
                      className={`px-5 py-2 text-sm font-black uppercase tracking-wider border-4 transition-all ${selectedVariants[variant.name] === val
                        ? 'bg-black text-white border-black shadow-brutal-sm translate-x-1 translate-y-1'
                        : 'bg-white text-black border-black shadow-brutal hover:bg-black hover:text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                        }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <p className="text-sm font-black uppercase tracking-widest text-black">Quantity</p>
        <div className="flex items-center">
          <button type="button" disabled={isOutOfStock} className={`w-10 h-10 border-4 border-black flex items-center justify-center text-xl font-black transition-colors ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400' : 'bg-white hover:bg-black hover:text-white'}`} onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
          <span className={`w-14 h-10 border-y-4 border-black flex items-center justify-center text-lg font-black bg-white ${isOutOfStock ? 'text-gray-400 border-gray-400' : 'text-black'}`}>{quantity}</span>
          <button type="button" disabled={isOutOfStock} className={`w-10 h-10 border-4 border-black flex items-center justify-center text-xl font-black transition-colors ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400' : 'bg-white hover:bg-black hover:text-white'}`} onClick={() => setQuantity((prev) => Math.min(prev + 1, displayStock !== null ? Math.min(displayStock, 5) : 5))}>+</button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button
          onClick={() => {
            if (!isOutOfStock) addToCart(product, matchedSku, selectedVariants, quantity);
          }}
          disabled={isOutOfStock}
          className={`px-6 py-4 font-black uppercase tracking-widest text-sm border-4 transition-all shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 ${isOutOfStock
            ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none'
            : 'bg-white border-black text-black'
            }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`px-6 py-4 font-black uppercase tracking-widest text-sm border-4 transition-all shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 ${isOutOfStock
            ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none'
            : 'bg-black border-black text-white'
            }`}
        >
          Check Availability
        </button>
      </div>
    </section>
  )
}
