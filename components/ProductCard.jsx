export default function ProductCard({ product, actionLabel = 'Quick Add', onAction }) {
    return (
        <div className="product-card flex flex-col rounded-[var(--radius-squish)] p-4 shadow-md">
            <div className="group relative mb-4 aspect-square overflow-hidden rounded-2xl bg-[var(--off-white)]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.tags?.length ? (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tags.map((tag) => (
                            <span
                                key={`${product.name}-${tag}`}
                                className="rounded-md bg-[var(--charcoal-dark)] px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="flex-1 px-1">
                <h3 className="mb-1 text-xl font-bold text-[var(--charcoal-dark)]">{product.name}</h3>
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl font-bold text-[var(--matcha-deep)]">{product.price}</span>
                    {product.oldPrice ? (
                        <span className="text-sm font-medium text-[color:var(--charcoal-dark)]/40 line-through">{product.oldPrice}</span>
                    ) : null}
                </div>
            </div>
            <button
                onClick={() => onAction?.(product)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--baby-green)]/50 bg-[var(--off-white)] py-3 font-bold text-[var(--charcoal-dark)] transition-all hover:bg-[var(--baby-green)]"
            >
                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                {actionLabel}
            </button>
        </div>
    )
}