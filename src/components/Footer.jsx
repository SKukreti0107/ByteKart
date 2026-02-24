export default function Footer() {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-12 px-6 lg:px-12 border-t-4 border-pure-black relative overflow-hidden mt-20 w-full">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-16 mb-20 w-full">
                <div className="max-w-sm">
                    <img src="/final_logo.png" alt="ByteKart Logo" className="h-52 w-auto object-contain" />
                    <p className="text-sm font-bold uppercase tracking-wide border-l-4 border-matcha-bg pl-4 leading-relaxed text-gray-400">
                        The premier destination for botanical gaming aesthetics and high-performance hardware.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 w-full lg:w-auto">
                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-white">Inventory</h5>
                        <ul className="text-xs space-y-4 font-bold uppercase tracking-widest text-gray-400">
                            <li><a className="hover:text-matcha-bg transition-colors" href="#">Latest CPUs</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="#">Gaming Consoles</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">Physical Media</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">Limited Bundles</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-white">Community</h5>
                        <ul className="text-xs space-y-4 font-bold uppercase tracking-widest text-gray-400">
                            <li><a className="hover:text-matcha-bg transition-colors" href="#">Review Board</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="#">Build Guides</a></li>
                            <li><a className="hover:text-matcha-bg transition-colors" href="#">Matcha Meetups</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6 col-span-2">
                        <h5 className="text-xs font-black uppercase tracking-widest text-white">Join the Hub</h5>
                        <div className="flex items-center gap-0">
                            <input className="h-12 bg-[#2A2A2A] border-4 border-[#2A2A2A] border-r-0 rounded-none px-6 text-sm text-white placeholder-gray-500 focus:ring-0 focus:border-matcha-bg w-full min-w-[200px] outline-none" placeholder="your@email.com" type="email" />
                            <button className="h-12 w-12 bg-matcha-bg border-4 border-matcha-bg rounded-none flex items-center justify-center hover:bg-white transition-colors group outline-none">
                                <span className="material-symbols-outlined text-black group-hover:text-black">mail</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-center items-center pt-8 border-t-2 border-white/10 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">© 2024 BYTEKART. All parts sourced sustainably. Built with Matcha Love.</p>
            </div>
        </footer>
    )
}
