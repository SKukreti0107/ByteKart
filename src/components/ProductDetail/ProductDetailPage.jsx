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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await api.getWithCache(`/listings/${id}`)
        const fetchedProduct = response.data
        setProduct(fetchedProduct)

        try {
          const relatedRes = await api.getWithCache(`/listings?category_id=${fetchedProduct.category_id}`)
          const filteredRelated = relatedRes.data.data
            .filter(p => p.id !== fetchedProduct.id)
            .map(item => {
              const displayPrice = (parseFloat(item.supplier_price) || 0) + (parseFloat(item.our_cut) || 0)
              return {
                ...item,
                price: `₹${displayPrice}`,
                oldPrice: item.MRP > displayPrice ? `₹${item.MRP}` : null
              }
            })
            .slice(0, 3)
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
        <div className="p-8 text-center text-red-500 font-bold uppercase">{error}</div>
      </StorefrontLayout>
    )
  }

  // Build deduplicated image list: primary image_url → variant combo images → gallery image_urls
  const images = (() => {
    const all = []
    const seen = new Set()
    const addUnique = (url) => { if (url && !seen.has(url)) { seen.add(url); all.push(url) } }
    const fallback = 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60'

    if (product?.image_url) addUnique(product.image_url)

    // Insert variant-combo images so they appear in the gallery
    if (product?.variant_combinations && Array.isArray(product.variant_combinations)) {
      for (const combo of product.variant_combinations) {
        if (combo.image_url) addUnique(combo.image_url)
      }
    }

    if (product?.image_urls && Array.isArray(product.image_urls)) {
      for (const url of product.image_urls) addUnique(url)
    }

    return all.length > 0 ? all : [fallback]
  })()

  // When a variant is selected, jump the gallery to its image
  const handleVariantImageChange = (imageUrl) => {
    if (!imageUrl) return
    const idx = images.indexOf(imageUrl)
    if (idx !== -1) setSelectedImageIndex(idx)
  }

  return (
    <StorefrontLayout>
      <main className="w-full space-y-16 px-6 lg:px-12 py-8">
        <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-sm font-black uppercase tracking-widest">
          <Link to="/" className="bg-charcoal/10 px-2 py-1 text-black hover:bg-black hover:text-white transition-colors">Home</Link>
          <span className="text-black/30">/</span>
          <Link to="/catalog" className="bg-charcoal/10 px-2 py-1 text-black hover:bg-black hover:text-white transition-colors">Catalog</Link>
          <span className="text-black/30">/</span>
          <span className="bg-black text-white px-2 py-1">{product?.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
          <ProductGallery images={images} selectedIndex={selectedImageIndex} />
          <PurchasePanel
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onVariantImageChange={handleVariantImageChange}
          />
        </div>


        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 pt-8">
          <div className="xl:col-span-3">
            <section className="text-black h-full border-4 border-black bg-white p-8 md:p-12 shadow-brutal relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-brutal-sm">Technical_Specs</div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-8 border-b-4 border-black pb-4 inline-block">Description</h2>
              <div className="max-h-96 overflow-y-auto pr-2">
                <p className="whitespace-pre-wrap font-bold text-base leading-relaxed max-w-5xl">{product?.description || 'No description available for this product.'}</p>
              </div>
            </section>
          </div>
        </div>

        <section className="space-y-8 pt-8 border-t-4 border-black">
          <h2 className="text-2xl font-black uppercase tracking-widest">Related Gear</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} actionLabel="Open" />
              ))
            ) : (
              <p className="text-sm font-bold uppercase tracking-widest text-gray-700">No related products found.</p>
            )}
          </div>
        </section>
      </main>
    </StorefrontLayout>
  )
}
