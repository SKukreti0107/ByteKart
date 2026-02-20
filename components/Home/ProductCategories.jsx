export default function ProductCategories({categories}) {
    return (
        <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((category) => (
                <div
                    key={category.title}
                    className="window-container group cursor-pointer border-0 p-6 text-center transition-colors hover:bg-[var(--baby-green)]"
                >
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--off-white)] shadow-sm transition-colors group-hover:bg-white">
                        <span className="material-symbols-outlined text-4xl text-[var(--matcha-deep)]">
                            {category.icon}
                        </span>
                    </div>
                    <span className="text-lg font-bold text-[var(--charcoal-dark)]">{category.title}</span>
                </div>
            ))}
        </section>
    )
}