import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function PurchasePanel({ product, quantity, setQuantity }) {
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
    ? (matchedSku.supplier_price || 0) + (matchedSku.our_cut || 0)
    : (product.supplier_price || 0) + (product.our_cut || 0)

  const displayMrp = matchedSku ? matchedSku.MRP : product.MRP
  const displayStock = matchedSku ? matchedSku.stock : null

  const isOutOfStock = displayStock !== null
    ? displayStock <= 0
    : (product.stock_status === 'out-of-stock' || product.stock === 0)

  const handleVariantChange = (name, value) => {
    setSelectedVariants(prev => ({ ...prev, [name]: value }))
  }

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, matchedSku, selectedVariants, quantity)
    navigate('/checkout')
  }

  return (
    <section className="window-container border-none p-4 sm:p-6 flex flex-col justify-between">
      <div>
        <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Product Detail</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {displayMrp > displayPrice && (
            <p className="text-xl font-bold text-red-500 line-through">₹{displayMrp}</p>
          )}
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-matcha-deep sm:text-4xl">₹{displayPrice}</p>
            <span className="text-sm font-medium text-charcoal-dark/70">(GST inclusive)</span>
          </div>
          <span className="rounded-full bg-baby-green px-3 py-1 text-xs font-bold uppercase tracking-wider">{product.stock_status || 'In Stock'}</span>
          {displayStock !== null && (
            <span className="rounded-full bg-off-white border border-baby-green px-3 py-1 text-xs font-bold uppercase tracking-wider text-charcoal-dark/70">
              {displayStock > 0 ? `${displayStock} Available` : 'Out of Stock'}
            </span>
          )}
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {product.variants.map((variant, idx) => (
              <div key={idx}>
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-matcha-deep">{variant.name}</p>
                <div className="flex flex-wrap gap-2">
                  {variant.values.map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleVariantChange(variant.name, val)}
                      className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${selectedVariants[variant.name] === val
                        ? 'bg-matcha-deep text-white'
                        : 'bg-off-white text-charcoal-dark hover:bg-baby-green/60'
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

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="text-sm font-bold uppercase tracking-wider text-matcha-deep">Quantity</p>
        <div className="flex items-center rounded-xl bg-off-white p-1">
          <button type="button" disabled={isOutOfStock} className={`px-3 py-1 text-xl font-bold ${isOutOfStock ? 'text-gray-400 cursor-not-allowed' : ''}`} onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
          <span className={`w-10 text-center text-lg font-bold ${isOutOfStock ? 'text-gray-400' : ''}`}>{quantity}</span>
          <button type="button" disabled={isOutOfStock} className={`px-3 py-1 text-xl font-bold ${isOutOfStock ? 'text-gray-400 cursor-not-allowed' : ''}`} onClick={() => setQuantity((prev) => Math.min(prev + 1, displayStock !== null ? Math.min(displayStock, 5) : 5))}>+</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            if (!isOutOfStock) addToCart(product, matchedSku, selectedVariants, quantity);
          }}
          disabled={isOutOfStock}
          className={`rounded-xl px-6 py-3 font-bold transition-all ${isOutOfStock
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'btn-glow-dark bg-matcha-deep text-white hover:bg-charcoal-dark'
            }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`rounded-xl px-6 py-3 font-bold transition-colors ${isOutOfStock
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-off-white hover:bg-baby-green text-charcoal-dark'
            }`}
        >
          Buy Now
        </button>
      </div>
    </section>
  )
}
