import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/admin/inventory' },
  { label: 'Inventory', to: '/admin/inventory' },
  { label: 'Orders', to: '/admin/inventory' },
  { label: 'Customers', to: '/admin/inventory' },
]

export default function AdminSidebar() {
  return (
    <aside className="window-container h-fit border-none p-5 lg:sticky lg:top-6 lg:w-72">
      <div className="mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined rounded-lg bg-[var(--baby-green)] p-2 text-[var(--matcha-deep)]">inventory_2</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--matcha-deep)]">Admin</p>
          <p className="text-xl font-bold">ByteKart Ops</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2 font-semibold transition ${
                isActive ? 'bg-[var(--matcha-deep)] text-white' : 'bg-[var(--off-white)] text-[var(--charcoal-dark)] hover:bg-[var(--baby-green)]'
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
