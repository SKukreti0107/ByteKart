export default function CheckoutForm({ formData, setFormData, shippingMethod, setShippingMethod, disabled }) {
  const setField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }))

  return (
    <section className="space-y-6">
      <div className="window-container border-none p-6">
        <h2 className="mb-4 text-2xl font-bold">Shipping Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input required disabled={disabled} value={formData.firstName} onChange={(e) => setField('firstName', e.target.value)} placeholder="First Name" className="rounded-xl border-none bg-off-white px-4 py-3 disabled:opacity-50" />
          <input required disabled={disabled} value={formData.lastName} onChange={(e) => setField('lastName', e.target.value)} placeholder="Last Name" className="rounded-xl border-none bg-off-white px-4 py-3 disabled:opacity-50" />
          <input required disabled={disabled} type="tel" value={formData.phone} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d+$/.test(val)) setField('phone', val); }} placeholder="Phone Number" className="rounded-xl border-none bg-off-white px-4 py-3 md:col-span-2 disabled:opacity-50" />
          <input required disabled={disabled} type="email" value={formData.email} onChange={(e) => setField('email', e.target.value)} placeholder="Email" className="rounded-xl border-none bg-off-white px-4 py-3 md:col-span-2 disabled:opacity-50" />
          <input required disabled={disabled} value={formData.address} onChange={(e) => setField('address', e.target.value)} placeholder="Address" className="rounded-xl border-none bg-off-white px-4 py-3 md:col-span-2 disabled:opacity-50" />
          <input required disabled={disabled} value={formData.city} onChange={(e) => setField('city', e.target.value)} placeholder="City" className="rounded-xl border-none bg-off-white px-4 py-3 disabled:opacity-50" />
          <input required disabled={disabled} type="text" value={formData.pincode} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d+$/.test(val)) { if (val.length <= 6) setField('pincode', val); } }} placeholder="Pincode" className="rounded-xl border-none bg-off-white px-4 py-3 disabled:opacity-50" />
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
              disabled={disabled}
              onClick={() => setShippingMethod(method)}
              className={`rounded-xl border-2 px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${shippingMethod.id === method.id
                ? 'border-matcha-deep bg-baby-green/40'
                : 'border-transparent bg-off-white'
                }`}
            >
              <p className="font-bold">{method.label}</p>
              <p className="text-sm text-charcoal-dark/60">{method.eta} • {method.fee ? `₹${method.fee}` : 'Free'}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
