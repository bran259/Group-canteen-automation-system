import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrdersPage from './pages/OrdersPage';
import ReceiptPage from './pages/ReceiptPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

const AppContent = () => {
  const { currentUser, currentPage, notification } = useAppContext();

  const renderPage = () => {
    if (!currentUser) {
      if (currentPage === 'register') return <RegisterPage />;
      return <LoginPage />;
    }

    if (currentPage.startsWith('receipt-')) {
      const orderId = currentPage.split('-')[1];
      return <ReceiptPage orderId={orderId} />;
    }

    switch (currentPage) {
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'payment':
        return <PaymentPage />;
      case 'orders':
        return <OrdersPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-menu':
        return <AdminMenuPage />;
      case 'admin-orders':
        return <AdminOrdersPage />;
      case 'admin-inventory':
        return <AdminInventoryPage />;
      case 'admin-reports':
        return <AdminReportsPage />;
      case 'admin-users':
        return <AdminUsersPage />;
      default:
        return <MenuPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <Navigation />
      {renderPage()}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;