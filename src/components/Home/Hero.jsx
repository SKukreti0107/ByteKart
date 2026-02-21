import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function Hero() {
  const [heroData, setHeroData] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get('/hero')
        setHeroData(res.data)
      } catch (err) {
        console.error("Failed to fetch hero:", err)
      }
    }
    fetchHero()
  }, [])

  useEffect(() => {
    if (heroData?.type === 'newest' && heroData?.listings?.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroData.listings.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [heroData])

  if (!heroData) return <div className="min-h-[420px] md:min-h-[500px] animate-pulse bg-charcoal-dark/5 rounded-[2.5rem]"></div>

  if (heroData.type === 'newest') {
    const currentItem = heroData.listings[activeIndex]
    if (!currentItem) return null
    return (
      <section className="window-container relative flex min-h-[420px] items-center overflow-hidden border-none md:min-h-[500px]">
        <div className="absolute top-0 right-0 h-full w-2/3 translate-x-12 rounded-l-[3rem] bg-baby-green/30 transition-all duration-1000" />
        <div className="relative grid w-full grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 md:gap-12 md:px-16 md:py-12 lg:grid-cols-2">
          <div className="z-10 transition-opacity duration-500">
            <div className="btn-glow mb-6 inline-flex items-center gap-2 rounded-full bg-baby-green px-4 py-1.5 text-xs font-bold tracking-wider text-matcha-deep uppercase">
              <span className="material-symbols-outlined text-sm">new_releases</span>
              New Arrivals
            </div>
            <h2 className="mb-6 text-4xl leading-[1.05] font-bold text-charcoal-dark sm:text-5xl md:text-6xl line-clamp-2">
              {currentItem.name}
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed font-medium text-charcoal-dark/80 sm:text-lg line-clamp-3">
              {currentItem.description || 'Check out our latest premium addition tailored for enthusiasts.'}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to={`/product/${currentItem.id}`} className="btn-glow-dark inline-block rounded-2xl bg-matcha-deep px-7 py-3.5 font-bold text-white transition-all hover:bg-charcoal-dark sm:px-10 sm:py-4">
                Shop Now - ${currentItem.price}
              </Link>
            </div>
            {/* Slide indicators */}
            <div className="mt-8 flex gap-2">
              {heroData.listings.map((_, idx) => (
                <button key={idx} onClick={() => setActiveIndex(idx)} className={`h-2 rounded-full transition-all ${idx === activeIndex ? 'w-8 bg-matcha-deep' : 'w-2 bg-charcoal-dark/20 hover:bg-matcha-deep/50'}`} />
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block transition-all duration-700">
            <div className="rotate-2 rounded-[2.5rem] bg-white p-3 shadow-xl transition-transform duration-500 hover:rotate-0">
              <img
                alt={currentItem.name}
                className="aspect-video w-full rounded-[2rem] object-cover"
                src={currentItem.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl border-4 border-baby-green bg-charcoal-dark p-6 text-white shadow-xl">
                <p className="mb-1 text-xs font-bold tracking-widest text-baby-green uppercase drop-shadow-[0_0_8px_rgba(198,220,186,0.8)]">
                  New Arrival
                </p>
                <p className="text-xl font-bold truncate max-w-[200px]">{currentItem.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Static banner mapping ('offer', 'manual_banner', 'featured')
  const typeLabels = {
    offer: { icon: 'local_offer', text: 'Special Offer' },
    manual_banner: { icon: 'campaign', text: 'Announcement' },
    featured: { icon: 'star', text: 'Featured Pick' }
  }
  const label = typeLabels[heroData.type] || { icon: 'info', text: 'Highlight' }

  return (
    <section className="window-container relative flex min-h-[420px] items-center overflow-hidden border-none md:min-h-[500px]">
      <div className="absolute top-0 right-0 h-full w-2/3 translate-x-12 rounded-l-[3rem] bg-baby-green/30" />
      <div className="relative grid w-full grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 md:gap-12 md:px-16 md:py-12 lg:grid-cols-2">
        <div className="z-10">
          <div className="btn-glow mb-6 inline-flex items-center gap-2 rounded-full bg-baby-green px-4 py-1.5 text-xs font-bold tracking-wider text-matcha-deep uppercase">
            <span className="material-symbols-outlined text-sm">{label.icon}</span>
            {label.text}
          </div>
          <h2 className="mb-6 text-4xl leading-[1.05] font-bold text-charcoal-dark sm:text-5xl md:text-7xl line-clamp-2">
            {heroData.title}
          </h2>
          {heroData.subtitle && (
            <p className="mb-8 max-w-md text-base leading-relaxed font-medium text-charcoal-dark/80 sm:text-lg line-clamp-3">
              {heroData.subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            {(heroData.cta_text && heroData.cta_link) ? (
              <Link to={heroData.cta_link} className="btn-glow-dark inline-block rounded-2xl bg-matcha-deep px-7 py-3.5 font-bold text-white transition-all hover:bg-charcoal-dark sm:px-10 sm:py-4">
                {heroData.cta_text}
              </Link>
            ) : heroData.product_id ? (
              <Link to={`/product/${heroData.product_id}`} className="btn-glow-dark inline-block rounded-2xl bg-matcha-deep px-7 py-3.5 font-bold text-white transition-all hover:bg-charcoal-dark sm:px-10 sm:py-4">
                View Product
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="rotate-2 rounded-[2.5rem] bg-white p-3 shadow-xl transition-transform duration-500 hover:rotate-0">
            <img
              alt={heroData.title}
              className="aspect-video w-full rounded-[2rem] object-cover"
              src={heroData.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
