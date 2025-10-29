import React from 'react';
import { useAppContext } from '../../context/AppContext';

const AdminReportsPage = () => {
  const { orders } = useAppContext();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  
  const itemSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (itemSales[item.name]) {
        itemSales[item.name].quantity += item.quantity;
        itemSales[item.name].revenue += item.price * item.quantity;
      } else {
        itemSales[item.name] = {
          quantity: item.quantity,
          revenue: item.price * item.quantity
        };
      }
    });
  });

  const topItems = Object.entries(itemSales)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.date).toDateString() === today);
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-500">KSh {totalRevenue}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-500">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Today's Revenue</h3>
          <p className="text-3xl font-bold text-orange-500">KSh {todayRevenue}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Selling Items</h2>
        <div className="space-y-4">
          {topItems.length > 0 ? topItems.map(([name, data], idx) => (
            <div key={name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                <div>
                  <p className="font-semibold text-lg">{name}</p>
                  <p className="text-sm text-gray-600">{data.quantity} units sold</p>
                </div>
              </div>
              <p className="text-xl font-bold text-green-500">KSh {data.revenue}</p>
            </div>
          )) : (
            <p className="text-gray-600">No sales data available yet</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Status Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Pending', 'Preparing', 'Ready', 'Delivered'].map(status => {
            const count = orders.filter(o => o.status === status).length;
            return (
              <div key={status} className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-500">{count}</p>
                <p className="text-sm text-gray-600 mt-1">{status}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;