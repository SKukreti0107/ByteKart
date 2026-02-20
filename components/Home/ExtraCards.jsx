export default function ExtraCards() {
    return (
        <div>
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="window-container group relative overflow-hidden border-0 bg-white p-10 shadow-lg">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-bl-[10rem] bg-[color:var(--baby-green)]/20 transition-transform group-hover:scale-110" />
                    <div className="relative z-10">
                        <p className="mb-4 text-xs font-bold tracking-widest text-[var(--matcha-deep)] uppercase">
                            Sustainability First
                        </p>
                        <h3 className="mb-4 text-4xl font-bold text-[var(--charcoal-dark)]">Carbon-Zero Hardware</h3>
                        <p className="mb-8 max-w-sm font-medium text-[color:var(--charcoal-dark)]/70">
                            Every purchase includes a donation to global reforestation efforts. Build green, play green.
                        </p>
                        <button className="btn-glow-dark rounded-xl bg-[var(--charcoal-dark)] px-8 py-3 font-bold text-white transition-all hover:bg-[var(--matcha-deep)]">
                            Learn Our Mission
                        </button>
                    </div>
                </div>

                <div className="window-container relative flex flex-col items-start justify-center overflow-hidden border-0 bg-white p-10 shadow-lg">
                    <div className="absolute inset-0 bg-[color:var(--baby-green)]/10" />
                    <div className="relative z-10">
                        <div className="mb-4 inline-block rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                            FLASH SALE: 24h LEFT
                        </div>
                        <h3 className="mb-4 text-4xl font-bold text-[var(--charcoal-dark)]">Matcha Bundle 40% OFF</h3>
                        <p className="mb-8 max-w-sm font-medium text-[color:var(--charcoal-dark)]/70">
                            Get the keyboard, mouse, and headset in our signature Matcha theme for a fraction of the price.
                        </p>
                        <button className="btn-glow-dark rounded-xl bg-[var(--matcha-deep)] px-8 py-3 font-bold text-white shadow-md transition-all hover:shadow-lg">
                            Claim Bundle
                        </button>
                    </div>
                </div>
            </section>

            <section className="window-container flex flex-col items-center gap-12 border-none bg-[var(--charcoal-dark)] p-10 text-white shadow-xl md:p-16 lg:flex-row">
                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl leading-tight font-bold md:text-5xl">
                        Join the <span className="text-[var(--baby-green)]">Green Tech</span> Revolution.
                    </h2>
                    <p className="max-w-lg text-lg font-medium text-white/70">
                        Sign up for early access to limited edition colorways and exclusive member discounts on future drops.
                    </p>
                </div>
                <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm lg:w-auto">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder="your.email@tech.com"
                            className="min-w-[320px] rounded-2xl border-none bg-white/10 px-8 py-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-[var(--baby-green)]"
                        />
                        <button className="btn-glow rounded-2xl bg-[var(--baby-green)] px-10 py-4 font-bold whitespace-nowrap text-[var(--charcoal-dark)] transition-all hover:bg-white">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}