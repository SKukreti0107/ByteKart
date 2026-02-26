import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import api from '../api'

// Returns true if the order is within the 7-day return window
function isWithinReturnWindow(createdAt) {
    const orderDate = new Date(createdAt)
    const now = new Date()
    const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24)
    return diffDays <= 7
}

function ReturnStatusBadge({ status }) {
    if (status === 'return_requested') {
        return (
            <span className="border-2 border-orange-500 bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-700">
                Return Requested
            </span>
        )
    }
    if (status === 'returned') {
        return (
            <span className="border-2 border-purple-500 bg-purple-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-700">
                Returned
            </span>
        )
    }
    return null
}

function OrderCard({ order, onOrderUpdated }) {
    const [showReturnForm, setShowReturnForm] = useState(false)
    const [reason, setReason] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [returnError, setReturnError] = useState(null)

    const canReturn = order.status === 'delivered' && isWithinReturnWindow(order.created_at)

    const handleReturnSubmit = async (e) => {
        e.preventDefault()
        if (!reason.trim()) return
        setSubmitting(true)
        setReturnError(null)
        try {
            await api.post(`/orders/${order.id}/return`, { reason })
            onOrderUpdated({ ...order, status: 'return_requested' })
            setShowReturnForm(false)
            setReason('')
        } catch (err) {
            setReturnError(err.response?.data?.detail || 'Failed to submit return request')
        } finally {
            setSubmitting(false)
        }
    }

    const isReturnStatus = order.status === 'return_requested' || order.status === 'returned'

    return (
        <div className="border-4 border-black bg-white shadow-brutal overflow-hidden">
            {/* Order header */}
            <div className="flex flex-col gap-6 border-b-4 border-black bg-matcha-bg p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-[10px] md:text-xs">
                    <div>
                        <p className="font-black uppercase tracking-widest text-black/60 mb-1">Order Placed</p>
                        <p className="font-black uppercase text-black">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-black uppercase tracking-widest text-black/60 mb-1">Total</p>
                        <p className="font-black uppercase text-black text-lg">₹{order.total_amount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="font-black uppercase tracking-widest text-black/60 mb-1">Order ID</p>
                        <p className="font-black uppercase text-black">#{order.id.split('-')[0]}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {isReturnStatus ? (
                        <ReturnStatusBadge status={order.status} />
                    ) : (
                        <span className="border-2 border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                            {order.status}
                        </span>
                    )}

                    <Link
                        to={`/order-success/${order.id}`}
                        className="text-xs font-black uppercase tracking-widest text-black underline underline-offset-4 hover:bg-black hover:text-white transition-colors px-2 py-1"
                    >
                        View Details
                    </Link>

                    {canReturn && (
                        <button
                            id={`return-btn-${order.id}`}
                            onClick={() => setShowReturnForm(v => !v)}
                            className="border-4 border-black bg-white px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors shadow-brutal-sm"
                        >
                            {showReturnForm ? 'Cancel' : 'Return Order'}
                        </button>
                    )}
                </div>
            </div>

            {/* Inline return form */}
            {showReturnForm && (
                <form onSubmit={handleReturnSubmit} className="border-b-4 border-black bg-yellow-50 px-6 py-5 flex flex-col gap-4">
                    <p className="font-black uppercase tracking-widest text-xs text-black">Why do you want to return this order?</p>
                    <textarea
                        id={`return-reason-${order.id}`}
                        className="border-4 border-black p-3 font-bold text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black bg-white"
                        rows={3}
                        placeholder="Describe the reason for return..."
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        required
                    />
                    {returnError && <p className="text-xs font-black text-red-600 uppercase">{returnError}</p>}
                    <button
                        type="submit"
                        id={`return-submit-${order.id}`}
                        disabled={submitting || !reason.trim()}
                        className="self-start border-4 border-black bg-black px-6 py-2 font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors shadow-brutal-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Submitting...' : 'Submit Return Request'}
                    </button>
                </form>
            )}

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

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders')
                setOrders(response.data)
            } catch (err) {
                setError(err.response?.data?.detail || "Could not fetch your orders")
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    return (
        <StorefrontLayout>
            <main className="w-full space-y-12 px-6 lg:px-12 py-12 mb-20">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-black border-b-4 border-black pb-4">Order History</h1>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-12 w-12 animate-spin border-4 border-black border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="border-4 border-black bg-white p-8 text-center shadow-brutal">
                        <p className="font-black uppercase tracking-widest text-red-600">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="border-4 border-black bg-white p-12 text-center shadow-brutal flex flex-col items-center justify-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center border-4 border-black bg-matcha-bg shadow-brutal-sm text-black">
                            <span className="material-symbols-outlined text-4xl">receipt_long</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-widest text-black">No orders found</h2>
                        <p className="mt-4 font-bold uppercase tracking-widest text-gray-500">Looks like you haven't placed an order yet.</p>
                        <Link to="/catalog" className="mt-8 inline-block border-4 border-black bg-black px-8 py-3 font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors shadow-brutal-sm hover:translate-y-1 hover:shadow-none">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onOrderUpdated={(updatedOrder) => {
                                    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o))
                                }}
                            />
                        ))}
                    </div>
                )}
            </main>
        </StorefrontLayout>
    )
}
