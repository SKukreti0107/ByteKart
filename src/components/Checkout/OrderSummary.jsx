export default function OrderSummary({ shippingMethod, cartItems, cartTotal, onPlaceOrder, canPlaceOrder, checkoutStep }) {
  const subtotal = cartTotal || 0
  const shipping = shippingMethod.fee
  const total = subtotal + shipping

  return (
    <aside className="window-container h-fit border-none p-6 lg:sticky lg:top-28">
      <h3 className="mb-5 text-2xl font-bold">Order Summary</h3>

      <div className="mb-4 space-y-2 text-sm font-medium">
        {cartItems?.map(item => (
          <div key={item.cartItemId} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between py-1">
            <span className="line-clamp-1 truncate max-w-[200px]" title={item.name}>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-t border-dotted border-gray-300 pt-2 mt-2">
          <span>Shipping ({shippingMethod.label})</span>
          <span>{shipping ? `₹${shipping}` : 'Free'}</span>
        </div>
      </div>

      <div className="mb-6 border-t border-baby-green/50 pt-4">
        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-matcha-deep">₹{total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={!canPlaceOrder || checkoutStep !== 'idle'}
        className="btn-glow-dark flex w-full items-center justify-center gap-2 rounded-xl bg-matcha-deep px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 transition-all"
      >
        {checkoutStep !== 'idle' && (
          <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        )}
        {checkoutStep === 'creating' ? 'Creating Order...' :
          checkoutStep === 'verifying' ? 'Verifying Payment...' :
            'Place Order'}
      </button>

      <p className="mt-3 text-xs font-medium text-charcoal-dark/60">Secure checkout with encrypted payment processing.</p>
    </aside>
  )
}
