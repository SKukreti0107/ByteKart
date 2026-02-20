import { useMemo, useState } from 'react'
import StorefrontLayout from '../StorefrontLayout'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  pincode: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  upi: '',
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState(initialForm)
  const [quantity] = useState(1)
  const [shippingMethod, setShippingMethod] = useState({ id: 'standard', label: 'Standard Delivery', fee: 0 })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [placed, setPlaced] = useState(false)

  const requiredFilled = useMemo(() => {
    const basic = formData.firstName && formData.email && formData.address && formData.city && formData.pincode
    if (!basic) return false
    if (paymentMethod === 'card') return formData.cardNumber && formData.expiry && formData.cvv
    if (paymentMethod === 'upi') return formData.upi
    return true
  }, [formData, paymentMethod])

  const steps = ['Shipping', 'Payment', 'Review']
  const currentStep = placed ? 3 : requiredFilled ? 2 : 1

  return (
    <StorefrontLayout>
      <main className="w-full space-y-6">
        <section className="window-container border-none px-6 py-4">
          <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const active = stepNumber <= currentStep
              return (
                <div
                  key={step}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    active ? 'bg-[var(--baby-green)] text-[var(--matcha-deep)]' : 'bg-[var(--off-white)] text-[var(--charcoal-dark)]/50'
                  }`}
                >
                  {stepNumber}. {step}
                </div>
              )
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <OrderSummary
            shippingMethod={shippingMethod}
            quantity={quantity}
            paymentMethod={paymentMethod}
            canPlaceOrder={Boolean(requiredFilled)}
            onPlaceOrder={() => setPlaced(true)}
          />
        </div>

        {placed ? (
          <section className="window-container border-none bg-[var(--baby-green)]/50 p-5 text-center">
            <h2 className="text-2xl font-bold text-[var(--matcha-deep)]">Order placed successfully</h2>
            <p className="mt-1 text-sm font-semibold text-[color:var(--charcoal-dark)]/70">Confirmation and shipment updates have been sent to your email.</p>
          </section>
        ) : null}
      </main>
    </StorefrontLayout>
  )
}
