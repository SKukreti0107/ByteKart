import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, actionLabel = 'Quick Add', onAction }) {
    const { addToCart } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const num = parseFloat(String(priceStr).replace(/[^0-9.]/g, ''));
        return isNaN(num) ? 0 : num;
    };

    const currentPriceNum = parsePrice(product.price);
    const oldPriceNum = parsePrice(product.oldPrice);
    let discountPercentage = 0;
    if (oldPriceNum > 0 && currentPriceNum > 0 && oldPriceNum > currentPriceNum) {
        discountPercentage = Math.round(((oldPriceNum - currentPriceNum) / oldPriceNum) * 100);
    }

    const isOutOfStock = product.stock_status === 'out-of-stock' || product.stock === 0;

    const handleAction = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isOutOfStock || isAdded) return;

        if (onAction) {
            onAction(product)
        } else {
            // Default Quick Add behavior
            addToCart(product, null, {}, 1)
        }

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 1500)
    }

    return (
        <div className={`bg-pure-white border-4 border-pure-black shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] flex flex-col group hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${isOutOfStock ? 'opacity-75' : ''} h-full overflow-hidden relative`}>
            
            {/* Top Color-Blocked Image Container */}
            <Link 
                to={`/product/${product.id}`} 
                className={`block aspect-square w-full border-b-4 border-pure-black relative overflow-hidden flex items-center justify-center p-4 sm:p-6 shrink-0 transition-colors duration-300 ${
                    isOutOfStock ? 'bg-gray-100 grayscale' : 'bg-[#f4f7f2] group-hover:bg-[#ebf1e8]'
                } ${isOutOfStock ? 'pointer-events-none' : ''}`}
            >
                {/* Subtle Grid Accent */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]"></div>
                
                <img
                    src={product.image_url || product.image || 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60'}
                    alt={product.name}
                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-[1.08] group-hover:rotate-2 transition-all duration-500"
                />

                {/* Left Tag Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 w-3/4 pointer-events-none">
                    {product.tags?.length ? product.tags.map((tag) => (
                        <span
                            key={`${product.name}-${tag}`}
                            className="bg-pure-black text-matcha-bg text-[7px] sm:text-[9px] font-black px-2 py-0.5 sm:py-1 uppercase tracking-wider border sm:border-2 border-black w-fit max-w-full shadow-brutal-sm"
                        >
                            {tag}
                        </span>
                    )) : null}
                </div>

                {/* Right Discount Badge */}
                {discountPercentage > 0 && !isOutOfStock && (
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[8px] sm:text-[10px] font-black px-2 py-1 uppercase tracking-tighter border-2 border-black z-10 transform rotate-3 shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
                        {discountPercentage}% OFF
                    </span>
                )}
            </Link>

            {/* Bottom Content Container */}
            <div className="flex flex-col flex-grow p-3 sm:p-5 justify-between bg-pure-white">
                <div>
                    <Link to={`/product/${product.id}`} className="block">
                        <h4 className="text-sm sm:text-lg font-display font-black uppercase mb-2 leading-tight min-h-[2.5rem] sm:min-h-[3rem] hover:text-matcha-dark transition-colors line-clamp-2 tracking-tight text-pure-black">{product.name}</h4>
                    </Link>

                    <div className="flex items-baseline gap-1.5 sm:gap-2 mb-4 flex-wrap">
                        <span className={`text-base sm:text-xl font-black ${isOutOfStock ? 'text-charcoal' : 'text-matcha-dark'}`}>{product.price}</span>
                        {product.oldPrice ? (
                            <span className="text-[9px] sm:text-xs text-gray-400 line-through font-mono">{product.oldPrice}</span>
                        ) : null}
                    </div>
                </div>

                <button
                    onClick={handleAction}
                    disabled={isOutOfStock}
                    className={`w-full mt-auto py-2.5 sm:py-3.5 border-2 sm:border-3 border-pure-black font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 
                    ${isAdded
                            ? 'bg-matcha-dark text-white border-black cursor-default translate-x-0.5 translate-y-0.5 shadow-none'
                            : isOutOfStock
                                ? 'bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-matcha-bg text-pure-black hover:bg-pure-black hover:text-matcha-bg shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 sm:hover:translate-x-0.75 sm:hover:translate-y-0.75'
                        }`}
                >
                    <span className="material-symbols-outlined text-sm sm:text-base group-hover:translate-y-[-1px] transition-transform">
                        {isAdded ? 'check_circle' : isOutOfStock ? 'block' : 'add_shopping_cart'}
                    </span>
                    <span className="text-[9px] sm:text-xs">
                        {isAdded ? 'Added ✓' : isOutOfStock ? 'Out of Stock' : actionLabel}
                    </span>
                </button>
            </div>
        </div>
    )
}
