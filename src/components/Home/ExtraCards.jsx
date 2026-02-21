export default function ExtraCards() {
    return (
        <div className="space-y-8">
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="window-container group relative overflow-hidden border-0 bg-white p-6 shadow-lg md:p-10">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-bl-[10rem] bg-baby-green/20 transition-transform group-hover:scale-110" />
                    <div className="relative z-10">
                        <p className="mb-4 text-xs font-bold tracking-widest text-matcha-deep uppercase">
                            Sustainability First
                        </p>
                        <h3 className="mb-4 text-3xl font-bold text-charcoal-dark md:text-4xl">Carbon-Zero Hardware</h3>
                        <p className="mb-8 max-w-sm font-medium text-charcoal-dark/70">
                            Every purchase includes a donation to global reforestation efforts. Build green, play green.
                        </p>
                        <button className="btn-glow-dark rounded-xl bg-charcoal-dark px-6 py-3 font-bold text-white transition-all hover:bg-matcha-deep md:px-8">
                            Learn Our Mission
                        </button>
                    </div>
                </div>

                <div className="window-container relative flex flex-col items-start justify-center overflow-hidden border-0 bg-white p-6 shadow-lg md:p-10">
                    <div className="absolute inset-0 bg-baby-green/10" />
                    <div className="relative z-10">
                        <div className="mb-4 inline-block rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                            FLASH SALE: 24h LEFT
                        </div>
                        <h3 className="mb-4 text-3xl font-bold text-charcoal-dark md:text-4xl">Matcha Bundle 40% OFF</h3>
                        <p className="mb-8 max-w-sm font-medium text-charcoal-dark/70">
                            Get the keyboard, mouse, and headset in our signature Matcha theme for a fraction of the price.
                        </p>
                        <button className="btn-glow-dark rounded-xl bg-matcha-deep px-6 py-3 font-bold text-white shadow-md transition-all hover:shadow-lg md:px-8">
                            Claim Bundle
                        </button>
                    </div>
                </div>
            </section>

            <section className="flex flex-col items-start gap-10 rounded-squish border-[4px] border-white/40 bg-charcoal-dark p-10 text-white shadow-window-sep md:p-14 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
                        Join the <span className="text-baby-green drop-shadow-[0_0_15px_rgba(198,220,186,0.35)]">Green Tech</span> Revolution.
                    </h2>
                    <p className="max-w-lg text-lg font-medium text-white/70">
                        Sign up for early access to limited edition colorways and exclusive member discounts on future drops.
                    </p>
                </div>
                <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm lg:w-auto">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="email"
                            placeholder="your.email@tech.com"
                            className="w-full min-w-0 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/40 focus:border-baby-green focus:ring-2 focus:ring-baby-green sm:min-w-[320px]"
                        />
                        <button className="btn-glow rounded-2xl bg-baby-green px-8 py-4 font-bold whitespace-nowrap text-charcoal-dark transition-all hover:bg-white">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
