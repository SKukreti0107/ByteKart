import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, actionLabel = 'Quick Add', onAction }) {
    const { addToCart } = useCart()

    const handleAction = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (onAction) {
            onAction(product)
        } else {
            // Default Quick Add behavior
            addToCart(product, null, {}, 1)
        }
    }

    return (
        <div className="product-card flex flex-row sm:flex-col rounded-squish p-3 sm:p-4 shadow-md gap-3 sm:gap-0 items-center sm:items-stretch">
            <Link to={`/product/${product.id}`} className="group relative shrink-0 h-28 w-28 sm:h-auto sm:w-full sm:mb-4 aspect-square overflow-hidden rounded-2xl bg-off-white block">
                <img
                    src={product.image_url || product.image || 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=60'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.tags?.length ? (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tags.map((tag) => (
                            <span
                                key={`${product.name}-${tag}`}
                                className="rounded-md bg-charcoal-dark px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
            </Link>
            <div className="flex flex-1 flex-col sm:px-1 h-full sm:h-auto justify-between sm:justify-start py-1 sm:py-0 w-full">
                <div>
                    <Link to={`/product/${product.id}`} className="block">
                        <h3 className="mb-1 text-base sm:text-xl line-clamp-2 sm:line-clamp-none font-bold text-charcoal-dark hover:text-matcha-deep transition-colors">{product.name}</h3>
                    </Link>
                    <div className="mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-lg sm:text-2xl font-bold text-matcha-deep">{product.price}</span>
                        {product.oldPrice ? (
                            <span className="text-xs sm:text-sm font-medium text-red-500 line-through">{product.oldPrice}</span>
                        ) : null}
                    </div>
                </div>
                <button
                    onClick={handleAction}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-baby-green/50 bg-off-white py-2 sm:py-3 font-bold text-charcoal-dark transition-all hover:bg-baby-green mt-auto sm:mt-0"
                >
                    <span className="material-symbols-outlined text-base sm:text-lg">add_shopping_cart</span>
                    <span className="text-sm sm:text-base">{actionLabel}</span>
                </button>
            </div>
        </div>
    )
}
