import { Link } from 'react-router-dom'

export default function ProductCategories({ categories }) {
    return (
        <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((category) => (
                <Link
                    key={category.title}
                    to={`/catalog?category=${encodeURIComponent(category.title)}`}
                    className="window-container group cursor-pointer border-0 p-6 text-center transition-colors hover:bg-baby-green block"
                >
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-off-white shadow-sm transition-colors group-hover:bg-white">
                        <span className="material-symbols-outlined text-4xl text-matcha-deep">
                            {category.icon}
                        </span>
                    </div>
                    <span className="text-lg font-bold text-charcoal-dark">{category.title}</span>
                </Link>
            ))}
        </section>
    )
}
