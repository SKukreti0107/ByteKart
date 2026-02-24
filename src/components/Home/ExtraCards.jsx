export default function ExtraCards() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-pure-black">
            <div className="bg-matcha-bg p-8 md:p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 border-pure-black flex flex-col justify-center">
                <div className="bg-white border-4 border-black p-8 md:p-10 shadow-brutal mb-12 transform -rotate-1">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-charcoal mb-6 uppercase tracking-tight leading-[0.9]">
                        System<br />Inquiry
                    </h3>
                    <p className="text-charcoal text-lg md:text-xl font-bold leading-relaxed">
                        Need a custom build? We replace organic guesswork with mathematical certainty.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-8 hover:*:shadow-none hover:*:translate-x-1 hover:*:translate-y-1">
                    <div className="bg-pure-black p-4 md:p-6 text-pure-white sharp-panel aspect-square flex flex-col justify-between border-4 border-transparent hover:border-white shadow-brutal transition-all cursor-pointer">
                        <span className="text-3xl md:text-4xl font-black opacity-30">01</span>
                        <div>
                            <span className="block text-xs uppercase tracking-widest mb-1 text-matcha-bg">Builds</span>
                            <span className="block text-xl md:text-2xl font-black font-display uppercase">Custom</span>
                        </div>
                    </div>
                    <div className="bg-pure-white p-4 md:p-6 text-charcoal border-4 border-charcoal sharp-panel aspect-square flex flex-col justify-between shadow-brutal transition-all cursor-pointer">
                        <span className="text-3xl md:text-4xl font-black opacity-20">02</span>
                        <div>
                            <span className="block text-xs uppercase tracking-widest mb-1">Support</span>
                            <span className="block text-xl md:text-2xl font-black font-display uppercase">24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-pure-white p-8 md:p-12 lg:p-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000_2px,transparent_0)] [background-size:20px_20px] opacity-10"></div>

                <div className="w-full bg-pure-white border-4 border-charcoal shadow-brutal p-6 md:p-8 lg:p-12 relative z-10 hover:-rotate-1 transition-transform">
                    <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Request submitted."); }}>
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black text-white px-2 py-1 inline-block">Project ID</label>
                            <input className="w-full bg-white px-4 py-3 md:py-4 text-charcoal font-bold text-base md:text-lg focus:ring-0 focus:bg-matcha-bg/20 placeholder:text-black/20 outline-none" placeholder="ID_000" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black text-white px-2 py-1 inline-block">Contact</label>
                            <input className="w-full bg-white px-4 py-3 md:py-4 text-charcoal font-bold text-base md:text-lg focus:ring-0 focus:bg-matcha-bg/20 placeholder:text-black/20 outline-none" placeholder="USER@DOMAIN.COM" type="email" />
                        </div>
                        <button className="w-full bg-pure-black text-pure-white py-4 md:py-6 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all shadow-brutal border-4 border-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 block outline-none" type="submit">
                            Initialize Request
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
