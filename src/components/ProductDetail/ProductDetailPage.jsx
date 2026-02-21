import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import StorefrontLayout from '../StorefrontLayout'
import ProductCard from '../ProductCard'
import ProductGallery from './ProductGallery'
import PurchasePanel from './PurchasePanel'
import ProductDetailSkeleton from '../Loaders/ProductDetailSkeleton'
import api from '../../api'



export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/listings/${id}`)
        const fetchedProduct = response.data
        setProduct(fetchedProduct)

        try {
          const relatedRes = await api.get(`/listings?category_id=${fetchedProduct.category_id}`)
          const filteredRelated = relatedRes.data.filter(p => p.id !== fetchedProduct.id).slice(0, 3)
          setRelatedProducts(filteredRelated)
        } catch (relatedErr) {
          console.error("Failed to fetch related products:", relatedErr)
        }
      } catch (err) {
        console.error("Failed to fetch product:", err)
        setError("Failed to load product details.")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  if (loading) {
    return (
      <StorefrontLayout>
        <ProductDetailSkeleton />
      </StorefrontLayout>
    )
  }

  if (error) {
    return (
      <StorefrontLayout>
        <div className="p-8 text-center text-red-500">{error}</div>
      </StorefrontLayout>
    )
  }

  // Fallback to a single placeholder if the product lacks an image
  const displayImage = product?.image_url || 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60'

  return (
    <StorefrontLayout>
      <main className="w-full space-y-8">
        <div className="window-container break-words border-none px-4 py-4 text-sm font-semibold text-charcoal-dark/70 sm:px-6">
          <Link to="/" className="hover:text-matcha-deep transition-colors">Home</Link> /
          <Link to="/catalog" className="hover:text-matcha-deep transition-colors ml-1">Catalog</Link> /
          <span className="text-matcha-deep ml-1">{product?.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ProductGallery selectedImage={displayImage} />
          <PurchasePanel
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <section className="window-container border-none p-6 text-charcoal-dark h-full">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="whitespace-pre-wrap">{product?.description || 'No description available for this product.'}</p>
            </section>
          </div>
        </div>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Related Gear</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} actionLabel="Open" />
              ))
            ) : (
              <p className="text-sm font-medium text-charcoal-dark/70">No related products found.</p>
            )}
          </div>
        </section>
      </main>
    </StorefrontLayout>
  )
}
