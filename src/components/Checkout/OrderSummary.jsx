import { useState } from 'react'
import api from '../../api'

export default function OrderSummary({ shippingMethod, cartItems, cartTotal, onPlaceOrder, canPlaceOrder, checkoutStep, appliedCode, setAppliedCode, discount }) {
  const subtotal = cartTotal || 0
  const shipping = shippingMethod.fee
  const total = Math.max(subtotal - (discount || 0) + shipping, 0)

  const [codeInput, setCodeInput] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState('')

  const handleApplyCode = async () => {
    if (!codeInput.trim()) return
    setCodeLoading(true)
    setCodeError('')
    try {
      const res = await api.post('/redeem-code/validate', { code: codeInput.trim() })
      setAppliedCode(res.data)
      setCodeError('')
    } catch (err) {
      setCodeError(err.response?.data?.detail || 'Invalid code')
      setAppliedCode(null)
    } finally {
      setCodeLoading(false)
    }
  }

  const handleRemoveCode = () => {
    setAppliedCode(null)
    setCodeInput('')
    setCodeError('')
  }

  return (
    <aside className="border-none p-0 lg:sticky lg:top-28">
      <div className="bg-white border-4 border-black p-6 shadow-brutal">
        <h3 className="mb-6 text-xl font-black uppercase tracking-widest text-black">Order Summary</h3>

        <div className="mb-4 space-y-3 text-sm font-medium border-b-4 border-black pb-6">
          {cartItems?.map(item => (
            <div key={item.cartItemId} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="line-clamp-1 truncate max-w-[200px] uppercase font-bold" title={item.name}>
                {item.name} × {item.quantity}
              </span>
              <span className="font-black text-black">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pt-2">
            <span className="uppercase font-bold">Shipping ({shippingMethod.label})</span>
            <span className="font-black text-black">{shipping ? `₹${shipping}` : 'Free'}</span>
          </div>
        </div>

        {/* Redeem Code Section */}
        <div className="mb-6 border-b-4 border-black pb-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-3">Redeem Code</p>
          {appliedCode ? (
            <div className="flex items-center justify-between bg-matcha-bg border-4 border-black p-3">
              <div>
                <span className="font-mono font-black tracking-widest text-sm">{appliedCode.code}</span>
                <span className="ml-2 text-xs font-bold text-green-700">
                  −{appliedCode.discount_type === 'percentage' ? `${appliedCode.discount_value}%` : `₹${appliedCode.discount_value}`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveCode}
                className="text-xs font-black uppercase tracking-widest text-red-600 hover:text-red-800 transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleApplyCode() } }}
                placeholder="ENTER CODE"
                className="flex-1 border-4 border-black px-3 py-2 text-sm font-black uppercase tracking-widest outline-none focus:border-matcha-dark transition-colors"
              />
              <button
                type="button"
                onClick={handleApplyCode}
                disabled={codeLoading || !codeInput.trim()}
                className="px-4 py-2 border-4 border-black bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {codeLoading ? '...' : 'Apply'}
              </button>
            </div>
          )}
          {codeError && (
            <p className="mt-2 text-xs font-black uppercase tracking-widest text-red-600">{codeError}</p>
          )}
        </div>

        <div className="mb-8 space-y-2">
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold uppercase tracking-widest text-green-700">Discount</span>
              <span className="font-black text-green-700">−₹{discount}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xl font-bold">
            <span className="font-black uppercase tracking-widest text-lg">Total</span>
            <span className="text-black font-black text-2xl">₹{total}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={!canPlaceOrder || checkoutStep !== 'idle'}
          className={`w-full text-center flex items-center justify-center transition-all px-6 py-4 border-4 border-black shadow-brutal-sm ${!canPlaceOrder || checkoutStep !== 'idle'
            ? 'cursor-not-allowed opacity-50 bg-gray-200'
            : 'bg-black text-white hover:bg-white hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
            }`}
        >
          <span className="text-base uppercase tracking-widest font-black flex items-center">
            {checkoutStep !== 'idle' && (
              <span className="material-symbols-outlined animate-spin text-[18px] mr-2 align-middle">progress_activity</span>
            )}
            {checkoutStep === 'creating' ? 'Submitting Request...' : 'Submit Booking Request'}
          </span>
        </button>

        <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-gray-500 leading-tight">
          Secure checkout with encrypted payment processing.
        </p>
      </div>
    </aside>
  )
}
