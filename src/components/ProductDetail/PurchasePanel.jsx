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
        <p className="text-xs font-black tracking-widest text-[#4A5D44] uppercase bg-[#E8EFE5] px-2.5 py-1 border border-black shadow-brutal-sm w-fit">Product Detail</p>
        <h1 className="mt-4 text-4xl font-display font-black uppercase tracking-tighter text-black sm:text-5xl" style={{ textShadow: '2.5px 2.5px 0px #C6DCBA' }}>{product.name}</h1>

        <div className="mt-6 flex flex-wrap items-baseline gap-4">
          {displayMrp > displayPrice && (
            <p className="text-xl font-black text-red-600 line-through font-mono">₹{displayMrp}</p>
          )}
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-black sm:text-4xl">₹{displayPrice}</p>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">(GST inclusive)</span>
          </div>
          <span className="bg-pure-black text-matcha-bg px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-brutal-sm">
            {product.stock_status || 'In Stock'}
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
                <p className="mb-3 text-xs font-display font-black uppercase tracking-widest text-black/60">{variant.name}</p>
                <div className="flex flex-wrap gap-3">
                  {variant.values.map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleVariantChange(variant.name, val)}
                      className={`px-5 py-2 text-xs sm:text-sm font-display font-black uppercase tracking-wider border-3 transition-all ${
                        selectedVariants[variant.name] === val
                          ? 'bg-pure-black text-matcha-bg border-pure-black shadow-none translate-x-[2px] translate-y-[2px]'
                          : 'bg-pure-white text-pure-black border-pure-black shadow-[2px_2px_0px_#C6DCBA] hover:shadow-none hover:bg-pure-black hover:text-matcha-bg hover:translate-x-[2px] hover:translate-y-[2px]'
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
        <p className="text-xs font-display font-black uppercase tracking-widest text-black/60">Quantity</p>
        <div className="flex items-center bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] border-3 border-black">
          <button type="button" disabled={isOutOfStock} className={`w-10 h-10 border-r-3 border-black flex items-center justify-center text-xl font-black transition-colors ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400' : 'bg-white hover:bg-pure-black hover:text-matcha-bg'}`} onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
          <span className={`w-14 h-10 flex items-center justify-center text-sm font-mono font-black ${isOutOfStock ? 'text-gray-400' : 'text-black'}`}>{quantity}</span>
          <button type="button" disabled={isOutOfStock} className={`w-10 h-10 border-l-3 border-black flex items-center justify-center text-xl font-black transition-colors ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400' : 'bg-white hover:bg-pure-black hover:text-matcha-bg'}`} onClick={() => setQuantity((prev) => Math.min(prev + 1, displayStock !== null ? Math.min(displayStock, 5) : 5))}>+</button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button
          onClick={() => {
            if (!isOutOfStock) addToCart(product, matchedSku, selectedVariants, quantity);
          }}
          disabled={isOutOfStock}
          className={`px-6 py-4 font-black uppercase tracking-widest text-xs sm:text-sm border-3 transition-all ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none'
              : 'bg-matcha-bg text-pure-black border-pure-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-pure-black hover:text-matcha-bg hover:translate-x-0.5 hover:translate-y-0.5'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`px-6 py-4 font-black uppercase tracking-widest text-xs sm:text-sm border-3 transition-all ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none'
              : 'bg-pure-black text-matcha-bg border-pure-black shadow-[3px_3px_0px_#C6DCBA] hover:shadow-none hover:bg-matcha-bg hover:text-pure-black hover:translate-x-0.5 hover:translate-y-0.5'
          }`}
        >
          Check Availability
        </button>
      </div>
    </section>
  )
}
