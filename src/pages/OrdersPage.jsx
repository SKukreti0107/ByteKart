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
                            <div key={order.id} className="border-4 border-black bg-white shadow-brutal overflow-hidden">
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
                                    <div className="flex items-center gap-6">
                                        <span className="border-2 border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                                            {order.status}
                                        </span>
                                        <Link
                                            to={`/order-success/${order.id}`}
                                            className="text-xs font-black uppercase tracking-widest text-black underline underline-offset-4 hover:bg-black hover:text-white transition-colors px-2 py-1"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>

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
                        ))}
                    </div>
                )}
            </main>
        </StorefrontLayout>
    )
}
