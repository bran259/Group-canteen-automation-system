import React from 'react';
import { Menu, ShoppingCart, Package, Users, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navigation = () => {
  const { currentUser, logout, setCurrentPage, cart } = useAppContext();

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  const customerLinks = [
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cart.length },
    { id: 'orders', label: 'Orders', icon: FileText }
  ];

  const adminLinks = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-menu', label: 'Menu', icon: Menu },
    { id: 'admin-orders', label: 'Orders', icon: FileText },
    { id: 'admin-inventory', label: 'Inventory', icon: Package },
    { id: 'admin-reports', label: 'Reports', icon: FileText },
    { id: 'admin-users', label: 'Users', icon: Users }
  ];

  const links = isAdmin ? adminLinks : customerLinks;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-orange-500">Canteen</h1>
            <div className="hidden md:flex space-x-4">
              {links.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => setCurrentPage(link.id)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {currentUser.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;