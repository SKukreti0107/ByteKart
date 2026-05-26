import { useState, useEffect } from 'react'

const FALLBACK = 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60'

export default function ProductGallery({ images = [], selectedIndex }) {
  const displayImages = images.length > 0 ? images : [FALLBACK]
  const [selected, setSelected] = useState(0)

  // Sync with parent-driven index (e.g. variant selection)
  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex !== null && selectedIndex !== selected) {
      setSelected(selectedIndex)
    }
  }, [selectedIndex])
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnail Strip — only shown when there are multiple images */}
      {displayImages.length > 1 && (
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[540px] sm:w-24 flex-shrink-0 hide-scrollbar">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex-shrink-0 w-20 h-20 sm:w-full sm:h-20 border-3 p-1 transition-all overflow-hidden bg-pure-white hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none ${
                selected === idx
                  ? 'border-pure-black shadow-none bg-matcha-bg/25 translate-x-0.5 translate-y-0.5'
                  : 'border-pure-black/35'
              }`}
            >
              <img
                src={img}
                alt={`View ${idx + 1}`}
                className="w-full h-full object-contain mix-blend-multiply"
                onError={(e) => { e.target.src = FALLBACK }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Viewer */}
      <div className="flex-1 bg-[#f4f7f2] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:shadow-brutal flex items-center justify-center p-8 sm:p-12 relative min-h-[360px] overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:12px_12px]"></div>

        {/* Image counter badge */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black text-matcha-bg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-black shadow-brutal-sm z-10">
            {selected + 1} / {displayImages.length}
          </div>
        )}

        {/* Prev / Next arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() => setSelected(i => (i - 1 + displayImages.length) % displayImages.length)}
              className="absolute left-3 top-[calc(50%-18px)] w-9 h-9 bg-pure-white border-3 border-black text-black flex items-center justify-center hover:bg-black hover:text-matcha-bg transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 z-10"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => setSelected(i => (i + 1) % displayImages.length)}
              className="absolute right-3 top-[calc(50%-18px)] w-9 h-9 bg-pure-white border-3 border-black text-black flex items-center justify-center hover:bg-black hover:text-matcha-bg transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 z-10"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </>
        )}

        <img
          key={selected}
          src={displayImages[selected]}
          alt="Product"
          className="max-h-[440px] w-auto object-contain mix-blend-multiply transition-all duration-300 hover:scale-105 relative z-0"
          onError={(e) => { e.target.src = FALLBACK }}
        />
      </div>
    </div>
  )
}
