export default function Footer() {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-12 px-6 lg:px-12 border-t-4 border-pure-black relative overflow-hidden mt-20 w-full">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-16 mb-20 w-full">
                <div className="max-w-sm">
                    <img src="/final_logo.png" alt="ByteKart Logo" className="h-52 w-auto object-contain" />
                    <p className="text-sm font-bold uppercase tracking-wide border-l-4 border-matcha-bg pl-4 leading-relaxed text-gray-400">
                        ByteKart is a Marketplace Facilitator delivering genuine tech parts at the best deals, directly from trusted suppliers to your doorstep.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 w-full lg:w-auto">
                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-white">Quick Links</h5>
                        <ul className="text-xs space-y-4 font-bold uppercase tracking-widest text-gray-400">
                            <li><a className="hover:text-matcha-bg transition-colors" href="/catalog">All Products</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="/about">About Our Story</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="/orders">Track Order</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-white">Support</h5>
                        <ul className="text-xs space-y-4 font-bold uppercase tracking-widest text-gray-400">
                            <li><a className="hover:text-matcha-bg transition-colors" href="/faq">FAQs</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="/terms">Terms & Conditions</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="/refund-policy">Refund & Cancellation</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="/shipping-policy">Shipping & Delivery</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-center items-center pt-8 border-t-2 border-white/10 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 text-center">
                    © 2026 BYTEKART — MARKETPLACE FACILITATOR — GREATER NOIDA, INDIA. GENUINE TECH FOR STUDENTS.
                </p>
            </div>
        </footer>
    )
}
