import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authClient } from '../auth-client'
import { useCart } from '../context/CartContext'
import AuthModal from './AuthModal'

export default function BottomDock() {
  const location = useLocation()
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { data: session, isPending } = authClient.useSession()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const currentPath = location.pathname

  const handleAccountClick = () => {
    if (isPending) return
    if (session) {
      setIsDrawerOpen(true)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      setIsDrawerOpen(false)
      window.location.href = '/'
    } catch (err) {
      console.error('Sign out failed:', err)
      window.location.href = '/'
    }
  }

  const navItems = [
    {
      label: 'Home',
      icon: 'home',
      path: '/',
      onClick: () => navigate('/'),
      active: currentPath === '/'
    },
    {
      label: 'Catalog',
      icon: 'widgets',
      path: '/catalog',
      onClick: () => navigate('/catalog'),
      active: currentPath === '/catalog'
    },
    {
      label: 'Cart',
      icon: 'shopping_cart',
      path: '/cart',
      onClick: () => navigate('/cart'),
      active: currentPath === '/cart',
      badge: cartCount
    },
    {
      label: 'Account',
      icon: 'person',
      onClick: handleAccountClick,
      active: isDrawerOpen || isAuthModalOpen || currentPath === '/orders' || currentPath === '/requests'
    }
  ]

  const isAdmin = session?.user?.is_admin || session?.user?.role === 'admin'

  return (
    <>
      {/* Bottom Navigation Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-pure-white border-t-4 border-pure-black z-40 flex items-stretch justify-around">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 border-r-2 last:border-r-0 border-pure-black active:bg-pure-black active:text-matcha-bg transition-colors relative ${
              item.active ? 'bg-matcha-bg text-pure-black font-black' : 'text-pure-black/70 font-bold'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {item.icon}
            </span>
            <span className="text-[10px] uppercase tracking-wider">
              {item.label}
            </span>

            {/* Cart Count Badge */}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-2 right-1/2 translate-x-6 flex h-5 w-5 items-center justify-center bg-red-600 font-bold text-white text-[10px] border-2 border-pure-black">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Backdrop for Account Drawer */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="lg:hidden fixed inset-0 bg-pure-black/60 z-45 transition-opacity"
        />
      )}

      {/* Slide-Up Account Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 bg-pure-white border-t-4 border-pure-black z-50 shadow-brutal transition-transform duration-300 ease-in-out transform ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="border-b-4 border-pure-black p-4 bg-matcha-bg flex justify-between items-center">
          <div>
            <p className="text-sm font-black uppercase text-pure-black">
              {session?.user?.name || 'My Account'}
            </p>
            <p className="text-[10px] font-bold text-pure-black/60">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center border-2 border-pure-black bg-pure-white hover:bg-pure-black hover:text-pure-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Drawer Content / Navigation Options */}
        <div className="flex flex-col p-2 gap-2 bg-[#E8EFE5]">
          {isAdmin && (
            <Link
              to="/admin/inventory"
              onClick={() => setIsDrawerOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-3 bg-pure-white border-2 border-pure-black font-black uppercase tracking-wider text-xs shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-pure-black"
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              Dashboard / Admin
            </Link>
          )}

          <Link
            to="/requests"
            onClick={() => setIsDrawerOpen(false)}
            className="flex w-full items-center gap-3 px-4 py-3 bg-pure-white border-2 border-pure-black font-black uppercase tracking-wider text-xs shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-pure-black"
          >
            <span className="material-symbols-outlined text-[18px]">inventory</span>
            My Requests
          </Link>

          <Link
            to="/orders"
            onClick={() => setIsDrawerOpen(false)}
            className="flex w-full items-center gap-3 px-4 py-3 bg-pure-white border-2 border-pure-black font-black uppercase tracking-wider text-xs shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-pure-black"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            My Orders
          </Link>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-4 py-3 bg-red-100 border-2 border-pure-black font-black uppercase tracking-wider text-xs shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-red-600"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Auth Modal Integration */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
