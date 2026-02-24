import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

const HeroSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-pure-black min-h-[500px]">
      <div className="md:col-span-7 p-12 lg:p-20 flex flex-col justify-center bg-pure-white border-b-4 md:border-b-0 md:border-r-4 border-pure-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 flex flex-col gap-6">
          <div className="h-8 w-32 animate-pulse bg-charcoal/10" />
          <div className="h-20 md:h-24 w-3/4 animate-pulse bg-charcoal/10" />
          <div className="h-20 md:h-24 w-1/2 animate-pulse bg-charcoal/10" />
          <div className="h-4 w-5/6 animate-pulse bg-charcoal/10 mt-4" />
          <div className="h-16 w-48 animate-pulse bg-charcoal/10 mt-8" />
        </div>
      </div>
      <div className="md:col-span-5 bg-charcoal/5 relative p-8 lg:p-12 flex items-center justify-center animate-pulse">
        <div className="w-full aspect-square max-w-md bg-charcoal/10" />
      </div>
    </section>
  )
}

export default function Hero() {
  const [heroData, setHeroData] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.getWithCache('/hero')
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

  if (!heroData) return <HeroSkeleton />

  if (heroData.type === 'newest') {
    const currentItem = heroData.listings[activeIndex]
    if (!currentItem) return null
    return (
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-pure-black min-h-[500px]">
        <div className="md:col-span-7 p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-pure-white border-b-4 md:border-b-0 md:border-r-4 border-pure-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          <div className="relative z-10 transition-opacity duration-500 flex flex-col h-full justify-center">

            <div className="inline-block bg-pure-black text-matcha-bg px-4 py-2 mb-8 shadow-brutal-sm border-2 border-transparent w-fit">
              <span className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">New Arrival</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-display font-black leading-[0.85] text-pure-black mb-6 md:mb-8 tracking-tighter uppercase break-words" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
              {currentItem.name}
            </h2>

            <p className="text-charcoal text-base md:text-lg font-bold max-w-xl leading-relaxed mb-10 border-l-4 border-black pl-4 line-clamp-3">
              {currentItem.description || 'Check out our latest premium addition tailored for enthusiasts.'}
            </p>

            <Link to={`/product/${currentItem.id}`} className="bg-matcha-bg text-black px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-base md:text-lg border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center gap-3 group w-fit">
              Shop Now - ₹{(currentItem.supplier_price || 0) + (currentItem.our_cut || 0)}
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>

            {heroData.listings.length > 1 && (
              <div className="mt-12 flex gap-3">
                {heroData.listings.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-3 transition-all border-2 border-black ${idx === activeIndex ? 'w-10 bg-black' : 'w-3 bg-white hover:bg-gray-200'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-5 bg-matcha-bg relative p-8 lg:p-12 flex items-center justify-center min-h-[400px] md:min-h-0 filter grayscale hover:grayscale-0 transition-all duration-700">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
          <img
            alt={currentItem.name}
            className="relative z-10 w-full max-w-md object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-4 hover:scale-105 transition-transform duration-500"
            src={currentItem.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
            fetchPriority="high"
            loading="eager"
          />
        </div>
      </section>
    )
  }

  const typeLabels = {
    offer: { icon: 'local_offer', text: 'Special Offer' },
    manual_banner: { icon: 'campaign', text: 'Announcement' },
    featured: { icon: 'star', text: 'Featured Pick' }
  }
  const label = typeLabels[heroData.type] || { icon: 'info', text: 'Highlight' }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-pure-black min-h-[500px]">
      <div className="md:col-span-7 p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-pure-white border-b-4 md:border-b-0 md:border-r-4 border-pure-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 flex flex-col h-full justify-center">

          <div className="inline-flex items-center gap-2 bg-pure-black text-matcha-bg px-4 py-2 mb-8 shadow-brutal-sm border-2 border-transparent w-fit">
            <span className="material-symbols-outlined text-sm">{label.icon}</span>
            <span className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">{label.text}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-display font-black leading-[0.85] text-pure-black mb-6 md:mb-8 tracking-tighter uppercase break-words" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
            {heroData.title}
          </h2>

          {heroData.subtitle && (
            <p className="text-charcoal text-base md:text-lg font-bold max-w-xl leading-relaxed mb-10 border-l-4 border-black pl-4 line-clamp-3">
              {heroData.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-4 mt-auto">
            {(heroData.cta_text && heroData.cta_link) ? (
              <Link to={heroData.cta_link} className="bg-matcha-bg text-black px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-base md:text-lg border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center gap-3 group w-fit">
                {heroData.cta_text}
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            ) : heroData.product_id ? (
              <Link to={`/product/${heroData.product_id}`} className="bg-matcha-bg text-black px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-base md:text-lg border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center gap-3 group w-fit">
                View Product
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className="md:col-span-5 bg-matcha-bg relative p-8 lg:p-12 flex items-center justify-center min-h-[400px] md:min-h-0 filter grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
        <img
          alt={heroData.title}
          className="relative z-10 w-full max-w-md object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-4 hover:scale-105 transition-transform duration-500"
          src={heroData.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
          fetchPriority="high"
          loading="eager"
        />
      </div>
    </section>
  )
}
