import { useEffect, useState } from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar'
import NavBar from '../components/NavBar'
import api from '../api'

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [processingId, setProcessingId] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)

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
                                <p className="text-xs font-black tracking-widest text-black uppercase bg-white border-2 border-black inline-block px-2 py-0.5 mb-2">Logistics</p>
                                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black">Manage Orders</h1>
                            </div>
                            <button onClick={fetchOrders} className="flex h-12 w-12 items-center justify-center border-4 border-black bg-white shadow-brutal-sm transition-all hover:-translate-y-1 hover:bg-black hover:text-matcha-bg">
                                <span className="material-symbols-outlined text-2xl font-bold">refresh</span>
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
                            <div className="overflow-x-auto border-4 border-black shadow-brutal">
                                <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                                    <thead className="bg-black text-xs font-black uppercase tracking-widest text-matcha-bg border-b-4 border-black">
                                        <tr>
                                            <th className="px-5 py-4 border-r-4 border-black">Order ID</th>
                                            <th className="px-5 py-4 border-r-4 border-black">Date</th>
                                            <th className="px-5 py-4 border-r-4 border-black">Customer</th>
                                            <th className="px-5 py-4 border-r-4 border-black">Total</th>
                                            <th className="px-5 py-4 border-r-4 border-black">Delivery</th>
                                            <th className="px-5 py-4 text-center border-r-4 border-black">Status</th>
                                            <th className="px-5 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-4 divide-black bg-white">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="transition-all hover:bg-matcha-bg/10 group">
                                                <td className="px-5 py-4 font-mono font-black text-xs border-r-4 border-black group-hover:bg-black group-hover:text-white transition-colors">
                                                    {order.id.split('-')[0]}
                                                </td>
                                                <td className="px-5 py-4 font-bold border-r-4 border-black">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-4 border-r-4 border-black">
                                                    <p className="font-black uppercase tracking-tight">{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                                                    <p className="text-xs font-bold text-black/60">{order.shipping_address.email}</p>
                                                </td>
                                                <td className="px-5 py-4 font-black text-lg border-r-4 border-black text-black">
                                                    ₹{order.total_amount.toFixed(2)}
                                                </td>
                                                <td className="px-5 py-4 text-xs font-bold border-r-4 border-black">
                                                    <span className="block max-w-[150px] truncate uppercase tracking-widest" title={order.shipping_address.city}>
                                                        {order.shipping_address.city}, {order.shipping_address.pincode}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <select
                                                            className={`px-3 py-1 text-xs font-black uppercase cursor-pointer border-4 border-black transition-all hover:-translate-y-0.5 shadow-brutal-sm ${order.status === 'requested' ? 'bg-yellow-400 text-black' :
                                                                order.status === 'approved' ? 'bg-green-400 text-black' :
                                                                    order.status === 'rejected' ? 'bg-red-400 text-black' :
                                                                        order.status === 'paid' ? 'bg-blue-400 text-black' :
                                                                            order.status === 'shipped' ? 'bg-indigo-400 text-black' :
                                                                                order.status === 'delivered' ? 'bg-matcha-dark text-white' :
                                                                                    order.status === 'return_requested' ? 'bg-orange-400 text-black' :
                                                                                        order.status === 'returned' ? 'bg-purple-400 text-black' :
                                                                                            'bg-red-400 text-black'
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
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="flex h-10 w-10 items-center justify-center bg-white border-2 border-black shadow-brutal-sm hover:-translate-y-0.5 hover:bg-black hover:text-matcha-bg mx-auto transition-all"
                                                        title="View Order Details"
                                                    >
                                                        <span className="material-symbols-outlined text-base font-bold">visibility</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </main>

                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-['Fredoka',sans-serif] backdrop-blur-sm">
                        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-4 border-black shadow-brutal overflow-hidden flex flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black">
                            <div className="sticky top-0 bg-black z-10 p-6 sm:p-8 border-b-4 border-black flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-matcha-bg flex items-center gap-3">
                                        <span className="material-symbols-outlined text-3xl">receipt_long</span>
                                        Order Details
                                    </h2>
                                    <p className="font-mono text-sm text-matcha-bg/70 mt-1">ID: {selectedOrder.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center bg-white border-4 border-black shadow-brutal-sm transition-all hover:-translate-y-1 hover:bg-red-50 hover:text-red-500"
                                >
                                    <span className="material-symbols-outlined text-xl font-bold">close</span>
                                </button>
                            </div>

                            <div className="p-6 sm:p-8 space-y-8 bg-matcha-bg/20">
                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white border-4 border-black p-6 shadow-brutal-sm">
                                        <h3 className="mb-4 font-black uppercase tracking-widest text-xs flex items-center gap-2 text-black">
                                            <span className="material-symbols-outlined text-[18px]">person</span>
                                            Customer info
                                        </h3>
                                        <div className="space-y-2">
                                            <p className="font-black text-xl uppercase tracking-tighter">{selectedOrder.shipping_address.firstName} {selectedOrder.shipping_address.lastName}</p>
                                            <p className="text-sm font-bold flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[14px]">mail</span> {selectedOrder.shipping_address.email}
                                            </p>
                                            <p className="text-sm font-bold flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[14px]">call</span> {selectedOrder.shipping_address.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white border-4 border-black p-6 shadow-brutal-sm">
                                        <h3 className="mb-4 font-black uppercase tracking-widest text-xs flex items-center gap-2 text-black">
                                            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                                            Shipping Address
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold leading-relaxed">{selectedOrder.shipping_address.address}</p>
                                            <p className="text-sm font-bold">{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state}</p>
                                            <p className="text-sm font-black mt-2 bg-black text-white inline-block px-4 py-1 uppercase tracking-widest">PIN: {selectedOrder.shipping_address.pincode}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status and Payment */}
                                <div className="bg-white border-4 border-black p-6 shadow-brutal-sm">
                                    <h3 className="mb-4 font-black uppercase tracking-widest text-xs flex items-center gap-2 text-black">
                                        <span className="material-symbols-outlined text-[18px]">info</span>
                                        Order Status & Payment
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                        <div className="border-4 border-black p-4 bg-matcha-bg/10">
                                            <p className="text-black/60 text-xs uppercase font-black tracking-widest mb-1">Status</p>
                                            <p className="font-black text-xl uppercase tracking-widest text-black">{selectedOrder.status.replace('_', ' ')}</p>
                                        </div>
                                        <div className="border-4 border-black p-4 bg-matcha-bg/10">
                                            <p className="text-black/60 text-xs uppercase font-black tracking-widest mb-1">Razorpay Payment ID</p>
                                            <p className="font-mono text-sm mt-1 bg-black text-white px-2 py-1 line-clamp-1">{selectedOrder.razorpay_payment_id || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="bg-white border-4 border-black p-2 shadow-brutal-sm overflow-hidden">
                                    <div className="p-4 border-b-4 border-black bg-black">
                                        <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-2 text-white">
                                            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                            Items Ordered
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                                            <thead className="bg-matcha-bg/20 text-xs font-black uppercase tracking-widest border-b-4 border-black">
                                                <tr>
                                                    <th className="px-5 py-4 border-r-4 border-black">Item</th>
                                                    <th className="px-5 py-4 border-r-4 border-black">Variants</th>
                                                    <th className="px-5 py-4 text-center border-r-4 border-black">Qty</th>
                                                    <th className="px-5 py-4 text-right">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y-4 divide-black">
                                                {selectedOrder.items.map((item, idx) => (
                                                    <tr key={idx} className="hover:bg-matcha-bg/10 transition-colors">
                                                        <td className="px-5 py-4 border-r-4 border-black">
                                                            <div className="flex items-center gap-4">
                                                                {item.image_url ? (
                                                                    <img src={item.image_url} alt={item.name} className="h-14 w-14 border-4 border-black object-cover shadow-brutal-sm" />
                                                                ) : (
                                                                    <div className="h-14 w-14 flex items-center justify-center border-4 border-black bg-white">
                                                                        <span className="material-symbols-outlined text-black text-2xl">image</span>
                                                                    </div>
                                                                )}
                                                                <span className="font-black uppercase tracking-tight whitespace-normal max-w-[250px] leading-none">{item.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 text-xs font-bold border-r-4 border-black whitespace-normal">
                                                            {item.selected_variants && Object.keys(item.selected_variants).length > 0 ? (
                                                                <div className="flex flex-wrap gap-2">
                                                                    {Object.entries(item.selected_variants).map(([k, v]) => (
                                                                        <span key={k} className="inline-block bg-black text-white px-2 py-1 uppercase tracking-widest text-[10px]">
                                                                            {k}: {v}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span className="italic opacity-50">None</span>
                                                            )}
                                                        </td>
                                                        <td className="px-5 py-4 text-center border-r-4 border-black">
                                                            <span className="font-black text-lg bg-black text-white px-4 py-1">{item.quantity}</span>
                                                        </td>
                                                        <td className="px-5 py-4 text-right font-black text-xl">₹{(item.price * item.quantity).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className="flex justify-end pt-4">
                                    <div className="w-full max-w-sm border-4 border-black bg-white shadow-brutal-sm p-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm uppercase font-bold tracking-widest">
                                                <span>Subtotal</span>
                                                <span>₹{(selectedOrder.total_amount - (selectedOrder.shipping_fee || 0)).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm uppercase font-bold tracking-widest">
                                                <span>Shipping</span>
                                                <span>₹{(selectedOrder.shipping_fee || 0).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between font-black text-2xl pt-4 border-t-4 border-black uppercase tracking-widest bg-black text-white px-4 py-2 mt-4 ml-[-24px] mr-[-24px] mb-[-24px]">
                                                <span>Total</span>
                                                <span>₹{selectedOrder.total_amount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="p-6 border-t-4 border-black bg-white flex justify-end">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-10 py-4 bg-black text-matcha-bg font-black uppercase tracking-widest text-lg shadow-brutal transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
