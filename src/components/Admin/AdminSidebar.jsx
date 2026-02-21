import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Campaigns', to: '/admin/hero' },
  { label: 'Inventory', to: '/admin/inventory' },
  { label: 'Categories', to: '/admin/categories' },
  { label: 'Subcategories', to: '/admin/subcategories' },
  { label: 'Brands', to: '/admin/brands' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Customers', to: '/admin/customers' },
]

export default function AdminSidebar() {
  return (
    <aside className="window-container h-fit border-none p-5 lg:sticky lg:top-6 lg:w-72">
      <div className="mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined rounded-lg bg-baby-green p-2 text-matcha-deep">inventory_2</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-matcha-deep">Admin</p>
          <p className="text-xl font-bold">ByteKart Ops</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2 font-semibold transition ${isActive ? 'bg-matcha-deep text-white' : 'bg-off-white text-charcoal-dark hover:bg-baby-green'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
