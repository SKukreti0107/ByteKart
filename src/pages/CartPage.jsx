import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'

export default function CartPage() {
    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()

    return (
        <StorefrontLayout>
            <div className="mx-auto w-full max-w-4xl py-10 md:py-16">
                <div className="mb-10 flex items-end justify-between border-b border-charcoal-dark/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-charcoal-dark md:text-5xl">Shopping Cart</h1>
                        <p className="mt-2 text-sm font-bold tracking-widest text-charcoal-dark/60 uppercase">
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                        </p>
                    </div>
                    <Link
                        to="/catalog"
                        className="hidden text-sm font-bold text-matcha-deep transition-colors hover:text-charcoal-dark sm:block hover:underline"
                    >
                        Continue Shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-off-white text-charcoal-dark/20 text-6xl">
                            <span className="material-symbols-outlined text-inherit">shopping_cart</span>
                        </div>
                        <h2 className="text-2xl font-black text-charcoal-dark">Your cart is empty.</h2>
                        <p className="mt-2 mb-8 text-charcoal-dark/60 font-medium max-w-md">
                            Looks like you haven't added any gear to your cart yet. Explore our catalog to find the best gaming components.
                        </p>
                        <Link
                            to="/catalog"
                            className="btn-glow-dark inline-block rounded-2xl bg-matcha-deep px-8 py-4 font-bold text-white transition-all hover:bg-charcoal-dark"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.cartItemId} className="flex flex-col gap-6 p-6 bg-white rounded-3xl border border-baby-green/20 shadow-sm relative group transition-all hover:border-baby-green hover:shadow-md sm:flex-row">
                                    <div className="h-32 w-32 shrink-0 bg-off-white rounded-2xl overflow-hidden self-center sm:self-start">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-charcoal-dark/20 text-xs font-bold uppercase tracking-widest">No Image</div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="pr-8 text-center sm:text-left">
                                            <h3 className="font-bold text-xl leading-tight text-charcoal-dark">{item.name}</h3>
                                            {Object.keys(item.variants).length > 0 && (
                                                <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                                                    {Object.entries(item.variants).map(([k, v]) => (
                                                        <span key={k} className="rounded-md bg-off-white px-2 py-1 text-xs font-bold text-charcoal-dark/70 uppercase tracking-wider">
                                                            {k}: {v}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-charcoal-dark/5 pt-4 sm:flex-row sm:border-none sm:pt-0 sm:mt-4">
                                            <div className="flex items-center rounded-full border-2 border-off-white bg-white px-2 py-1 shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                    className="h-8 w-8 rounded-full flex items-center justify-center text-charcoal-dark transition-colors hover:bg-baby-green hover:text-matcha-deep text-xl font-bold"
                                                >-</button>
                                                <span className="w-10 text-center text-base font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                    className="h-8 w-8 rounded-full flex items-center justify-center text-charcoal-dark transition-colors hover:bg-baby-green hover:text-matcha-deep text-xl font-bold"
                                                >+</button>
                                            </div>

                                            <div className="flex items-end gap-2 text-right">
                                                {item.mrp > item.price && (
                                                    <span className="text-sm font-bold text-red-500 line-through mb-1">₹{item.mrp * item.quantity}</span>
                                                )}
                                                <span className="font-black text-matcha-deep text-2xl">₹{item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.cartItemId)}
                                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-off-white text-charcoal-dark/40 transition-all hover:bg-red-50 hover:text-red-500"
                                        title="Remove item"
                                    >
                                        <span className="material-symbols-outlined text-[1.2rem]">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-xl">
                                <h3 className="mb-6 text-xl font-black text-charcoal-dark">Order Summary</h3>

                                <div className="space-y-4 border-b border-charcoal-dark/10 pb-6 text-sm font-bold">
                                    <div className="flex justify-between text-charcoal-dark/70">
                                        <span>Subtotal</span>
                                        <span className="text-charcoal-dark">₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-charcoal-dark/70">
                                        <span>Shipping</span>
                                        <span className="text-matcha-deep">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-end justify-between">
                                    <span className="text-base font-bold uppercase tracking-widest text-charcoal-dark/50">Total</span>
                                    <span className="text-4xl font-black text-matcha-deep">₹{cartTotal}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="btn-glow-dark mt-8 flex w-full items-center justify-center rounded-2xl bg-charcoal-dark py-4 text-lg font-bold text-white transition-all hover:bg-matcha-deep group"
                                >
                                    Proceed to Checkout
                                    <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-charcoal-dark/40 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[1rem]">lock</span>
                                    Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    )
}
