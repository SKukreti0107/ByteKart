import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api'
import { authClient } from '../auth-client'
import AuthModal from './AuthModal'
import { useCart } from '../context/CartContext'

const defaultLinks = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

export default function NavBar({ links = defaultLinks, title = 'ByteKart', showSearch = true }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [isHoveringCatalog, setIsHoveringCatalog] = useState(false)
  const [hasFetchedCategories, setHasFetchedCategories] = useState(false)

  const { cartCount } = useCart()

  // Auth State
  const { data: session, isPending } = authClient.useSession()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await authClient.signOut()
    setIsProfileMenuOpen(false)
  }

  // Fetch categories on mount with session storage caching
  useEffect(() => {
    const fetchCategoriesOnLoad = async () => {
      try {
        const response = await api.getWithCache('/categories')
        setCategories(response.data)
        setHasFetchedCategories(true)
      } catch (err) {
        console.error("Failed to fetch categories:", err)
      }
    }

    if (!hasFetchedCategories) {
      fetchCategoriesOnLoad()
    }
  }, [hasFetchedCategories])

  const handleCatalogHover = () => {
    setIsHoveringCatalog(true)
  }

  const handleCatalogLeave = () => {
    setIsHoveringCatalog(false)
  }

  return (
    <header className="fixed bottom-2 left-2 right-2 z-50 md:sticky md:bottom-auto md:top-6 md:left-auto md:right-auto md:w-full">
      <div className="window-container relative flex h-auto flex-wrap items-center justify-between gap-3 px-4 py-3 md:h-28 md:flex-nowrap md:gap-6 md:px-6 md:py-0">
        <Link to="/" className="flex shrink-0 cursor-pointer items-center gap-2.5 md:gap-3">
          <img src="/ByteKart_logo.png" alt="ByteKart Logo" className="h-20 w-auto object-contain sm:h-28" />
        </Link>

        <nav className="hidden items-center gap-1 font-semibold text-charcoal-dark/80 xl:flex">
          {links.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={item.label === 'Catalog' ? handleCatalogHover : undefined}
              onMouseLeave={item.label === 'Catalog' ? handleCatalogLeave : undefined}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-1 rounded-full px-4 py-2 transition-all ${isActive ? 'bg-baby-green text-matcha-deep' : ''}`
                }
              >
                {item.label}
                {item.label === 'Catalog' && (
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                )}
              </NavLink>

              {item.label === 'Catalog' && isHoveringCatalog && categories.length > 0 && (
                <div className="absolute top-full left-1/2 w-48 -translate-x-1/2 pt-2">
                  <div className="rounded-2xl border border-baby-green/30 bg-pure-white p-2 shadow-xl">
                    <div className="flex flex-col gap-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/catalog?category=${cat.name}`}
                          onClick={() => setIsHoveringCatalog(false)}
                          className="rounded-xl px-3 py-2 text-sm transition-all hover:bg-baby-green/30 hover:text-matcha-deep"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {showSearch ? (
          <div className="hidden max-w-md flex-1 lg:block">
            <div className="group relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-matcha-deep/60 group-focus-within:text-matcha-deep">
                search
              </span>
              <input
                type="text"
                placeholder="Search gear..."
                className="w-full rounded-full border-2 border-transparent bg-off-white py-2.5 pr-6 pl-12 text-sm text-charcoal-dark placeholder:text-matcha-deep/40 transition-colors focus:border-baby-green focus:ring-0"
              />
            </div>
          </div>
        ) : (
          <div className="hidden flex-1 md:block" />
        )}

        <div className="flex shrink-0 items-center gap-2.5 md:gap-3 relative">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="btn-glow flex h-10 w-10 items-center justify-center rounded-full bg-off-white text-charcoal-dark transition-all hover:bg-baby-green xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <Link
            to="/cart"
            className="flex btn-glow h-10 w-10 relative items-center justify-center rounded-full bg-baby-green text-charcoal-dark transition-all hover:bg-matcha-deep hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-bold text-white text-[10px]">
                {cartCount}
              </span>
            )}
          </Link>

          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="btn-glow flex h-10 w-10 overflow-hidden rounded-full border-2 border-baby-green shadow-[0_0_15px_rgba(198,220,186,0.6)] focus:outline-none focus:ring-2 focus:ring-matcha-deep"
              >
                <img
                  alt={session.user.name || "User Profile"}
                  className="h-full w-full object-cover"
                  src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name || 'User'}&background=c6dcba&color=2e3c30`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 bottom-full mb-3 md:bottom-auto md:mb-0 md:top-full md:mt-2 lg:w-48 overflow-hidden rounded-xl bg-pure-white shadow-xl ring-1 ring-charcoal-dark/5">
                  <div className="border-b border-charcoal-dark/10 px-4 py-3">
                    <p className="truncate text-sm font-bold text-charcoal-dark">{session.user.name}</p>
                    <p className="truncate text-xs text-charcoal-dark/60">{session.user.email}</p>
                  </div>
                  <div className="p-1">
                    {/* Check if user is an admin */}
                    {(session.user?.is_admin || session.user?.role === 'admin') && (
                      <Link
                        to="/admin/inventory"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-charcoal-dark hover:bg-baby-green"
                      >
                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span> Dashboard
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-charcoal-dark hover:bg-baby-green"
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span> Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-glow rounded-xl bg-charcoal-dark px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-matcha-deep"
            >
              Sign In
            </button>
          )}
        </div>

        {isMobileMenuOpen ? (
          <div className="absolute bottom-full left-0 right-0 mb-3 rounded-2xl bg-pure-white p-4 shadow-xl border border-baby-green/30 xl:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${isActive
                      ? 'bg-baby-green text-matcha-deep'
                      : 'bg-off-white text-charcoal-dark'
                    }`
                  }
                >
                  <div className="flex items-center gap-1">
                    {item.label}
                    {item.label === 'Catalog' && (
                      <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    )}
                  </div>
                </NavLink>
              ))}
            </nav>

            {showSearch ? (
              <div className="group relative mt-3">
                <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-matcha-deep/60 group-focus-within:text-matcha-deep">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search gear..."
                  className="w-full rounded-full border-2 border-transparent bg-off-white py-2.5 pr-6 pl-12 text-sm text-charcoal-dark placeholder:text-matcha-deep/40 transition-colors focus:border-baby-green focus:ring-0"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  )
}
