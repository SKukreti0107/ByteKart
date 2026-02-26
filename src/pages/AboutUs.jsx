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
                        We're ByteKart — a no-nonsense electronics store that believes great tech shouldn't come with a premium markup.
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
                                ByteKart was born from a simple frustration: why does buying electronics in India feel like navigating a maze of inflated prices and questionable sellers? We cut the noise. Every product on our platform is sourced directly, priced transparently, and delivered with care.
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
                                We show you what we pay and what our cut is. Transparent margins, no hidden fees. You see exactly where your money goes.
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
                                Built by Enthusiasts,<br />
                                <span className="text-matcha-dark">For Enthusiasts</span>
                            </h2>
                            <p className="text-sm font-bold leading-relaxed text-black/70 mb-4">
                                We started as a group of tech enthusiasts frustrated by the Indian electronics market. Overpriced components, unreliable sellers, and zero transparency were the norm.
                            </p>
                            <p className="text-sm font-bold leading-relaxed text-black/70">
                                ByteKart is our answer to that. A clean, no-nonsense platform where you can find the latest tech at prices that make sense. We're building the store we always wished existed.
                            </p>
                        </div>
                        <div className="border-4 border-black p-8 bg-matcha-bg shadow-brutal flex flex-col items-center justify-center min-h-[300px]">
                            <img src="/final_logo.png" alt="ByteKart Logo" className="h-52 w-auto object-contain mb-6" />
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60 text-center">
                                Est. 2024 — Bengaluru, India
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Banner */}
                <section className="px-6 lg:px-12 py-16 bg-matcha-bg border-b-4 border-pure-black">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
                        {[
                            { num: '500+', label: 'Products' },
                            { num: '10K+', label: 'Happy Customers' },
                            { num: '24hr', label: 'Avg. Ship Time' },
                            { num: '100%', label: 'Genuine Products' },
                        ].map((stat) => (
                            <div key={stat.label} className="border-4 border-black bg-white p-6 shadow-brutal-sm hover:-translate-y-1 transition-transform">
                                <p className="text-3xl md:text-4xl font-black text-matcha-dark">{stat.num}</p>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest mt-2 text-black/60">{stat.label}</p>
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
                        Browse our curated collection of tech essentials. No fluff, no markup — just the gear you need.
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
