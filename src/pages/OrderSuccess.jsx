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
            <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-baby-green border-t-matcha-deep"></div>
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border-2 border-red-500/20 bg-red-500/10 p-8 text-center text-red-700">
                        <h1 className="text-2xl font-bold">Oops!</h1>
                        <p className="mt-2">{error}</p>
                        <Link to="/" className="mt-6 inline-block font-bold underline hover:text-red-900">Return Home</Link>
                    </div>
                ) : !order ? (
                    <div className="text-center font-medium">Order not found.</div>
                ) : (
                    <>
                        <section className="window-container flex flex-col items-center border-none bg-baby-green/20 p-8 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-matcha-deep text-white">
                                <span className="material-symbols-outlined text-3xl">check</span>
                            </div>
                            <h1 className="text-3xl font-black text-matcha-deep">Payment Successful!</h1>
                            <p className="mt-2 text-lg font-medium text-charcoal-dark/70">
                                Your order <span className="font-bold text-charcoal-dark">#{order.id.split('-')[0]}</span> is confirmed.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <section className="window-container border-none p-6">
                                <h2 className="mb-4 text-xl font-bold">Shipping Details</h2>
                                <div className="space-y-1 text-sm text-charcoal-dark/80">
                                    <p className="font-bold text-charcoal-dark">{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                                    <p>{order.shipping_address.address}</p>
                                    <p>{order.shipping_address.city}, {order.shipping_address.pincode}</p>
                                    <p className="mt-2 text-xs text-charcoal-dark/60">Phone: {order.shipping_address.phone || 'N/A'}</p>
                                </div>
                            </section>

                            <section className="window-container border-none p-6">
                                <h2 className="mb-4 text-xl font-bold">Payment Setup</h2>
                                <div className="space-y-1 text-sm text-charcoal-dark/80">
                                    <p><span className="font-medium">Total Paid:</span> <span className="font-bold text-matcha-deep">₹{order.total_amount.toFixed(2)}</span></p>
                                    <p><span className="font-medium">Status:</span> <span className="rounded-full bg-black px-2 py-0.5 text-xs font-bold text-white uppercase">{order.status}</span></p>
                                    <p className="mt-2 text-xs text-charcoal-dark/60 uppercase">Txn ID: {order.razorpay_payment_id}</p>
                                </div>
                            </section>
                        </div>

                        <section className="window-container border-none p-6">
                            <h2 className="mb-4 text-xl font-bold">Order Items</h2>
                            <div className="divide-y divide-baby-green/30">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-4">
                                            {item.image_url ? (
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-off-white object-cover">
                                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-contain p-1" />
                                                </div>
                                            ) : (
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-baby-green/30 text-matcha-deep/50">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold line-clamp-1">{item.name}</p>
                                                <p className="text-xs font-semibold text-charcoal-dark/60 uppercase">
                                                    {item.variants ? Object.values(item.variants).join(' • ') : 'Standard'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">₹{item.price * item.quantity}</p>
                                            <p className="text-xs font-medium text-charcoal-dark/60">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex justify-center pt-4">
                            <Link to="/catalog" className="btn-glow-dark rounded-xl bg-charcoal-dark px-8 py-3 font-bold text-white transition hover:bg-black">
                                Continue Shopping
                            </Link>
                        </div>
                    </>
                )}
            </main>
        </StorefrontLayout>
    )
}
