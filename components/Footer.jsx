export default function Footer(){
    return (
        <footer class="w-full mb-10 mt-8">
            <div class="window-container bg-white p-12 lg:p-16 border-none shadow-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="bg-baby-green p-2 rounded-xl text-matcha-deep btn-glow">
                                <span class="material-symbols-outlined text-2xl font-bold">bolt</span>
                            </div>
                            <h1 class="text-2xl font-bold tracking-tight text-charcoal-dark">Matcha Gear</h1>
                        </div>
                        <p class="text-charcoal-dark/60 font-medium leading-relaxed text-sm">
                            Redefining the relationship between technology and environment. Premium electronics with a
                            soft, organic aesthetic.
                        </p>
                        <div class="flex gap-4">
                            <a class="w-10 h-10 rounded-full bg-off-white flex items-center justify-center hover:bg-baby-green hover:text-matcha-deep hover:shadow-neon-glow transition-all"
                                href="#">
                                <span class="material-symbols-outlined text-xl">public</span>
                            </a>
                            <a class="w-10 h-10 rounded-full bg-off-white flex items-center justify-center hover:bg-baby-green hover:text-matcha-deep hover:shadow-neon-glow transition-all"
                                href="#">
                                <span class="material-symbols-outlined text-xl">camera</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold mb-6 text-charcoal-dark uppercase text-xs tracking-widest">Store Categories
                        </h4>
                        <ul class="space-y-4 text-charcoal-dark/60 font-medium text-sm">
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">All Electronics</a></li>
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">Custom Keyboards</a></li>
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">PC Components</a></li>
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">Baby Green Accents</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-6 text-charcoal-dark uppercase text-xs tracking-widest">Client Service
                        </h4>
                        <ul class="space-y-4 text-charcoal-dark/60 font-medium text-sm">
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">Order Status</a></li>
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">Shipping &amp; Returns</a>
                            </li>
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">Life-time Warranty</a></li>
                            <li><a class="hover:text-matcha-deep transition-colors" href="#">Support Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-6 text-charcoal-dark uppercase text-xs tracking-widest">Connect</h4>
                        <p class="text-charcoal-dark/60 mb-4 text-sm font-medium leading-relaxed">Visit our flagship
                            boutique in the Tokyo Tech District.</p>
                        <a class="text-matcha-deep font-bold text-lg hover:underline block mb-2"
                            href="mailto:hello@matchagear.com">hello@matchagear.com</a>
                        <p class="text-charcoal-dark/40 text-xs font-bold">1-2-3 Tech-Matcha, Shibuya</p>
                    </div>
                </div>
                <div
                    class="pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-charcoal-dark/40 uppercase tracking-[0.2em]">
                    <p>© 2024 MATCHA GEAR CO. ALL RIGHTS RESERVED.</p>
                    <div class="flex gap-6">
                        <a class="hover:text-matcha-deep" href="#">Terms</a>
                        <a class="hover:text-matcha-deep" href="#">Privacy</a>
                        <a class="hover:text-matcha-deep" href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}