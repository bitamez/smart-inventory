import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Sidebar = () => {
  const location = useLocation()
  const { profile } = useAuth()
  const role = profile?.roles?.name

  const isActive = (path) => location.pathname.startsWith(path)

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', roles: ['Admin', 'Manager', 'Sales Officer'] },
    { path: '/products', label: 'Products', roles: ['Admin', 'Manager', 'Sales Officer'] },
    { path: '/sales', label: 'Sales', roles: ['Admin', 'Manager', 'Sales Officer'] },
    { path: '/stock', label: 'Stock', roles: ['Admin', 'Manager'] },
    { path: '/approvals', label: 'Approvals', roles: ['Manager'] },
    { path: '/reports', label: 'Reports', roles: ['Admin', 'Manager'] },
    { path: '/users', label: 'Users', roles: ['Admin'] },
    { path: '/settings', label: 'Settings', roles: ['Admin'] }
  ]

  const filteredMenu = menuItems.filter(item => item.roles.includes(role))

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md">
      <nav className="p-4 space-y-2">
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
