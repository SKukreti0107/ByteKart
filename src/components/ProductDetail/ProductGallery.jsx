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
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[540px] sm:w-24 flex-shrink-0">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex-shrink-0 w-20 h-20 sm:w-full sm:h-20 border-4 p-1 transition-all overflow-hidden ${selected === idx
                ? 'border-black shadow-brutal-sm'
                : 'border-black/20 hover:border-black/60'
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
      <div className="flex-1 bg-white border-4 border-black shadow-brutal flex items-center justify-center p-8 sm:p-12 relative min-h-[360px]">
        {/* Image counter badge */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            {selected + 1} / {displayImages.length}
          </div>
        )}

        {/* Prev / Next arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() => setSelected(i => (i - 1 + displayImages.length) % displayImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-brutal-sm"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => setSelected(i => (i + 1) % displayImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-brutal-sm"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </>
        )}

        <img
          key={selected}
          src={displayImages[selected]}
          alt="Product"
          className="max-h-[440px] w-auto object-contain mix-blend-multiply transition-all duration-300 hover:scale-105"
          onError={(e) => { e.target.src = FALLBACK }}
        />
      </div>
    </div>
  )
}
