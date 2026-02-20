import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const defaultLinks = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'Product', to: '/product' },
  { label: 'Checkout', to: '/checkout' },
]

export default function NavBar({ links = defaultLinks, title = 'MatchaGear', showSearch = true }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-3 z-50 w-full md:top-6">
      <div className="window-container flex h-auto flex-wrap items-center justify-between gap-3 px-4 py-3 md:h-20 md:flex-nowrap md:gap-6 md:px-6 md:py-0">
        <Link to="/" className="flex shrink-0 cursor-pointer items-center gap-2.5 md:gap-3">
          <div className="btn-glow rounded-xl bg-[var(--baby-green)] p-2 text-[var(--matcha-deep)]">
            <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[var(--charcoal-dark)] sm:text-xl md:text-2xl">{title}</h1>
        </Link>

        <nav className="hidden items-center gap-1 font-semibold text-[color:var(--charcoal-dark)]/80 xl:flex">
          {links.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `nav-link rounded-full px-4 py-2 transition-all ${isActive ? 'bg-[var(--baby-green)] text-[var(--matcha-deep)]' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {showSearch ? (
          <div className="hidden max-w-md flex-1 lg:block">
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
        ) : (
          <div className="hidden flex-1 md:block" />
        )}

        <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="btn-glow flex h-10 w-10 items-center justify-center rounded-full bg-[var(--off-white)] text-[var(--charcoal-dark)] transition-all hover:bg-[var(--baby-green)] xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
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

        {isMobileMenuOpen ? (
          <div className="w-full border-t border-[var(--baby-green)]/40 pt-3 xl:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[var(--baby-green)] text-[var(--matcha-deep)]'
                        : 'bg-[var(--off-white)] text-[var(--charcoal-dark)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {showSearch ? (
              <div className="group relative mt-3">
                <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-[color:var(--matcha-deep)]/60 group-focus-within:text-[var(--matcha-deep)]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search gear..."
                  className="w-full rounded-full border-2 border-transparent bg-[var(--off-white)] py-2.5 pr-6 pl-12 text-sm text-[var(--charcoal-dark)] placeholder:text-[color:var(--matcha-deep)]/40 transition-colors focus:border-[var(--baby-green)] focus:ring-0"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  )
}