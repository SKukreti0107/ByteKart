import ProductCard from '../ProductCard'

export default function ProductGrid({ products }) {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4 px-2">
               
                <div className="h-1 flex-1 bg-charcoal-dark/20 mt-1"></div>
                
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product, index) => (
                    <ProductCard key={`${product.name}-${index}`} product={product} />
                ))}
            </div>
        </section>
    )
}
