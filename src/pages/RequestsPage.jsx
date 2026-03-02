import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import api from '../api'

function StatusBadge({ status }) {
    if (status === 'requested') {
        return (
            <span className="border-2 border-yellow-500 bg-yellow-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                Requested
            </span>
        )
    }
    if (status === 'approved') {
        return (
            <span className="border-2 border-green-500 bg-green-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                Approved
            </span>
        )
    }
    if (status === 'rejected') {
        return (
            <span className="border-2 border-red-500 bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                Rejected
            </span>
        )
    }
    return (
        <span className="border-2 border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
            {status}
        </span>
    )
}

function RequestCard({ order, onOrderUpdated, razorpayKeyId }) {
    const [paying, setPaying] = useState(false)
    const canPay = order.status === 'approved'

    const handlePayNow = async () => {
        setPaying(true)
        try {
            // 1. Initialize payment session for this order
            const initResp = await api.post(`/orders/${order.id}/pay`)
            const orderData = initResp.data

            // 2. Open Razorpay
            const options = {
                key: razorpayKeyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "ByteKart",
                description: "Complete Order Payment",
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        const verifyResp = await api.post('/verify/payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                        if (verifyResp.status === 200) {
                            onOrderUpdated({ ...order, status: 'paid', razorpay_payment_id: response.razorpay_payment_id })
                            alert("Payment successful!")
                        } else {
                            alert("Payment verification failed. Please contact support.")
                        }
                    } catch (err) {
                        alert("Error verifying payment: " + (err.response?.data?.detail || err.message))
                    } finally {
                        setPaying(false)
                    }
                },
                modal: { ondismiss: () => setPaying(false) },
                prefill: {
                    name: `${order.shipping_address.firstName} ${order.shipping_address.lastName}`.trim(),
                    email: order.shipping_address.email,
                    contact: order.shipping_address.phone,
                },
                theme: { color: "#000000" }
            }
            const rzp = new window.Razorpay(options)
            rzp.on('payment.failed', function (res) {
                alert("Payment Failed: " + res.error.description);
                setPaying(false)
            })
            rzp.open()
        } catch (err) {
            alert("Error initiating payment: " + (err.response?.data?.detail || err.message))
            setPaying(false)
        }
    }

    return (
        <div className="border-4 border-black bg-white shadow-brutal overflow-hidden">
            {/* Order header */}
            <div className="flex flex-col gap-6 border-b-4 border-black bg-matcha-bg p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-[10px] md:text-xs">
                    <div>
                        <p className="font-black uppercase tracking-widest text-black/60 mb-1">Requested On</p>
                        <p className="font-black uppercase text-black">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-black uppercase tracking-widest text-black/60 mb-1">Total</p>
                        <p className="font-black uppercase text-black text-lg">₹{order.total_amount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="font-black uppercase tracking-widest text-black/60 mb-1">Request ID</p>
                        <p className="font-black uppercase text-black">#{order.id.split('-')[0]}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <StatusBadge status={order.status} />

                    <Link
                        to={`/order-success/${order.id}`}
                        className="text-xs font-black uppercase tracking-widest text-black underline underline-offset-4 hover:bg-black hover:text-white transition-colors px-2 py-1"
                    >
                        View Details
                    </Link>

                    {canPay && (
                        <button
                            onClick={handlePayNow}
                            disabled={paying}
                            className="border-4 border-black bg-green-500 px-4 py-1 text-[12px] font-black uppercase tracking-widest text-white hover:bg-black transition-colors shadow-brutal-sm flex items-center gap-2"
                        >
                            {paying ? 'Processing...' : 'Pay Now'}
                        </button>
                    )}
                </div>
            </div>

            {/* Order items */}
            <div className="p-6">
                <div className="flex flex-col gap-6">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-6 items-center pb-6 border-b-2 border-black border-dashed last:border-0 last:pb-0">
                            {item.image_url ? (
                                <div className="h-20 w-20 shrink-0 border-4 border-black bg-white p-2">
                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-contain" />
                                </div>
                            ) : (
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center border-4 border-black bg-gray-50 text-gray-300">
                                    <span className="material-symbols-outlined text-3xl">image</span>
                                </div>
                            )}
                            <div className="flex flex-grow flex-col justify-center">
                                <Link to={`/product/${item.product_id || ''}`} className="font-black uppercase tracking-widest text-black text-sm md:text-base hover:underline line-clamp-1">
                                    {item.name}
                                </Link>
                                <div className="flex gap-4 mt-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Qty: {item.quantity}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Price: ₹{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function RequestsPage() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [razorpayKeyId, setRazorpayKeyId] = useState('')

    useEffect(() => {
        const fetchRequestsAndConfig = async () => {
            try {
                const [ordersRes, configRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/razorpay/config')
                ])
                const allOrders = ordersRes.data
                // Filter for requests
                const filteredRequests = allOrders.filter(o => ['requested', 'approved', 'rejected'].includes(o.status))
                setRequests(filteredRequests)
                setRazorpayKeyId(configRes.data.key_id)
            } catch (err) {
                setError(err.response?.data?.detail || "Could not fetch your requests")
            } finally {
                setLoading(false)
            }
        }

        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)

        fetchRequestsAndConfig()

        return () => { document.body.removeChild(script) }
    }, [])

    return (
        <StorefrontLayout>
            <main className="w-full space-y-12 px-6 lg:px-12 py-12 mb-20">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-black border-b-4 border-black pb-4">My Requests</h1>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-12 w-12 animate-spin border-4 border-black border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="border-4 border-black bg-white p-8 text-center shadow-brutal">
                        <p className="font-black uppercase tracking-widest text-red-600">{error}</p>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="border-4 border-black bg-white p-12 text-center shadow-brutal flex flex-col items-center justify-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center border-4 border-black bg-matcha-bg shadow-brutal-sm text-black">
                            <span className="material-symbols-outlined text-4xl">inventory</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-widest text-black">No requests found</h2>
                        <p className="mt-4 font-bold uppercase tracking-widest text-gray-500">You haven't requested any products yet.</p>
                        <Link to="/catalog" className="mt-8 inline-block border-4 border-black bg-black px-8 py-3 font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors shadow-brutal-sm hover:translate-y-1 hover:shadow-none">
                            Check Availability
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {requests.map((request) => (
                            <RequestCard
                                key={request.id}
                                order={request}
                                razorpayKeyId={razorpayKeyId}
                                onOrderUpdated={(updatedRequest) => {
                                    setRequests(prev => prev.map(r => r.id === updatedRequest.id ? updatedRequest : r))
                                }}
                            />
                        ))}
                    </div>
                )}
            </main>
        </StorefrontLayout>
    )
}
