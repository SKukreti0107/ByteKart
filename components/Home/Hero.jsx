export default function Hero(){
    return(
        <section className="window-container relative flex min-h-[500px] items-center overflow-hidden border-none">
            <div className="absolute top-0 right-0 h-full w-2/3 translate-x-12 rounded-l-[3rem] bg-[color:var(--baby-green)]/30" />
            <div className="relative grid w-full grid-cols-1 items-center gap-12 px-8 py-12 md:px-16 lg:grid-cols-2">
              <div className="z-10">
                <div className="btn-glow mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--baby-green)] px-4 py-1.5 text-xs font-bold tracking-wider text-[var(--matcha-deep)] uppercase">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Fresh Drop: Baby Green Edition
                </div>
                <h2 className="mb-6 text-5xl leading-[1.05] font-bold text-[var(--charcoal-dark)] md:text-7xl">
                  High-Tech Meets <br />
                  <span className="text-[var(--matcha-deep)]">Matcha Soul.</span>
                </h2>
                <p className="mb-8 max-w-md text-lg leading-relaxed font-medium text-[color:var(--charcoal-dark)]/80">
                  Engineered for enthusiasts who value both peak performance and a curated, calming workspace aesthetic.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-glow-dark rounded-2xl bg-[var(--matcha-deep)] px-10 py-4 font-bold text-white transition-all hover:bg-[var(--charcoal-dark)]">
                    Shop Components
                  </button>
                  <button className="btn-glow rounded-2xl bg-[var(--baby-green)] px-10 py-4 font-bold text-[var(--charcoal-dark)] transition-all hover:bg-[color:var(--baby-green)]/80">
                    Custom Builds
                  </button>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="rotate-2 rounded-[2.5rem] bg-white p-3 shadow-xl transition-transform duration-500 hover:rotate-0">
                  <img
                    alt="Gaming Setup"
                    className="aspect-video w-full rounded-[2rem] object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACqitE1bmFng5FnkNDfueaDjWRrc6eTNKs-FzqcZpmBeI15nuzr9w7r54ldJgDvvj7wj1354ywo34E1-hzZOLsGcYO5swc1VLf-_iQkwHUaqalflASnl0MtYh51fh4wY4bI5nlrFnjjDNypmfBd7wKVEF5WgFQkMeNamx8MAiig548WJuDxzNRPMBRdro2dSWcV79kGmF6YF33pQppTu168a4UXutgRO--rHoForL3Az5J46-SQwade3QXMO2wyl--2y1zsfRM2xo"
                  />
                  <div className="absolute -bottom-6 -left-6 rounded-2xl border-4 border-[var(--baby-green)] bg-[var(--charcoal-dark)] p-6 text-white shadow-xl">
                    <p className="mb-1 text-xs font-bold tracking-widest text-[var(--baby-green)] uppercase drop-shadow-[0_0_8px_rgba(198,220,186,0.8)]">
                      New Arrival
                    </p>
                    <p className="text-2xl font-bold">Zen-Series Case</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
    )
}