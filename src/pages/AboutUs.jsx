import StorefrontLayout from '../components/StorefrontLayout'

export default function AboutUs() {
    return (
        <StorefrontLayout>
            <main className="w-full">
                {/* Hero Header */}
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        About Us
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        We're ByteKart — students who believe genuine tech shouldn't be a gamble.
                    </p>
                </section>

                {/* Mission Statement */}
                <section className="px-6 lg:px-12 py-20 bg-matcha-bg border-b-4 border-pure-black">
                    <div className="max-w-4xl mx-auto">
                        <div className="border-4 border-black bg-white p-8 md:p-12 shadow-brutal">
                            <div className="bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block mb-6">
                                Our_Mission
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                                Democratizing<br />
                                <span className="text-matcha-dark">Quality Tech</span>
                            </h2>
                            <p className="text-base md:text-lg font-bold leading-relaxed text-black/80 max-w-3xl">
                                ByteKart was founded by college students tired of sketchy social media ads. We interact directly with trusted suppliers to ensure you get the best deals and guaranteed delivery right from the supplier to your doorstep. We also provide easy returns.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="px-6 lg:px-12 py-20 bg-pure-black text-white border-b-4 border-pure-black">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-12 text-center">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-all group">
                            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">verified</span>
                            <h3 className="text-xl font-black uppercase tracking-widest mb-4">Authenticity</h3>
                            <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-black/60 leading-relaxed">
                                Every product is 100% genuine with manufacturer warranty. No refurbs disguised as new, no grey market imports. Period.
                            </p>
                        </div>

                        <div className="border-4 border-white p-8 hover:bg-matcha-bg hover:text-black transition-all group">
                            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">payments</span>
                            <h3 className="text-xl font-black uppercase tracking-widest mb-4">Fair Pricing</h3>
                            <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-black/60 leading-relaxed">
                                We try our utmost to fetch the best possible deal for our customers, beating the prices of other platforms .
                            </p>
                        </div>

                        <div className="border-4 border-white p-8 bg-matcha-bg text-black hover:bg-white transition-all group">
                            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">rocket_launch</span>
                            <h3 className="text-xl font-black uppercase tracking-widest mb-4">Speed</h3>
                            <p className="text-sm font-bold uppercase tracking-wider text-black/60 leading-relaxed">
                                From click to doorstep, we optimize every step. Most orders ship within 24 hours across India.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Story */}
                <section className="px-6 lg:px-12 py-20 bg-white border-b-4 border-pure-black">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block mb-6">
                                Origin_Story
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
                                Built by Students,<br />
                                <span className="text-matcha-dark">For the Community</span>
                            </h2>
                            <p className="text-sm font-bold leading-relaxed text-black/70 mb-4">
                                During our college years, we strived to get the best possible deals for tech parts. Instagram ads promised cheap prices, but they always seemed sketchy and unreliable.
                            </p>
                            <p className="text-sm font-bold leading-relaxed text-black/70">
                                We decided to change that by making our own platform to help our fellow students. We directly interact with trusted suppliers and monitor the entire journey to your doorstep to ensure quality and trust.
                            </p>
                        </div>
                        <div className="border-4 border-black p-8 bg-matcha-bg shadow-brutal flex flex-col items-center justify-center min-h-[300px]">
                            <img src="/final_logo.png" alt="ByteKart Logo" className="h-52 w-auto object-contain mb-6" />
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60 text-center">
                                Greater Noida, India — 2026
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Banner */}
                <section className="px-6 lg:px-12 py-16 bg-matcha-bg border-b-4 border-pure-black">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto text-center">
                        {[
                            { label: 'Getting the best deals', icon: 'payments' },
                            { label: 'Ready to serve customers', icon: 'support_agent' },
                            { label: 'Hassle-free shipping', icon: 'local_shipping' },
                            { label: 'Genuine products', icon: 'verified' },
                            { label: 'Occasional goodies', icon: 'redeem' },
                        ].map((stat) => (
                            <div key={stat.label} className="border-4 border-black bg-white p-6 shadow-brutal-sm hover:-translate-y-1 transition-transform flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-4xl mb-3 text-matcha-dark">{stat.icon}</span>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 lg:px-12 py-20 bg-pure-black text-white text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                        Ready to <span className="text-matcha-bg">Upgrade</span>?
                    </h2>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10 max-w-xl mx-auto">
                        Browse our curated collection of tech essentials. For more on how we work, check our <a href="/faq" className="text-matcha-bg underline decoration-2 underline-offset-4 hover:text-white transition-colors">FAQs</a>.
                    </p>
                    <a
                        href="/catalog"
                        className="inline-block px-10 py-4 bg-matcha-bg text-black font-black uppercase tracking-widest text-sm border-4 border-matcha-bg hover:bg-white hover:border-white transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                    >
                        Browse Catalog →
                    </a>
                </section>
            </main>
        </StorefrontLayout>
    )
}
