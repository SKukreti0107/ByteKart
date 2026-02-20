export default function Footer() {
    return (
        <footer className="mt-8 mb-10 w-full">
            <div className="window-container border-none bg-white p-12 shadow-xl lg:p-16">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="btn-glow rounded-xl bg-[var(--baby-green)] p-2 text-[var(--matcha-deep)]">
                                <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-[var(--charcoal-dark)]">Matcha Gear</h1>
                        </div>
                        <p className="text-sm leading-relaxed font-medium text-[color:var(--charcoal-dark)]/60">
                            Redefining the relationship between technology and environment. Premium electronics with a soft, organic aesthetic.
                        </p>
                        <div className="flex gap-4">
                            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--off-white)] transition-all hover:bg-[var(--baby-green)] hover:text-[var(--matcha-deep)]" href="#">
                                <span className="material-symbols-outlined text-xl">public</span>
                            </a>
                            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--off-white)] transition-all hover:bg-[var(--baby-green)] hover:text-[var(--matcha-deep)]" href="#">
                                <span className="material-symbols-outlined text-xl">camera</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-bold tracking-widest text-[var(--charcoal-dark)] uppercase">Store Categories</h4>
                        <ul className="space-y-4 text-sm font-medium text-[color:var(--charcoal-dark)]/60">
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">All Electronics</a></li>
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">Custom Keyboards</a></li>
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">PC Components</a></li>
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">Baby Green Accents</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-bold tracking-widest text-[var(--charcoal-dark)] uppercase">Client Service</h4>
                        <ul className="space-y-4 text-sm font-medium text-[color:var(--charcoal-dark)]/60">
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">Order Status</a></li>
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">Shipping &amp; Returns</a></li>
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">Life-time Warranty</a></li>
                            <li><a className="transition-colors hover:text-[var(--matcha-deep)]" href="#">Support Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-bold tracking-widest text-[var(--charcoal-dark)] uppercase">Connect</h4>
                        <p className="mb-4 text-sm leading-relaxed font-medium text-[color:var(--charcoal-dark)]/60">Visit our flagship boutique in the Tokyo Tech District.</p>
                        <a className="mb-2 block text-lg font-bold text-[var(--matcha-deep)] hover:underline" href="mailto:hello@matchagear.com">hello@matchagear.com</a>
                        <p className="text-xs font-bold text-[color:var(--charcoal-dark)]/40">1-2-3 Tech-Matcha, Shibuya</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-10 text-[10px] font-bold tracking-[0.2em] text-[color:var(--charcoal-dark)]/40 uppercase sm:flex-row">
                    <p>© 2024 MATCHA GEAR CO. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-[var(--matcha-deep)]" href="#">Terms</a>
                        <a className="hover:text-[var(--matcha-deep)]" href="#">Privacy</a>
                        <a className="hover:text-[var(--matcha-deep)]" href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}