import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StorefrontLayout from '../StorefrontLayout'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'
import { useCart } from '../../context/CartContext'
import { authClient } from '../../auth-client'
import api from '../../api'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  pincode: '',
  phone: '',
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState(initialForm)
  const [shippingMethod, setShippingMethod] = useState({ id: 'standard', label: 'Standard Delivery', fee: 0 })
  const [razorpayKeyId, setRazorpayKeyId] = useState('')
  const [checkoutStep, setCheckoutStep] = useState('idle') // 'idle' | 'creating'
  const [appliedCode, setAppliedCode] = useState(null) // { code, discount_type, discount_value }
  const [discount, setDiscount] = useState(0)
  const navigate = useNavigate()

  const { cartItems, cartTotal, clearCart } = useCart()
  const { data: session } = authClient.useSession()

  // Pre-fill user data if available
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
        email: session.user.email || '',
      }))

      // Fetch last used shipping address
      const fetchAddress = async () => {
        try {
          const res = await api.get('/user/shipping_address')
          if (res.data && Object.keys(res.data).length > 0) {
            setFormData(prev => ({
              ...prev,
              address: res.data.address || '',
              city: res.data.city || '',
              pincode: res.data.pincode || '',
              phone: res.data.phone || '',
            }))
          }
        } catch (e) {
          console.error("Failed to fetch past shipping address", e)
        }
      }
      fetchAddress()
    }
  }, [session])

  // No need to load Razorpay on CheckoutPage since we just book a request now.

  // Recalculate discount when cart changes
  useEffect(() => {
    if (appliedCode) {
      const subtotal = cartTotal || 0
      if (appliedCode.discount_type === 'percentage') {
        setDiscount(Math.round(subtotal * (appliedCode.discount_value / 100)))
      } else {
        setDiscount(Math.min(appliedCode.discount_value, subtotal))
      }
    } else {
      setDiscount(0)
    }
  }, [appliedCode, cartTotal])

  const requiredFilled = useMemo(() => {
    return Boolean(
      formData.firstName &&
      formData.email &&
      formData.address &&
      formData.city &&
      formData.pincode &&
      formData.phone
    )
  }, [formData])

  const handlePlaceOrder = async () => {
    if (!session?.user?.id) {
      alert("Please login to place an order.")
      return
    }

    try {
      setCheckoutStep('creating')
      // 1. Create booking request on backend 
      const orderDataPayload = {
        shipping_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          email: formData.email,
          phone: formData.phone
        },
        shipping_fee: shippingMethod.fee,
        redeem_code: appliedCode?.code || null
      }

      const orderResp = await api.post('/orders', orderDataPayload)

      // Clear Cart locally once backend success (backend already cleared it in DB)
      clearCart()

      // Redirect to success page mapping to the new order
      if (orderResp.data && orderResp.data.order_id) {
        navigate(`/order-success/${orderResp.data.order_id}`)
      } else {
        navigate('/requests') // fallback
      }

    } catch (err) {
      setCheckoutStep('idle')
      alert("Error submitting booking request: " + (err.response?.data?.detail || err.message))
    }
  }

  const steps = ['Shipping', 'Review']
  const currentStep = requiredFilled ? 1 : 1

  return (
    <StorefrontLayout>
      <main className="w-full space-y-12 pb-20">
        <section className="px-6 lg:px-12 border-b-4 border-black pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-black">Checkout</h1>
            <div className="bg-matcha-bg border-4 border-black px-4 py-2 shadow-brutal-sm flex items-center gap-2 animate-pulse">
              <span className="material-symbols-outlined font-black">local_shipping</span>
              <span className="text-xs font-black uppercase tracking-widest">Notice: Shipping only in India</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-8 items-center border-b-2 border-transparent pb-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const active = stepNumber <= currentStep
              return (
                <div
                  key={step}
                  className={`text-sm font-black transition-colors uppercase tracking-widest ${active ? 'text-black' : 'text-gray-400'
                    }`}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 border-4 border-black mr-2 ${active ? 'bg-black text-white' : 'bg-white text-gray-400'}`}>{stepNumber}</span>
                  {step}
                </div>
              )
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] px-6 lg:px-12">
          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            disabled={checkoutStep !== 'idle'}
          />

          <OrderSummary
            shippingMethod={shippingMethod}
            cartItems={cartItems}
            cartTotal={cartTotal}
            canPlaceOrder={Boolean(requiredFilled) && cartItems.length > 0}
            onPlaceOrder={handlePlaceOrder}
            checkoutStep={checkoutStep}
            appliedCode={appliedCode}
            setAppliedCode={setAppliedCode}
            discount={discount}
          />
        </div>

      </main>
    </StorefrontLayout>
  )
}

