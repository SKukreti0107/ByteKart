import { useMemo, useState } from 'react'
import StorefrontLayout from '../StorefrontLayout'
import CatalogSidebar from './CatalogSidebar'
import CatalogToolbar from './CatalogToolbar'
import CatalogResults from './CatalogResults'

const catalogProducts = [
  { id: 1, name: 'Leaf Core i9 14900K', category: 'CPU', brand: 'LeafCore', rating: 4.9, priceValue: 499, price: '$499', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60', tags: ['Top Rated'] },
  { id: 2, name: 'Matcha Pro RTX 5080', category: 'GPU', brand: 'MatchaPro', rating: 4.8, priceValue: 899, price: '$899', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=60', tags: ['New'] },
  { id: 3, name: 'Glow RAM 32GB DDR5', category: 'RAM', brand: 'ZenWare', rating: 4.7, priceValue: 179, price: '$179', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=60', tags: ['Best Seller'] },
  { id: 4, name: 'Zen NVMe 2TB Gen4', category: 'Storage', brand: 'ZenWare', rating: 4.8, priceValue: 229, price: '$229', image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=600&auto=format&fit=crop&q=60', tags: ['Eco-Built'] },
  { id: 5, name: 'Eco Board B760', category: 'Motherboard', brand: 'EcoTech', rating: 4.5, priceValue: 209, price: '$209', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format&fit=crop&q=60', tags: ['Limited'] },
  { id: 6, name: 'Leaf Core i7 14700', category: 'CPU', brand: 'LeafCore', rating: 4.7, priceValue: 369, price: '$369', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60', tags: ['Hot'] },
  { id: 7, name: 'Matcha Pro RTX 5070', category: 'GPU', brand: 'MatchaPro', rating: 4.6, priceValue: 699, price: '$699', image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3a0?w=600&auto=format&fit=crop&q=60', tags: ['Trending'] },
  { id: 8, name: 'Glow RAM 64GB DDR5', category: 'RAM', brand: 'EcoTech', rating: 4.6, priceValue: 299, price: '$299', image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&auto=format&fit=crop&q=60', tags: ['Pro'] },
  { id: 9, name: 'Zen NVMe 4TB Gen5', category: 'Storage', brand: 'ZenWare', rating: 4.9, priceValue: 429, price: '$429', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=60', tags: ['Ultra Fast'] },
]

const perPage = 6

export default function CatalogPage() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [priceCap, setPriceCap] = useState(1000)
  const [sortBy, setSortBy] = useState('featured')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    const base = catalogProducts.filter((item) => {
      const categoryMatch = selectedCategories.length ? selectedCategories.includes(item.category) : true
      const brandMatch = selectedBrand === 'All' ? true : item.brand === selectedBrand
      const priceMatch = item.priceValue <= priceCap
      return categoryMatch && brandMatch && priceMatch
    })

    const sorted = [...base]
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.priceValue - b.priceValue)
    if (sortBy === 'price-desc') sorted.sort((a, b) => b.priceValue - a.priceValue)
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [priceCap, selectedBrand, selectedCategories, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paginatedProducts = filteredProducts.slice((safePage - 1) * perPage, safePage * perPage)

  const toggleCategory = (value) => {
    setPage(1)
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <StorefrontLayout>
      <main className="w-full">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <CatalogSidebar
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceCap={priceCap}
            setPriceCap={setPriceCap}
          />

          <div>
            <CatalogToolbar sortBy={sortBy} setSortBy={setSortBy} view={view} setView={setView} resultCount={filteredProducts.length} />
            <CatalogResults products={paginatedProducts} view={view} page={safePage} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      </main>
    </StorefrontLayout>
  )
}
