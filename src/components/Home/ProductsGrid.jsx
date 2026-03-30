import ProductCard from '../ProductCard'

export default function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {products.map((product, index) => (
                <ProductCard key={`${product.name}-${index}`} product={product} />
            ))}
        </div>
    )
}
