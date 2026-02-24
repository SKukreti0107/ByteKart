import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'

export default function CartPage() {
    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()

    return (
        <StorefrontLayout>
            <main className="w-full px-6 lg:px-12 py-10 md:py-16 mb-20 mt-8">
                <div className="mb-12 flex items-end justify-between border-b-4 border-black pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-black uppercase" style={{ textShadow: '3px 3px 0px #C6DCBA' }}>Cart</h1>
                        <p className="mt-2 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                        </p>
                    </div>
                    <Link
                        to="/catalog"
                        className="hidden sm:block text-base md:text-lg font-bold border-b-4 border-black hover:bg-black hover:text-white px-2 transition-all w-fit"
                    >
                        Continue Shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white border-4 border-black shadow-brutal p-12 md:p-20 text-center">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center bg-matcha-bg border-4 border-black text-black">
                            <span className="material-symbols-outlined text-5xl">shopping_cart</span>
                        </div>
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">Your cart is empty.</h2>
                        <p className="text-black font-bold max-w-md mb-8">
                            Looks like you haven't added any gear to your cart yet. Explore our catalog to find the best gaming components.
                        </p>
                        <Link
                            to="/catalog"
                            className="bg-matcha-bg text-black px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-base md:text-lg border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center w-fit"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-8 space-y-8 md:space-y-10 border-l-4 border-l-transparent">
                            {cartItems.map((item) => (
                                <div key={item.cartItemId} className="bg-white border-4 border-black p-4 flex flex-col xl:flex-row gap-6 shadow-brutal relative items-center group transition-all">
                                    <div className="w-full xl:w-32 aspect-square border-4 border-black bg-[#f9f9f9] flex items-center justify-center p-2 flex-shrink-0">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-charcoal/20 text-xs font-bold uppercase tracking-widest">No Image</div>
                                        )}
                                    </div>

                                    <div className="flex-grow flex flex-col md:flex-row gap-6 justify-between w-full">
                                        <div className="flex-1 pr-0 md:pr-4 text-center md:text-left flex flex-col justify-center">
                                            <Link to={`/product/${item.product_id}`} className="block">
                                                <h4 className="text-lg md:text-xl font-black uppercase tracking-tight text-black line-clamp-2 hover:text-matcha-dark transition-colors">{item.name}</h4>
                                            </Link>

                                            {Object.keys(item.variants).length > 0 && (
                                                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                                                    {Object.entries(item.variants).map(([k, v]) => (
                                                        <span key={k} className="bg-black text-white text-[10px] sm:text-xs font-black px-2 py-1 uppercase tracking-wider border-2 border-black">
                                                            {k}: {v}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-between xl:justify-end gap-6 w-full xl:w-auto">
                                            <div className="flex items-center border-4 border-black w-fit bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white hover:bg-matcha-bg transition-colors font-black text-xl border-r-4 border-black"
                                                >-</button>
                                                <span className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center font-black text-lg bg-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                    disabled={item.quantity >= Math.min(item.maxStock || 5, 5)}
                                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white hover:bg-matcha-bg transition-colors font-black text-xl border-l-4 border-black disabled:opacity-50 disabled:hover:bg-white"
                                                >+</button>
                                            </div>

                                            <div className="flex flex-col items-center sm:items-end justify-center min-w-[100px]">
                                                {item.mrp > item.price && (
                                                    <p className="text-sm font-bold text-gray-500 line-through font-mono mb-1">₹{item.mrp * item.quantity}</p>
                                                )}
                                                <p className="text-2xl md:text-3xl font-black text-black">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.cartItemId)}
                                        className="absolute -top-4 -right-4 w-10 h-10 bg-white border-4 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 block outline-none z-10"
                                        title="Remove item"
                                    >
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-4 border-r-4 border-r-transparent">
                            <div className="bg-matcha-bg border-4 border-black p-6 md:p-8 shadow-brutal lg:sticky lg:top-32">
                                <h3 className="text-2xl font-black uppercase tracking-widest text-black mb-8 pb-4 border-b-4 border-black">Summary</h3>

                                <div className="space-y-4 mb-8 text-base md:text-lg font-bold">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm uppercase tracking-wider text-black/70">Subtotal</span>
                                        <span className="font-black text-black">₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm uppercase tracking-wider text-black/70">Shipping</span>
                                        <span className="text-sm font-black text-black text-right">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t-4 border-black mb-8 flex justify-between items-end">
                                    <span className="text-sm uppercase tracking-widest text-black/70 font-black">Total</span>
                                    <span className="text-3xl md:text-4xl font-black text-black leading-none">₹{cartTotal}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full bg-black text-matcha-bg py-4 md:py-5 border-4 border-black font-black uppercase tracking-widest text-base md:text-xl shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 text-center outline-none block"
                                >
                                    Checkout
                                    <span className="material-symbols-outlined hidden sm:block">arrow_forward</span>
                                </Link>

                                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-black text-black/60 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </StorefrontLayout>
    )
}
