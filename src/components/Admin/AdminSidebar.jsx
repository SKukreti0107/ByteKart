import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Campaigns', to: '/admin/hero' },
  { label: 'Notices', to: '/admin/notice' },
  { label: 'Inventory', to: '/admin/inventory' },
  { label: 'Categories', to: '/admin/categories' },
  { label: 'Subcategories', to: '/admin/subcategories' },
  { label: 'Brands', to: '/admin/brands' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Returns', to: '/admin/returns' },
  { label: 'Support', to: '/admin/support' },
  { label: 'Redeem Codes', to: '/admin/redeem-codes' },
  { label: 'Customers', to: '/admin/customers' },
]

export default function AdminSidebar() {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-matcha-bg border-4 border-black p-6 shadow-brutal mb-8 lg:sticky lg:top-32">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-4xl">terminal</span>
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest text-black leading-none">Admin</h2>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">ByteKart Ops</p>
          </div>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/admin'} // Exact match for the dashboard route
              className={({ isActive }) =>
                `block border-4 border-black p-3 font-black uppercase tracking-widest text-sm transition-all ${isActive ? 'bg-black text-matcha-bg shadow-brutal-sm' : 'bg-white text-black hover:bg-black hover:text-matcha-bg hover:shadow-brutal-sm hover:-translate-y-1'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
