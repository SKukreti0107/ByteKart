export default function Footer() {
    return (
        <footer className="mt-32 bg-charcoal-dark text-baby-green pt-20 pb-12 w-full">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <img src="/ByteKart_logo.png" alt="ByteKart Logo" className="h-32 w-auto object-contain" />
                    </div>
                    <p className="text-baby-green/60 text-sm font-medium leading-relaxed">The premier destination for botanical gaming aesthetics and high-performance hardware.</p>
                </div>
                <div>
                    <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-white">Inventory</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><a className="hover:text-white transition-colors" href="#">Latest CPUs</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Gaming Consoles</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Physical Media</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Limited Bundles</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-white">Community</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><a className="hover:text-white transition-colors" href="#">Review Board</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Build Guides</a></li>
                        <li><a className="hover:text-white transition-colors" href="#">Matcha Meetups</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-white">Join the Hub</h4>
                    <div className="flex gap-2">
                        <input className="bg-baby-green/10 border-none rounded-full px-4 py-3 text-sm flex-1 focus:ring-1 focus:ring-baby-green text-white placeholder:text-baby-green/40 outline-none" placeholder="your@email.com" type="email" />
                        <button className="bg-baby-green p-3 rounded-full text-charcoal-dark hover:scale-105 transition-transform btn-glow">
                            <span className="material-symbols-outlined">mail</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-8 border-t border-baby-green/10 text-center">
                <p className="text-[10px] font-black text-baby-green/30 uppercase tracking-[0.4em]">© 2024 ByteKart. All Parts Sourced Sustainably. Built with Matcha Love.</p>
            </div>
        </footer>
    )
}
