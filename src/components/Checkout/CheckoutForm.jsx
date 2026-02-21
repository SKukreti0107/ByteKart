export default function CheckoutForm({ formData, setFormData, shippingMethod, setShippingMethod, paymentMethod, setPaymentMethod }) {
  const setField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }))

  return (
    <section className="space-y-6">
      <div className="window-container border-none p-6">
        <h2 className="mb-4 text-2xl font-bold">Shipping Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input value={formData.firstName} onChange={(e) => setField('firstName', e.target.value)} placeholder="First Name" className="rounded-xl border-none bg-off-white px-4 py-3" />
          <input value={formData.lastName} onChange={(e) => setField('lastName', e.target.value)} placeholder="Last Name" className="rounded-xl border-none bg-off-white px-4 py-3" />
          <input value={formData.email} onChange={(e) => setField('email', e.target.value)} placeholder="Email" className="rounded-xl border-none bg-off-white px-4 py-3 md:col-span-2" />
          <input value={formData.address} onChange={(e) => setField('address', e.target.value)} placeholder="Address" className="rounded-xl border-none bg-off-white px-4 py-3 md:col-span-2" />
          <input value={formData.city} onChange={(e) => setField('city', e.target.value)} placeholder="City" className="rounded-xl border-none bg-off-white px-4 py-3" />
          <input value={formData.pincode} onChange={(e) => setField('pincode', e.target.value)} placeholder="Pincode" className="rounded-xl border-none bg-off-white px-4 py-3" />
        </div>
      </div>

      <div className="window-container border-none p-6">
        <h2 className="mb-4 text-2xl font-bold">Shipping Method</h2>
        <div className="grid gap-3">
          {[
            { id: 'standard', label: 'Standard Delivery', eta: '3-5 days', fee: 0 },
            { id: 'express', label: 'Express Delivery', eta: '1-2 days', fee: 19 },
          ].map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setShippingMethod(method)}
              className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                shippingMethod.id === method.id
                  ? 'border-matcha-deep bg-baby-green/40'
                  : 'border-transparent bg-off-white'
              }`}
            >
              <p className="font-bold">{method.label}</p>
              <p className="text-sm text-charcoal-dark/60">{method.eta} • {method.fee ? `$${method.fee}` : 'Free'}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="window-container border-none p-6">
        <h2 className="mb-4 text-2xl font-bold">Payment</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {['card', 'upi', 'cod'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPaymentMethod(method)}
              className={`rounded-full px-4 py-2 text-sm font-bold uppercase ${
                paymentMethod === method
                  ? 'bg-matcha-deep text-white'
                  : 'bg-off-white text-charcoal-dark'
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {paymentMethod === 'card' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input value={formData.cardNumber} onChange={(e) => setField('cardNumber', e.target.value)} placeholder="Card Number" className="rounded-xl border-none bg-off-white px-4 py-3 md:col-span-2" />
            <input value={formData.expiry} onChange={(e) => setField('expiry', e.target.value)} placeholder="MM/YY" className="rounded-xl border-none bg-off-white px-4 py-3" />
            <input value={formData.cvv} onChange={(e) => setField('cvv', e.target.value)} placeholder="CVV" className="rounded-xl border-none bg-off-white px-4 py-3" />
          </div>
        ) : null}

        {paymentMethod === 'upi' ? (
          <input value={formData.upi} onChange={(e) => setField('upi', e.target.value)} placeholder="UPI ID" className="w-full rounded-xl border-none bg-off-white px-4 py-3" />
        ) : null}

        {paymentMethod === 'cod' ? (
          <p className="rounded-xl bg-off-white p-4 text-sm font-medium text-charcoal-dark/70">Pay at delivery. Additional verification may apply.</p>
        ) : null}
      </div>
    </section>
  )
}
