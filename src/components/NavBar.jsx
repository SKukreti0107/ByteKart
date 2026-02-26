import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
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

const SearchDropdown = ({ results, isSearching, onResultClick, show, direction = 'down' }) => {
  if (!show) return null;

  const positionClasses = direction === 'up'
    ? 'absolute bottom-full left-0 right-0 mb-2'
    : 'absolute top-full left-0 right-0 mt-2';

  if (isSearching) {
    return (
      <div className={`${positionClasses} bg-pure-white p-4 shadow-brutal border-4 border-pure-black z-50`}>
        <div className="animate-pulse flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 border-2 border-black"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 w-3/4"></div>
                <div className="h-3 bg-gray-200 w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (results.length === 0) return null

  return (
    <div className={`${positionClasses} bg-pure-white py-2 shadow-brutal border-4 border-pure-black z-50 max-h-80 overflow-y-auto w-full`}>
      {results.map(product => {
        const p = (product.supplier_price || 0) + (product.our_cut || 0);
        return (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={onResultClick}
            className="flex items-center gap-3 px-4 py-2 hover:bg-pure-black hover:text-matcha-bg transition-colors group border-b-2 border-transparent hover:border-black"
          >
            <img src={product.image_url || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=100'} alt={product.name} className="h-10 w-10 object-cover border-2 border-black" />
            <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-black truncate group-hover:text-matcha-bg">{product.name}</h4>
              <p className="text-xs font-bold group-hover:text-matcha-bg/80">
                ₹{p}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}


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

  // Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const searchContainerRefDesk = useRef(null)
  const searchContainerRefMob = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRefDesk.current && !searchContainerRefDesk.current.contains(event.target) &&
        searchContainerRefMob.current && !searchContainerRefMob.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true)
        setShowDropdown(true)
        api.getWithCache(`/listings?search=${encodeURIComponent(searchQuery.trim())}&limit=5`)
          .then(res => {
            setSearchResults(res.data)
          })
          .catch(err => console.error("Search fetch failed", err))
          .finally(() => setIsSearching(false))
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsMobileMenuOpen(false)
      setShowDropdown(false)
      setSearchQuery('')
    }
  }

  const handleResultClick = () => {
    setShowDropdown(false)
    setIsMobileMenuOpen(false)
    setSearchQuery('')
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      setIsProfileMenuOpen(false)
      window.location.href = '/'
    } catch (err) {
      console.error('Sign out failed:', err)
      // Force reload even if signOut API fails
      window.location.href = '/'
    }
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
    <>
      <header className="flex items-stretch justify-between h-24 border-b-4 border-pure-black bg-pure-white sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center justify-center border-r-4 border-pure-black bg-matcha-bg hover:bg-black transition-colors group overflow-hidden h-full min-w-[120px] md:min-w-[280px]">
          <img
            src="/final_logo.png"
            alt="ByteKart Logo"
            className="w-full h-52 object-contain"
          />
        </Link>

        <nav className="hidden lg:flex flex-grow items-center justify-start px-8 gap-8 text-sm font-black tracking-widest uppercase text-pure-black h-full">
          {links.map((item) => (
            <div
              key={item.label}
              className="relative h-full flex items-center"
              onMouseEnter={item.label === 'Catalog' ? handleCatalogHover : undefined}
              onMouseLeave={item.label === 'Catalog' ? handleCatalogLeave : undefined}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-4 py-2 hover:bg-pure-black hover:text-matcha-bg transition-colors border-2 border-transparent hover:border-black flex items-center gap-1 ${isActive ? 'bg-pure-black text-matcha-bg border-black' : ''}`
                }
              >
                {item.label}
                {item.label === 'Catalog' && (
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                )}
              </NavLink>

              {item.label === 'Catalog' && isHoveringCatalog && categories.length > 0 && (
                <div className="absolute top-full left-0 w-48 pt-2"
                  onMouseLeave={handleCatalogLeave}
                  onMouseEnter={handleCatalogHover}>
                  <div className="border-4 border-pure-black bg-pure-white p-2 shadow-brutal">
                    <div className="flex flex-col gap-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/catalog?category=${cat.name}`}
                          onClick={() => setIsHoveringCatalog(false)}
                          className="px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all hover:bg-pure-black hover:text-white"
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

        <div className="flex items-center px-4 md:px-6 gap-2 md:gap-4 bg-pure-white flex-grow justify-end">
          {showSearch && (
            <div className="relative w-full max-w-md hidden md:block" ref={searchContainerRefDesk}>
              <form onSubmit={handleSearch} className="group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-black">search</span>
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onFocus={() => { if (searchQuery.trim().length > 1) setShowDropdown(true) }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-[#E8EFE5] text-charcoal font-bold text-sm focus:ring-0 placeholder:text-gray-500 !border-2 !border-black rounded-none shadow-brutal-sm"
                />
                <SearchDropdown
                  results={searchResults}
                  isSearching={isSearching}
                  onResultClick={handleResultClick}
                  show={showDropdown}
                />
              </form>
            </div>
          )}

          <Link
            to="/cart"
            className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center bg-matcha-bg rounded-none !border-2 !border-black hover:bg-black hover:text-matcha-bg transition-colors shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <span className="material-symbols-outlined text-lg md:text-xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-none bg-red-500 font-bold text-white text-[10px] md:text-xs border-2 border-black">
                {cartCount}
              </span>
            )}
          </Link>

          {isPending ? (
            <div className="w-10 h-10 md:w-12 md:h-12 animate-pulse rounded-full bg-gray-200 border-2 border-black"></div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-matcha-bg rounded-none !border-2 !border-black hover:bg-black hover:text-matcha-bg transition-colors shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] overflow-hidden"
              >
                {session.user.image ? (
                  <img
                    alt={session.user.name || "User Profile"}
                    className="h-full w-full object-cover"
                    src={session.user.image}
                  />
                ) : (
                  <span className="font-bold text-sm uppercase">
                    {session.user?.name?.substring(0, 2) || "NS"}
                  </span>
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 border-4 border-black bg-pure-white shadow-brutal">
                  <div className="border-b-4 border-black px-4 py-3 bg-matcha-bg">
                    <p className="truncate text-sm font-black uppercase text-black">{session.user.name}</p>
                    <p className="truncate text-[10px] font-bold text-black/60">{session.user.email}</p>
                  </div>
                  <div className="flex flex-col">
                    {(session.user?.is_admin || session.user?.role === 'admin') && (
                      <Link
                        to="/admin/inventory"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white border-b-2 border-black"
                      >
                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span> Dashboard
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white border-b-2 border-black"
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span> Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-red-600 hover:bg-red-600 hover:text-white"
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
              className="h-10 md:h-12 px-4 bg-pure-black text-pure-white font-black uppercase tracking-widest text-xs border-2 border-black shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-white hover:text-black transition-all flex items-center"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 relative flex items-center justify-center bg-pure-white rounded-none !border-2 !border-black transition-colors shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] lg:hidden"
          >
            <span className="material-symbols-outlined text-lg">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b-4 border-pure-black bg-pure-white px-4 py-4 sticky top-24 z-40 shadow-brutal transition-all">
          <nav className="flex flex-col gap-2">
            {links.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-black uppercase tracking-widest transition-all border-2 border-black shadow-brutal-sm ${isActive
                    ? 'bg-black text-matcha-bg'
                    : 'bg-white text-black hover:bg-matcha-bg'
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {item.label}
                </div>
              </NavLink>
            ))}
          </nav>

          {showSearch && (
            <div ref={searchContainerRefMob} className="relative mt-4">
              <form onSubmit={handleSearch} className="group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">search</span>
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onFocus={() => { if (searchQuery.trim().length > 1) setShowDropdown(true) }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#E8EFE5] text-charcoal font-bold text-sm focus:ring-0 placeholder:text-gray-500 !border-2 !border-black rounded-none shadow-brutal-sm"
                />
                <SearchDropdown
                  results={searchResults}
                  isSearching={isSearching}
                  onResultClick={handleResultClick}
                  show={showDropdown}
                />
              </form>
            </div>
          )}
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
