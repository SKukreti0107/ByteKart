export default function OrderSummary({ shippingMethod, cartItems, cartTotal, onPlaceOrder, canPlaceOrder, checkoutStep }) {
  const subtotal = cartTotal || 0
  const shipping = shippingMethod.fee
  const total = subtotal + shipping

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

        <div className="mb-8">
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
            {checkoutStep === 'creating' ? 'Creating Order...' :
              checkoutStep === 'verifying' ? 'Verifying Payment...' :
                'Place Order'}
          </span>
        </button>

        <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-gray-500 leading-tight">
          Secure checkout with encrypted payment processing.
        </p>
      </div>
    </aside>
  )
}
