import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StorefrontLayout from '../StorefrontLayout'
import Hero from './Hero'
import ProductGrid from './ProductsGrid'
import ProductCardSkeleton from '../Loaders/ProductCardSkeleton'
import api from '../../api'

const noticeStyles = {
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-400 text-black',
    promo: 'bg-matcha-dark text-white',
    urgent: 'bg-red-600 text-white',
}

export default function ElectronicsHubPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notice, setNotice] = useState(null)
    const [noticeDismissed, setNoticeDismissed] = useState(false)

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await api.getWithCache('/listings')
                const mappedProducts = response.data.slice(0, 8).map(item => {
                    const displayPrice = (item.supplier_price || 0) + (item.our_cut || 0)
                    return {
                        ...item,
                        price: `₹${displayPrice}`,
                        oldPrice: item.MRP > displayPrice ? `₹${item.MRP}` : null,
                        image: item.image_url || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60',
                        tags: []
                    }
                })
                setProducts(mappedProducts)
            } catch (err) {
                console.error("Failed to fetch listings:", err)
                setError("Failed to load products.")
            } finally {
                setLoading(false)
            }
        }

        const fetchNotice = async () => {
            try {
                const response = await api.getWithCache('/notice', {}, 60000)
                if (response.data) {
                    setNotice(response.data)
                }
            } catch (err) {
                console.error("Failed to fetch notice:", err)
            }
        }

        fetchListings()
        fetchNotice()
    }, [])

    return (
        <StorefrontLayout>
            <main className="w-full">
                {/* Global Notice Banner */}
                {notice && !noticeDismissed && (
                    <div className={`w-full px-4 py-3 flex items-center justify-center gap-4 border-b-4 border-pure-black ${noticeStyles[notice.type] || noticeStyles.info}`}>
                        <span className="material-symbols-outlined text-lg">
                            {notice.type === 'urgent' ? 'warning' : notice.type === 'promo' ? 'local_offer' : notice.type === 'warning' ? 'info' : 'campaign'}
                        </span>
                        <p className="text-sm font-black uppercase tracking-wider text-center flex-1">
                            {notice.message}
                        </p>
                        <button
                            onClick={() => setNoticeDismissed(true)}
                            className="font-black text-lg hover:opacity-70 transition-opacity"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <Hero />
                <section className="bg-matcha-bg py-16 px-6 lg:px-12 border-b-4 border-pure-black">
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12">
                            <h3 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-black" style={{ textShadow: '3px 3px 0px #FFF' }}>Latest Arrivals</h3>
                            <Link to="/catalog" className="text-base md:text-lg font-bold border-b-4 border-black hover:bg-black hover:text-white px-2 transition-all w-fit">View All</Link>
                        </div>
                        {loading ? (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <ProductCardSkeleton key={n} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center font-bold text-red-500 uppercase">{error}</div>
                        ) : (
                            <ProductGrid products={products} />
                        )}
                    </div>
                </section>
            </main>
        </StorefrontLayout>
    )
}
