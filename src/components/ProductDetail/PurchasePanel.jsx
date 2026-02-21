export default function PurchasePanel({ product, quantity, setQuantity }) {
  return (
    <section className="window-container border-none p-4 sm:p-6 flex flex-col justify-between">
      <div>
        <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Product Detail</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-matcha-deep/80">
          {product.item_status || 'New'}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <p className="text-3xl font-bold text-matcha-deep sm:text-4xl">${product.price}</p>
          <span className="rounded-full bg-baby-green px-3 py-1 text-xs font-bold uppercase tracking-wider">{product.stock_status || 'In Stock'}</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="text-sm font-bold uppercase tracking-wider text-matcha-deep">Quantity</p>
        <div className="flex items-center rounded-xl bg-off-white p-1">
          <button type="button" className="px-3 py-1 text-xl font-bold" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
          <span className="w-10 text-center text-lg font-bold">{quantity}</span>
          <button type="button" className="px-3 py-1 text-xl font-bold" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="btn-glow-dark rounded-xl bg-matcha-deep px-6 py-3 font-bold text-white">Add to Cart</button>
        <button className="rounded-xl bg-off-white px-6 py-3 font-bold">Buy Now</button>
      </div>
    </section>
  )
}
