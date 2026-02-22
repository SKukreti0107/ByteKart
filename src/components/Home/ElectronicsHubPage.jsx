import { useState, useEffect } from 'react'
import StorefrontLayout from '../StorefrontLayout'
import Hero from './Hero'
import ProductCategories from './ProductCategories'
import ProductGrid from './ProductsGrid'
import ExtraCards from './ExtraCards'
import ProductCardSkeleton from '../Loaders/ProductCardSkeleton'
import api from '../../api'

const categories = [
    { icon: 'memory', title: 'Processors' },
    { icon: 'videocam', title: 'Graphics' },
    { icon: 'keyboard', title: 'Peripherals' },
    { icon: 'headphones', title: 'Audio Gear' },
]

export default function ElectronicsHubPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await api.get('/listings')
                // Map backend data to frontend format
                const mappedProducts = response.data.slice(0, 6).map(item => {
                    const displayPrice = (item.supplier_price || 0) + (item.our_cut || 0)
                    return {
                        ...item,
                        price: `₹${displayPrice}`,
                        oldPrice: item.MRP > displayPrice ? `₹${item.MRP}` : null,
                        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60', // Mock image
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
        fetchListings()
    }, [])

    if (loading) {
        return (
            <StorefrontLayout>
                <main className="w-full space-y-8">
                    <Hero />
                    <ProductCategories categories={categories} />
                    <section className="mb-12">
                        <div className="mb-8 flex items-end justify-between">
                            <h2 className="text-3xl font-bold text-charcoal-dark sm:text-4xl">Trending Now</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[1, 2, 3, 4].map((n) => (
                                <ProductCardSkeleton key={n} />
                            ))}
                        </div>
                    </section>
                    <ExtraCards />
                </main>
            </StorefrontLayout>
        )
    }

    if (error) return <StorefrontLayout><div className="p-8 text-center text-red-500">{error}</div></StorefrontLayout>

    return (
        <StorefrontLayout>
            <main className="w-full space-y-8">
                <Hero />
                <ProductCategories categories={categories} />
                <ProductGrid products={products} />
                <ExtraCards />
            </main>
        </StorefrontLayout>
    )
}
