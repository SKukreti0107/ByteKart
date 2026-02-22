import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import api from '../api'

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
            <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
                <h1 className="text-3xl font-black text-charcoal-dark">Order History</h1>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-baby-green border-t-matcha-deep"></div>
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border-2 border-red-500/20 bg-red-500/10 p-8 text-center text-red-700">
                        <p className="font-bold">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="window-container flex flex-col items-center justify-center border-none p-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-baby-green/30 text-matcha-deep">
                            <span className="material-symbols-outlined text-3xl">receipt_long</span>
                        </div>
                        <h2 className="text-xl font-bold">No orders found</h2>
                        <p className="mt-2 text-charcoal-dark/70">Looks like you haven't placed an order yet.</p>
                        <Link to="/catalog" className="btn-glow-dark mt-6 rounded-xl bg-charcoal-dark px-6 py-2.5 font-bold text-white hover:bg-black">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="window-container overflow-hidden border-none transition-shadow hover:shadow-lg">
                                <div className="flex flex-col gap-4 border-b border-baby-green/20 bg-baby-green/5 p-5 md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                                        <div>
                                            <p className="font-semibold text-charcoal-dark/60 uppercase">Order Placed</p>
                                            <p className="font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal-dark/60 uppercase">Total</p>
                                            <p className="font-bold text-matcha-deep">₹{order.total_amount.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal-dark/60 uppercase">Order ID</p>
                                            <p className="font-bold">#{order.id.split('-')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="rounded-full bg-charcoal-dark px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                                            {order.status}
                                        </span>
                                        <Link
                                            to={`/order-success/${order.id}`}
                                            className="text-sm font-bold text-matcha-deep underline hover:text-black"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex flex-wrap gap-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 sm:w-80">
                                                {item.image_url ? (
                                                    <div className="h-16 w-16 shrink-0 rounded-lg bg-off-white">
                                                        <img src={item.image_url} alt={item.name} className="h-full w-full object-contain p-2" />
                                                    </div>
                                                ) : (
                                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-baby-green/30 text-matcha-deep/50">
                                                        <span className="material-symbols-outlined">image</span>
                                                    </div>
                                                )}
                                                <div className="flex flex-col justify-center">
                                                    <Link to={`/product/${item.product_id || ''}`} className="font-bold line-clamp-1 hover:text-matcha-deep hover:underline">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-charcoal-dark/70">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </StorefrontLayout>
    )
}
