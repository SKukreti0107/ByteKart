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
  const [checkoutStep, setCheckoutStep] = useState('idle') // 'idle' | 'creating' | 'verifying'
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

  // Load Razorpay Script and Config
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    const fetchConfig = async () => {
      try {
        const res = await api.get('/razorpay/config')
        setRazorpayKeyId(res.data.key_id)
      } catch (err) {
        console.error("Failed to fetch Razorpay config", err)
      }
    }
    fetchConfig()

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
      // 1. Create order on backend 
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
        shipping_fee: shippingMethod.fee
      }

      const orderResp = await api.post('/orders', orderDataPayload)
      const orderData = orderResp.data

      // 2. Initialize Razorpay popup
      var options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ByteKart",
        description: "Order Checkout",
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify payment 
          setCheckoutStep('verifying')
          try {
            const verifyResp = await api.post('/verify/payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })

            if (verifyResp.status === 200) {
              clearCart()
              const returnedOrderId = verifyResp.data.order_id
              if (returnedOrderId) {
                navigate(`/order-success/${returnedOrderId}`)
              } else {
                navigate('/') // fallback if backend didn't return UUID
              }
            } else {
              setCheckoutStep('idle')
              alert("Payment verification failed! Transaction failed. Any money deducted will be reverted soon. Please contact support.")
            }
          } catch (err) {
            setCheckoutStep('idle')
            alert("Error verifying payment: " + (err.response?.data?.detail || err.message) + ". Transaction failed. Any money deducted will be reverted soon.")
          }
        },
        modal: {
          ondismiss: function () {
            setCheckoutStep('idle')
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#000000"
        }
      }
      var rzp1 = new window.Razorpay(options)
      rzp1.on('payment.failed', function (response) {
        setCheckoutStep('idle')
        alert("Payment Failed: " + response.error.description + ". Transaction failed. Any money deducted will be reverted soon.")
      })
      rzp1.open()

    } catch (err) {
      setCheckoutStep('idle')
      alert("Error creating checkout order: " + (err.response?.data?.detail || err.message) + ". Transaction failed. Any money deducted will be reverted soon.")
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
          />
        </div>

      </main>
    </StorefrontLayout>
  )
}
