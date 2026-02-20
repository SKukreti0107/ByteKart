export default function PurchasePanel({ quantity, setQuantity, selectedColor, setSelectedColor }) {
  const colors = ['Matcha Green', 'Charcoal Black', 'Cloud White']

  return (
    <section className="window-container border-none p-4 sm:p-6">
      <p className="text-xs font-bold tracking-widest text-[var(--matcha-deep)] uppercase">Product Detail</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Matcha Pro GPU 5080</h1>
      <p className="mt-2 text-sm font-medium text-[color:var(--charcoal-dark)]/70">
        Premium thermal design, whisper-quiet cooling, and tuned performance profiles for creative and gaming workloads.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-3xl font-bold text-[var(--matcha-deep)] sm:text-4xl">$899</p>
        <span className="rounded-full bg-[var(--baby-green)] px-3 py-1 text-xs font-bold">In Stock</span>
      </div>

      <div className="mt-7">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[var(--matcha-deep)]">Colorway</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedColor === color
                  ? 'bg-[var(--matcha-deep)] text-white'
                  : 'bg-[var(--off-white)] text-[var(--charcoal-dark)] hover:bg-[var(--baby-green)]'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--matcha-deep)]">Quantity</p>
        <div className="flex items-center rounded-xl bg-[var(--off-white)] p-1">
          <button type="button" className="px-3 py-1 text-xl font-bold" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
          <span className="w-10 text-center text-lg font-bold">{quantity}</span>
          <button type="button" className="px-3 py-1 text-xl font-bold" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="btn-glow-dark rounded-xl bg-[var(--matcha-deep)] px-6 py-3 font-bold text-white">Add to Cart</button>
        <button className="rounded-xl bg-[var(--off-white)] px-6 py-3 font-bold">Buy Now</button>
      </div>
    </section>
  )
}
