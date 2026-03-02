import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import api from '../api'

export default function OrderSuccess() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/orders/${id}`)
                setOrder(response.data)
            } catch (err) {
                setError(err.response?.data?.detail || "Could not fetch order details")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchOrder()
    }, [id])

    return (
        <StorefrontLayout>
            <main className="w-full space-y-12 px-6 lg:px-12 py-12 mb-20">
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-12 w-12 animate-spin border-4 border-black border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="border-4 border-black bg-white p-12 text-center shadow-brutal">
                        <h1 className="text-4xl font-black uppercase tracking-widest text-black">Oops!</h1>
                        <p className="mt-4 font-bold text-red-600 uppercase tracking-widest">{error}</p>
                        <Link to="/" className="mt-8 inline-block border-4 border-black bg-black px-8 py-3 font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors shadow-brutal-sm hover:translate-y-1 hover:shadow-none">Return Home</Link>
                    </div>
                ) : !order ? (
                    <div className="text-center font-black uppercase tracking-widest text-black">Order not found.</div>
                ) : (
                    <>
                        <section className="border-4 border-black bg-white p-12 text-center shadow-brutal flex flex-col items-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center border-4 border-black bg-matcha-bg shadow-brutal-sm">
                                <span className="material-symbols-outlined text-4xl font-black text-black">inventory</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-black">Booking Request Sent!</h1>
                            <p className="mt-4 text-lg font-black uppercase tracking-widest text-gray-500">
                                Your request <span className="text-black">#{order.id.split('-')[0]}</span> is now with the supplier for confirmation.
                            </p>
                            <p className="mt-2 text-sm font-bold text-black border-l-4 border-black pl-4 text-left max-w-lg mt-6 bg-matcha-bg/50 p-4">
                                Once availability and pricing are confirmed, your request status will update to <span className="uppercase tracking-widest bg-black text-white px-2 py-1 mx-1">Approved</span> and you will be able to complete payment from your Requests page.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            <section className="border-4 border-black bg-white p-8 shadow-brutal">
                                <h2 className="mb-6 text-xl font-black uppercase tracking-widest text-black border-b-4 border-black pb-2 inline-block">Shipping Details</h2>
                                <div className="space-y-2 text-sm">
                                    <p className="font-black uppercase tracking-widest text-black">{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                                    <p className="font-bold uppercase text-gray-600">{order.shipping_address.address}</p>
                                    <p className="font-bold uppercase text-gray-600">{order.shipping_address.city}, {order.shipping_address.pincode}</p>
                                    <div className="mt-4 pt-4 border-t-2 border-black border-dashed">
                                        <p className="text-xs font-black uppercase tracking-widest text-black">Phone: {order.shipping_address.phone || 'N/A'}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="border-4 border-black bg-white p-8 shadow-brutal">
                                <h2 className="mb-6 text-xl font-black uppercase tracking-widest text-black border-b-4 border-black pb-2 inline-block">Order Summary</h2>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="font-black uppercase tracking-widest text-gray-500">Total:</span>
                                        <span className="font-black text-xl text-black">₹{order.total_amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-black uppercase tracking-widest text-gray-500">Status:</span>
                                        <span className={`border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-widest ${order.status === 'requested' ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}>{order.status}</span>
                                    </div>
                                    {order.razorpay_payment_id && (
                                        <div className="mt-4 pt-4 border-t-2 border-black border-dashed">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 break-all">TXN ID: {order.razorpay_payment_id}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        <section className="border-4 border-black bg-white p-8 shadow-brutal">
                            <h2 className="mb-8 text-xl font-black uppercase tracking-widest text-black border-b-4 border-black pb-2 inline-block">Order Items</h2>
                            <div className="space-y-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between pb-6 border-b-2 border-black border-dashed last:border-0 last:pb-0">
                                        <div className="flex items-center gap-6">
                                            {item.image_url ? (
                                                <div className="flex h-20 w-20 shrink-0 items-center justify-center border-4 border-black bg-white p-2">
                                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="flex h-20 w-20 shrink-0 items-center justify-center border-4 border-black bg-gray-50 text-gray-300">
                                                    <span className="material-symbols-outlined text-4xl">image</span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-black uppercase tracking-widest text-black text-sm md:text-base line-clamp-1">{item.name}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">
                                                    {item.variants ? Object.values(item.variants).join(' • ') : 'Standard Edition'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-black whitespace-nowrap">₹{item.price * item.quantity}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex justify-center pt-8">
                            <Link to="/catalog" className="w-full md:w-auto text-center border-4 border-black bg-black px-12 py-4 font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all shadow-brutal-sm hover:translate-y-1 hover:shadow-none">
                                Continue Shopping
                            </Link>
                        </div>
                    </>
                )}
            </main>
        </StorefrontLayout>
    )
}
