import { useState } from 'react'
import StorefrontLayout from '../StorefrontLayout'
import ProductCard from '../ProductCard'
import ProductGallery from './ProductGallery'
import PurchasePanel from './PurchasePanel'
import ProductTabs from './ProductTabs'

const images = [
  'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=1200&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1624705002509-831f5e4e2931?w=1200&auto=format&fit=crop&q=60',
]

const related = [
  { id: 1, name: 'Zen NVMe 2TB', price: '$219', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60', tags: ['Fast'] },
  { id: 2, name: 'Glow RAM 32GB', price: '$189', image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&auto=format&fit=crop&q=60', tags: ['Bundle'] },
  { id: 3, name: 'Leaf Core i7', price: '$369', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60', tags: ['Top Rated'] },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('Matcha Green')
  const [activeTab, setActiveTab] = useState('Specs')

  return (
    <StorefrontLayout>
      <main className="w-full space-y-8">
        <div className="window-container break-words border-none px-4 py-4 text-sm font-semibold text-[color:var(--charcoal-dark)]/70 sm:px-6">
          Home / Components / GPUs / <span className="text-[var(--matcha-deep)]">Matcha Pro GPU 5080</span>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ProductGallery images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <PurchasePanel
            quantity={quantity}
            setQuantity={setQuantity}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <section className="window-container border-none p-6">
            <p className="text-xs font-bold tracking-widest text-[var(--matcha-deep)] uppercase">Build Bundle</p>
            <h3 className="mt-2 text-2xl font-bold">Creator Stack</h3>
            <p className="mt-2 text-sm font-medium text-[color:var(--charcoal-dark)]/70">
              Match this GPU with our curated CPU + RAM picks and save up to $120 instantly.
            </p>
            <button className="btn-glow mt-5 rounded-xl bg-[var(--baby-green)] px-5 py-3 font-bold text-[var(--charcoal-dark)]">
              Add Full Bundle
            </button>
          </section>
        </div>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Related Gear</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} actionLabel="Open" />
            ))}
          </div>
        </section>
      </main>
    </StorefrontLayout>
  )
}
