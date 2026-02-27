import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import StorefrontLayout from '../StorefrontLayout'
import CatalogSidebar from './CatalogSidebar'
import CatalogToolbar from './CatalogToolbar'
import CatalogResults from './CatalogResults'
import ProductCardSkeleton from '../Loaders/ProductCardSkeleton'
import CatalogSidebarSkeleton from '../Loaders/CatalogSidebarSkeleton'
import api from '../../api'

const perPage = 8

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [queryCategory, setQueryCategory] = useState(searchParams.get('category'))
  const [categories, setCategories] = useState([])

  const [catalogProducts, setCatalogProducts] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Update state whenever the query param changes (like when clicking nav)
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const currentCategory = searchParams.get('category')
    setQueryCategory(currentCategory)
    // Clear subcategories when navigating to a new main category
    setSelectedSubCategories([])
    setSelectedBrand('All')
    setPage(1)
  }, [searchParams])

  const [selectedBrand, setSelectedBrand] = useState('All')
  const [priceCap, setPriceCap] = useState(1000000)
  const [sortBy, setSortBy] = useState('featured')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()

        const querySearch = searchParams.get('search')
        if (querySearch) {
          params.append('search', querySearch)
        }

        if (queryCategory) {
          const categoryObj = categories.find(c => c.name === queryCategory)
          if (categoryObj) {
            params.append('category_id', categoryObj.id)
          } else {
            // Categories might not be loaded yet, wait for them
            if (categories.length === 0 && !querySearch) return
          }
        }

        if (selectedSubCategories.length > 0) {
          const subCatObj = subCategories.find(s => s.name === selectedSubCategories[0])
          if (subCatObj) {
            params.append('subCategory_id', subCatObj.id)
          }
        }

        if (selectedBrand !== 'All') {
          const brandObj = brands.find(b => b.name === selectedBrand)
          if (brandObj) {
            params.append('brand_id', brandObj.id)
          }
        }

        // Server-side pagination params
        params.append('limit', String(perPage))
        params.append('skip', String((page - 1) * perPage))

        const url = `/listings${params.toString() ? `?${params.toString()}` : ''}`
        const response = await api.get(url)

        // Map backend data to frontend format
        const mappedProducts = response.data.data.map(item => {
          const displayPrice = (parseFloat(item.supplier_price) || 0) + (parseFloat(item.our_cut) || 0)
          return {
            ...item,
            priceValue: displayPrice,
            price: `₹${displayPrice}`,
            oldPrice: item.MRP > displayPrice ? `₹${item.MRP}` : null,
            rating: 4.5, // Mock rating
            image: item.image_url || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60',
            tags: []
          }
        })
        setCatalogProducts(mappedProducts)
        setTotalItems(response.data.total)
      } catch (err) {
        console.error("Failed to fetch listings:", err)
        setError("Failed to load catalog.")
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [categories, queryCategory, selectedSubCategories, selectedBrand, subCategories, brands, searchParams, page])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getWithCache('/categories')
        setCategories(response.data)
      } catch (err) {
        console.error("Failed to fetch categories:", err)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const currentCategoryObj = categories.find(c => c.name === queryCategory)
    if (currentCategoryObj) {
      api.getWithCache(`/subCategories?category_id=${currentCategoryObj.id}`)
        .then(res => setSubCategories(res.data))
        .catch(err => console.error("Failed to fetch subcategories:", err))
    } else {
      setSubCategories([])
    }
  }, [categories, queryCategory])

  useEffect(() => {
    if (selectedSubCategories.length > 0) {
      const selectedSubCatObj = subCategories.find(sc => sc.name === selectedSubCategories[0])
      if (selectedSubCatObj) {
        api.getWithCache(`/brands?subCategory_id=${selectedSubCatObj.id}`)
          .then(res => setBrands(res.data))
          .catch(err => console.error("Failed to fetch brands", err))
      }
    } else {
      setBrands([])
      setSelectedBrand('All')
    }
  }, [selectedSubCategories, subCategories])

  const filteredProducts = useMemo(() => {
    const selectedSubCatIds = selectedSubCategories
      .map(name => subCategories.find(s => s.name === name)?.id)
      .filter(Boolean)
    const activeBrandId = selectedBrand !== 'All' ? brands.find(b => b.name === selectedBrand)?.id : null

    const base = catalogProducts.filter((item) => {
      const subCategoryMatch = selectedSubCatIds.length
        ? selectedSubCatIds.includes(item.subcategory_id)
        : true
      const brandMatch = activeBrandId ? item.brand_id === activeBrandId : true
      const priceMatch = item.priceValue <= priceCap
      return subCategoryMatch && brandMatch && priceMatch
    })

    const sorted = [...base]
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.priceValue - b.priceValue)
    if (sortBy === 'price-desc') sorted.sort((a, b) => b.priceValue - a.priceValue)
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [catalogProducts, priceCap, selectedBrand, selectedSubCategories, sortBy])

  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const safePage = Math.min(page, totalPages)

  const toggleSubCategory = (value) => {
    setPage(1)
    setSelectedSubCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <StorefrontLayout>
      <main className="w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 lg:mt-12 px-6 lg:px-12 mb-20 w-full">
          {categories.length === 0 && loading ? (
            <div className="w-full lg:w-80 flex-shrink-0">
              <CatalogSidebarSkeleton />
            </div>
          ) : (
            <CatalogSidebar
              selectedSubCategories={selectedSubCategories}
              toggleSubCategory={toggleSubCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceCap={priceCap}
              setPriceCap={setPriceCap}
              categories={categories}
              queryCategory={queryCategory}
              subCategories={subCategories}
              brands={brands}
            />
          )}

          <div className="flex-grow">
            {loading ? (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-4 border-black bg-white p-4 shadow-brutal-sm">
                  <div className="h-8 w-32 animate-pulse bg-charcoal/10" />
                  <div className="flex gap-4">
                    <div className="h-12 w-40 animate-pulse bg-charcoal/10" />
                    <div className="h-12 w-24 animate-pulse bg-charcoal/10 hidden sm:block" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map(n => <ProductCardSkeleton key={n} />)}
                </div>
              </>
            ) : error ? (
              <div className="p-8 text-center text-red-500 font-bold uppercase">{error}</div>
            ) : (
              <>
                <CatalogToolbar sortBy={sortBy} setSortBy={setSortBy} view={view} setView={setView} resultCount={totalItems} />
                <CatalogResults products={filteredProducts} view={view} page={safePage} setPage={setPage} totalPages={totalPages} />
              </>
            )}
          </div>
        </div>
      </main>
    </StorefrontLayout>
  )
}
