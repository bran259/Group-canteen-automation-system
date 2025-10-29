import React from 'react';
import { DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { orders, menu } = useAppContext();
  
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  const lowStockItems = menu.filter(item => item.stock < 10);
  
  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <DollarSign size={32} />
          </div>
          <p className="text-3xl font-bold">KSh {totalSales}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Active Orders</h3>
            <Clock size={32} />
          </div>
          <p className="text-3xl font-bold">{activeOrders}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
            <AlertTriangle size={32} />
          </div>
          <p className="text-3xl font-bold">{lowStockItems.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.length > 0 ? recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-500">KSh {order.total}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>
            )) : (
              <p className="text-gray-600">No orders yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Low Stock Items</h2>
          <div className="space-y-3">
            {lowStockItems.length === 0 ? (
              <p className="text-gray-600">All items are well stocked!</p>
            ) : (
              lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={20} className="text-red-500" />
                    <span className="font-bold text-red-600">{item.stock} left</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;