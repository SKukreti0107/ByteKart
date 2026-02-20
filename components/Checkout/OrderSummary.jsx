export default function OrderSummary({ shippingMethod, quantity, paymentMethod, onPlaceOrder, canPlaceOrder }) {
  const subtotal = 899 * quantity
  const shipping = shippingMethod.fee
  const total = subtotal + shipping

  return (
    <aside className="window-container h-fit border-none p-6 lg:sticky lg:top-28">
      <h3 className="mb-5 text-2xl font-bold">Order Summary</h3>

      <div className="mb-4 space-y-2 text-sm font-medium">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><span>Matcha Pro GPU 5080 × {quantity}</span><span>${subtotal}</span></div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><span>Shipping ({shippingMethod.label})</span><span>{shipping ? `$${shipping}` : 'Free'}</span></div>
      </div>

      <div className="mb-6 border-t border-[var(--baby-green)]/50 pt-4">
        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-[var(--matcha-deep)]">${total}</span>
        </div>
        <p className="mt-2 text-xs font-semibold text-[color:var(--charcoal-dark)]/60 uppercase tracking-wider">Payment: {paymentMethod.toUpperCase()}</p>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={!canPlaceOrder}
        className="btn-glow-dark w-full rounded-xl bg-[var(--matcha-deep)] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Place Order
      </button>

      <p className="mt-3 text-xs font-medium text-[color:var(--charcoal-dark)]/60">Secure checkout with encrypted payment processing.</p>
    </aside>
  )
}
