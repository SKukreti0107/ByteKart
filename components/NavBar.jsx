export default function NavBar(){
    return (
        <header className="sticky top-6 z-50 w-full">
          <div className="window-container flex h-20 items-center justify-between gap-6 px-6">
            <div className="flex shrink-0 cursor-pointer items-center gap-3">
              <div className="btn-glow rounded-xl bg-[var(--baby-green)] p-2 text-[var(--matcha-deep)]">
                <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--charcoal-dark)]">
                Matcha<span className="text-[var(--matcha-deep)]">Gear</span>
              </h1>
            </div>

            <nav className="hidden items-center gap-1 font-semibold text-[color:var(--charcoal-dark)]/80 xl:flex">
              {['Shop All', 'Components', 'Peripherals', 'Eco-Series'].map((item) => (
                <a key={item} href="#" className="nav-link rounded-full px-4 py-2 transition-all">
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden max-w-md flex-1 md:block">
              <div className="group relative">
                <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-[color:var(--matcha-deep)]/60 group-focus-within:text-[var(--matcha-deep)]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search gear..."
                  className="w-full rounded-full border-2 border-transparent bg-[var(--off-white)] py-2.5 pr-6 pl-12 text-sm text-[var(--charcoal-dark)] placeholder:text-[color:var(--matcha-deep)]/40 transition-colors focus:border-[var(--baby-green)] focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="btn-glow flex h-10 w-10 items-center justify-center rounded-full bg-[var(--baby-green)] text-[var(--charcoal-dark)] transition-all hover:bg-[var(--matcha-deep)] hover:text-white">
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
              </button>
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--baby-green)] shadow-[0_0_15px_rgba(198,220,186,0.6)]">
                <img
                  alt="User"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyvEyl4hxzn4ZiY7a4kZxJmvgkxXt9Li8aIzymRSgISn05qRC1V1KfBYdNjRh5E64cLEiG4bA8Nyk-Fky0Vu3sd5w9vUEiw0Pnqo03JRuCOXu5wQDD7Wh_GzH1ctA6z4q5ATy9Itd3mH9UBTpp_CtReT36zdWmeTwYbctUKMBwGIOsJ4QZjOH9e_Cg01z8mxMc9VM2RIMmhOto1p6h5ua8Nbfd7h5oAFJzjPCQlQPoI-qEZnqhnpgZm9JRVPhzi_-D4kFwYy2vHB8"
                />
              </div>
            </div>
          </div>
        </header>
    )
}