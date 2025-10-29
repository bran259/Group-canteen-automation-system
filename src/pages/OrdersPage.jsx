import React from 'react';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const OrdersPage = () => {
  const { orders, currentUser } = useAppContext();
  const userOrders = orders.filter(o => o.userId === currentUser.id);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={20} />;
      case 'Preparing': return <Clock size={20} />;
      case 'Ready': return <CheckCircle size={20} />;
      case 'Delivered': return <CheckCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <FileText size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-600">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
      
      <div className="space-y-4">
        {userOrders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>KSh {item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-orange-500">KSh {order.total}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Payment: <span className="font-semibold capitalize">{order.payment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;