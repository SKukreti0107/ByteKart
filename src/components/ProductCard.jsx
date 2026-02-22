import { Link } from 'react-router-dom'

export default function ProductCard({ product, actionLabel = 'Quick Add', onAction }) {
    return (
        <div className="product-card flex flex-col rounded-squish p-4 shadow-md">
            <Link to={`/product/${product.id}`} className="group relative mb-4 aspect-square overflow-hidden rounded-2xl bg-off-white block">
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
            <div className="flex-1 px-1">
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="mb-1 text-xl font-bold text-charcoal-dark hover:text-matcha-deep transition-colors">{product.name}</h3>
                </Link>
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl font-bold text-matcha-deep">{product.price}</span>
                    {product.oldPrice ? (
                        <span className="text-sm font-medium text-red-500 line-through">{product.oldPrice}</span>
                    ) : null}
                </div>
            </div>
            <button
                onClick={() => onAction?.(product)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-baby-green/50 bg-off-white py-3 font-bold text-charcoal-dark transition-all hover:bg-baby-green"
            >
                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                {actionLabel}
            </button>
        </div>
    )
}
