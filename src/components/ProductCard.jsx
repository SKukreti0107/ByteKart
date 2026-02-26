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
        <div className={`bg-pure-white border-4 border-pure-black p-6 shadow-brutal flex flex-col group hover:-translate-y-2 transition-transform duration-300 ${isOutOfStock ? 'opacity-75' : ''} h-full`}>
            <Link to={`/product/${product.id}`} className={`block aspect-square mb-6 border-4 ${isOutOfStock ? 'border-gray-100 bg-gray-50 grayscale' : 'border-black bg-[#f9f9f9]'} relative overflow-hidden flex items-center justify-center p-4 shrink-0 ${isOutOfStock ? 'pointer-events-none' : ''}`}>
                <img
                    src={product.image_url || product.image || 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60'}
                    alt={product.name}
                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />

                {product.tags?.length ? (
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 w-3/4 pointer-events-none">
                        {product.tags.map((tag) => (
                            <span
                                key={`${product.name}-${tag}`}
                                className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider border-2 border-black truncate block w-fit max-w-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}

                {discountPercentage > 0 && !isOutOfStock && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-tighter border-2 border-black z-10 transform rotate-2">
                        {discountPercentage}% OFF
                    </span>
                )}
            </Link>

            <div className="flex flex-col flex-grow justify-between">
                <div>
                    <Link to={`/product/${product.id}`} className="block">
                        <h4 className="text-lg sm:text-xl font-black uppercase mb-2 leading-tight min-h-[3rem] hover:text-matcha-dark transition-colors line-clamp-2">{product.name}</h4>
                    </Link>

                    <div className="flex items-baseline gap-2 mb-6 flex-wrap">
                        <span className={`text-2xl font-black ${isOutOfStock ? 'text-charcoal' : 'text-matcha-dark'}`}>{product.price}</span>
                        {product.oldPrice ? (
                            <span className="text-sm text-gray-400 line-through font-mono decoration-2">{product.oldPrice}</span>
                        ) : null}
                    </div>
                </div>

                <button
                    onClick={handleAction}
                    disabled={isOutOfStock}
                    className={`w-full mt-auto py-3 md:py-4 border-4 font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 
                    ${isAdded
                            ? 'bg-matcha-dark text-white border-black cursor-default translate-x-1 translate-y-1'
                            : isOutOfStock
                                ? 'bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed'
                                : 'bg-[#E8EFE5] text-black border-black hover:bg-black hover:text-matcha-bg shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                        }`}
                >
                    <span className="material-symbols-outlined text-lg">
                        {isAdded ? 'check_circle' : isOutOfStock ? 'block' : 'add_shopping_cart'}
                    </span>
                    <span className="text-sm">
                        {isAdded ? 'Added ✓' : isOutOfStock ? 'Out of Stock' : actionLabel}
                    </span>
                </button>
            </div>
        </div>
    )
}
