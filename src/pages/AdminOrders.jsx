import { useEffect, useState } from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar'
import NavBar from '../components/NavBar'
import api from '../api'

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [processingId, setProcessingId] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await api.get('/admin/orders')
            setOrders(response.data)
        } catch (err) {
            setError(err.response?.data?.detail || "Could not fetch global orders")
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        setProcessingId(orderId)
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status: newStatus })
            // Update local state without refetching the whole list
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ))
        } catch (err) {
            alert("Failed to update status: " + (err.response?.data?.detail || err.message))
        } finally {
            setProcessingId(null)
        }
    }

    return (
        <div className="min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif]">
            <NavBar showSearch={false} />
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[280px_1fr] lg:p-8">
                <AdminSidebar />

                <main className="space-y-6 overflow-hidden">
                    <section className="window-container border-none p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Logistics</p>
                                <h1 className="text-3xl font-bold">Manage Orders</h1>
                            </div>
                            <button onClick={fetchOrders} className="btn-glow flex items-center justify-center rounded-lg bg-baby-green/50 p-2 text-matcha-deep transition hover:bg-baby-green">
                                <span className="material-symbols-outlined text-xl">refresh</span>
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex h-64 items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-baby-green border-t-matcha-deep"></div>
                            </div>
                        ) : error ? (
                            <div className="rounded-xl border-2 border-red-500/20 bg-red-500/10 p-6 text-center text-red-700 font-bold">
                                {error}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-baby-green bg-off-white/50 p-12 text-center">
                                <span className="material-symbols-outlined mb-2 text-4xl text-baby-green">receipt_long</span>
                                <p className="font-bold text-charcoal-dark/70">No orders placed yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-baby-green/30">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-baby-green/20 text-xs font-bold uppercase text-matcha-deep">
                                        <tr>
                                            <th className="px-5 py-4">Order ID</th>
                                            <th className="px-5 py-4">Date</th>
                                            <th className="px-5 py-4">Customer</th>
                                            <th className="px-5 py-4">Total</th>
                                            <th className="px-5 py-4">Delivery</th>
                                            <th className="px-5 py-4 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-baby-green/30 bg-pure-white">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="transition-colors hover:bg-off-white/50">
                                                <td className="px-5 py-4 font-mono font-medium text-xs">
                                                    {order.id.split('-')[0]}
                                                </td>
                                                <td className="px-5 py-4 text-charcoal-dark/80">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="font-bold">{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                                                    <p className="text-xs text-charcoal-dark/60">{order.shipping_address.email}</p>
                                                </td>
                                                <td className="px-5 py-4 font-bold text-matcha-deep">
                                                    ₹{order.total_amount.toFixed(2)}
                                                </td>
                                                <td className="px-5 py-4 text-xs">
                                                    <span className="block max-w-[150px] truncate" title={order.shipping_address.city}>
                                                        {order.shipping_address.city}, {order.shipping_address.pincode}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <select
                                                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase cursor-pointer border-2 transition-colors ${order.status === 'requested' ? 'border-yellow-400 bg-yellow-50 text-yellow-700 focus:border-yellow-500' :
                                                                    order.status === 'approved' ? 'border-green-400 bg-green-50 text-green-700 focus:border-green-500' :
                                                                        order.status === 'rejected' ? 'border-red-400 bg-red-50 text-red-700 focus:border-red-500' :
                                                                            order.status === 'paid' ? 'border-blue-400 bg-blue-50 text-blue-700 focus:border-blue-500' :
                                                                                order.status === 'shipped' ? 'border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-500' :
                                                                                    order.status === 'delivered' ? 'border-matcha-deep bg-baby-green/30 text-matcha-deep focus:border-matcha-deep' :
                                                                                        order.status === 'return_requested' ? 'border-orange-400 bg-orange-50 text-orange-700 focus:border-orange-500' :
                                                                                            order.status === 'returned' ? 'border-purple-400 bg-purple-50 text-purple-700 focus:border-purple-500' :
                                                                                                'border-red-400 bg-red-50 text-red-700 focus:border-red-500'
                                                                }`}
                                                            value={order.status}
                                                            disabled={processingId === order.id}
                                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        >
                                                            <option value="requested">Requested</option>
                                                            <option value="approved">Approved</option>
                                                            <option value="rejected">Rejected</option>
                                                            <option value="paid">Paid</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="return_requested">Return Requested</option>
                                                            <option value="returned">Returned</option>
                                                            <option value="failed">Failed</option>
                                                        </select>
                                                        {processingId === order.id && (
                                                            <span className="material-symbols-outlined animate-spin text-sm text-matcha-deep">refresh</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}
