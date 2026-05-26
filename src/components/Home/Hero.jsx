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
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-pure-black min-h-[420px] md:min-h-[550px] relative">
        <div className="md:col-span-7 p-6 sm:p-12 lg:p-20 flex flex-col justify-center bg-pure-white border-b-4 md:border-b-0 md:border-r-4 border-pure-black relative overflow-hidden">
          {/* Premium Dot Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-matcha-bg/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 transition-all duration-500 flex flex-col h-full justify-center">
            <div className="inline-block bg-pure-black text-matcha-bg px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 shadow-[3px_3px_0px_#C6DCBA] border-2 border-pure-black w-fit transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] uppercase">New Arrival</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[6.5rem] font-display font-black leading-[0.9] lg:leading-[0.85] text-pure-black mb-4 sm:mb-6 tracking-tighter uppercase break-words" style={{ textShadow: '4px 4px 0px #C6DCBA, 8px 8px 0px rgba(0,0,0,0.1)' }}>
              {currentItem.name}
            </h2>

            <p className="text-charcoal text-xs sm:text-base font-bold max-w-xl leading-relaxed mb-6 sm:mb-8 border-l-4 border-matcha-dark pl-4 line-clamp-3 md:line-clamp-2">
              {currentItem.description?.length > 120 ? currentItem.description.substring(0, 120).trim() + '...' : (currentItem.description || 'Check out our latest premium addition tailored for enthusiasts.')}
            </p>

            {/* Mobile-only Image Container */}
            <div className="md:hidden w-full max-h-48 bg-matcha-bg border-4 border-black p-3 mb-6 flex items-center justify-center relative overflow-hidden shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
               <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none"></div>
               <img
                alt={currentItem.name}
                className="relative z-10 h-32 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform"
                src={currentItem.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link to={`/product/${currentItem.id}`} className="bg-matcha-bg text-black px-6 py-3 sm:px-10 sm:py-4.5 font-black uppercase tracking-widest text-sm sm:text-base border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center gap-2 sm:gap-3 group w-fit">
                Shop Now - ₹{(parseFloat(currentItem.supplier_price) || 0) + (parseFloat(currentItem.our_cut) || 0)}
                <span className="material-symbols-outlined text-lg sm:text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {heroData.listings.length > 1 && (
              <div className="mt-6 sm:mt-10 flex gap-2.5">
                {heroData.listings.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-3 transition-all border-2 border-black ${idx === activeIndex ? 'w-10 bg-black shadow-brutal-sm' : 'w-3 bg-white hover:bg-gray-100'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Image Section */}
        <div className="hidden md:flex md:col-span-5 bg-matcha-bg relative p-8 lg:p-12 items-center justify-center min-h-[300px] md:min-h-0 filter grayscale hover:grayscale-0 transition-all duration-750 group">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
          {/* Subtle frame behind image */}
          <div className="absolute w-72 h-72 border-4 border-black bg-pure-white shadow-brutal -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
          <img
            alt={currentItem.name}
            className="relative z-10 w-full max-w-[220px] md:max-w-xs object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] group-hover:-translate-y-3 group-hover:scale-105 transition-all duration-500"
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
    <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-pure-black min-h-[420px] md:min-h-[550px] relative">
      <div className="md:col-span-7 p-6 sm:p-12 lg:p-20 flex flex-col justify-center bg-pure-white border-b-4 md:border-b-0 md:border-r-4 border-pure-black relative overflow-hidden">
        {/* Premium Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-matcha-bg/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="inline-flex items-center gap-2 bg-pure-black text-matcha-bg px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 shadow-[3px_3px_0px_#C6DCBA] border-2 border-pure-black w-fit transform -rotate-1 hover:rotate-0 transition-transform">
            <span className="material-symbols-outlined text-xs sm:text-sm">{label.icon}</span>
            <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] uppercase">{label.text}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[6.5rem] font-display font-black leading-[0.9] lg:leading-[0.85] text-pure-black mb-4 sm:mb-6 tracking-tighter uppercase break-words" style={{ textShadow: '4px 4px 0px #C6DCBA, 8px 8px 0px rgba(0,0,0,0.1)' }}>
            {heroData.title}
          </h2>

          {heroData.subtitle && (
            <p className="text-charcoal text-xs sm:text-base font-bold max-w-xl leading-relaxed mb-6 sm:mb-8 border-l-4 border-matcha-dark pl-4 line-clamp-3 md:line-clamp-2">
              {heroData.subtitle.length > 120 ? heroData.subtitle.substring(0, 120).trim() + '...' : heroData.subtitle}
            </p>
          )}

          {/* Mobile-only Image */}
          <div className="md:hidden w-full max-h-48 bg-matcha-bg border-4 border-black p-3 mb-6 flex items-center justify-center relative overflow-hidden shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
             <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none"></div>
             <img
              alt={heroData.title}
              className="relative z-10 h-32 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform"
              src={heroData.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
            {(heroData.cta_text && heroData.cta_link) ? (
              <Link to={heroData.cta_link} className="bg-matcha-bg text-black px-6 py-3 sm:px-10 sm:py-4.5 font-black uppercase tracking-widest text-sm sm:text-base border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center gap-2 sm:gap-3 group w-fit">
                {heroData.cta_text}
                <span className="material-symbols-outlined text-lg sm:text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            ) : heroData.product_id ? (
              <Link to={`/product/${heroData.product_id}`} className="bg-matcha-bg text-black px-6 py-3 sm:px-10 sm:py-4.5 font-black uppercase tracking-widest text-sm sm:text-base border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center gap-2 sm:gap-3 group w-fit">
                View Product
                <span className="material-symbols-outlined text-lg sm:text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:col-span-5 bg-matcha-bg relative p-8 lg:p-12 items-center justify-center min-h-[300px] md:min-h-0 filter grayscale hover:grayscale-0 transition-all duration-750 group">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
        {/* Subtle frame behind image */}
        <div className="absolute w-72 h-72 border-4 border-black bg-pure-white shadow-brutal -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
        <img
          alt={heroData.title}
          className="relative z-10 w-full max-w-[220px] md:max-w-xs object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] group-hover:-translate-y-3 group-hover:scale-105 transition-all duration-500"
          src={heroData.image_url || "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60"}
          fetchPriority="high"
          loading="eager"
        />
      </div>
    </section>
  )
}
