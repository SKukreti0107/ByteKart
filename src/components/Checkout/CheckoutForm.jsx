export default function CheckoutForm({ formData, setFormData, shippingMethod, setShippingMethod, disabled }) {
  const setField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }))

  return (
    <section className="space-y-12">
      <div className="bg-white border-4 border-black p-6 shadow-brutal">
        <h2 className="mb-8 text-xl font-black uppercase tracking-widest text-black">Shipping Details</h2>
        <div className="grid grid-cols-1 gap-y-6 gap-x-12 md:grid-cols-2">
          <input required disabled={disabled} value={formData.firstName} onChange={(e) => setField('firstName', e.target.value)} placeholder="First Name" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none transition-colors disabled:opacity-50" />
          <input required disabled={disabled} value={formData.lastName} onChange={(e) => setField('lastName', e.target.value)} placeholder="Last Name" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none transition-colors disabled:opacity-50" />
          <input required disabled={disabled} type="tel" value={formData.phone} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d+$/.test(val)) setField('phone', val); }} placeholder="Phone Number" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none md:col-span-2 transition-colors disabled:opacity-50" />
          <input required disabled={disabled} type="email" value={formData.email} onChange={(e) => setField('email', e.target.value)} placeholder="Email" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none md:col-span-2 transition-colors disabled:opacity-50" />
          <input required disabled={disabled} value={formData.address} onChange={(e) => setField('address', e.target.value)} placeholder="Address" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none md:col-span-2 transition-colors disabled:opacity-50" />
          <input required disabled={disabled} value={formData.city} onChange={(e) => setField('city', e.target.value)} placeholder="City" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none transition-colors disabled:opacity-50" />
          <div className="relative">
            <input required disabled={disabled} type="text" value={formData.pincode} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d+$/.test(val)) { if (val.length <= 6) setField('pincode', val); } }} placeholder="Pincode" className="w-full bg-transparent border-b-2 border-gray-400 py-2 font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-none transition-colors disabled:opacity-50" />
            <span className="absolute right-0 bottom-full text-[8px] font-black uppercase text-matcha-deep tracking-widest bg-matcha-bg px-1 px-1 mb-1">Domestic only (India)</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-6 shadow-brutal">
        <h2 className="mb-6 text-xl font-black uppercase tracking-widest text-black">Shipping Method</h2>
        <div className="px-4 py-4 border-4 border-black bg-black text-white shadow-brutal-sm">
          <p className="font-black text-sm uppercase tracking-widest">Free Delivery</p>
          <p className="text-xs mt-1 font-bold">3-5 business days • Free</p>
        </div>
      </div>
    </section>
  )
}
