import './PremiumLoader.css'

export default function PremiumLoader({ message = "Assembling your bytes..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 w-full">
      {/* Premium Brutalist Keycaps Row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="premium-key key-1">B</div>
        <div className="premium-key key-2">K</div>
        <div className="premium-key key-3">
          <span className="material-symbols-outlined text-lg sm:text-xl">shopping_cart</span>
        </div>
      </div>
      
      {/* Loading message */}
      <p className="text-xs sm:text-sm font-display font-black uppercase tracking-widest text-[#4A5D44] animate-pulse">
        {message}
      </p>
    </div>
  )
}
