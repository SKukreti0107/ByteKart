import ProductCard from '../ProductCard'

export default function ProductGrid({ products }) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-charcoal-dark">
                    <span className="btn-glow rounded-lg bg-baby-green px-3 py-1 text-sm text-matcha-deep">
                        Trending
                    </span>
                    Most Wanted Gear
                </h2>
                <a
                    href="#"
                    className="btn-glow flex items-center gap-2 rounded-full bg-baby-green px-4 py-2 font-bold text-charcoal-dark transition-all hover:text-white"
                >
                    View Catalogue
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product, index) => (
                    <ProductCard key={`${product.name}-${index}`} product={product} />
                ))}
            </div>
        </section>
    )
}
