import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ReceiptPage = ({ orderId }) => {
  const { orders, setCurrentPage } = useAppContext();
  const order = orders.find(o => o.id === parseInt(orderId));

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Order not found</p>
      </div>
    );
  }

  const handleDownload = () => {
    const receiptContent = `
CANTEEN RECEIPT
================
Order #${order.id}
Date: ${new Date(order.date).toLocaleString()}

ITEMS:
${order.items.map(item => `${item.name} x ${item.quantity} - KSh ${item.price * item.quantity}`).join('\n')}

TOTAL: KSh ${order.total}
Payment: ${order.payment}
Status: ${order.status}

Thank you for your order!
    `;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order</p>
        </div>

        <div className="border-t border-b py-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-bold">#{order.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span>{new Date(order.date).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="capitalize font-semibold">{order.payment}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Order Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>KSh {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-orange-500">KSh {order.total}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Download Receipt
          </button>
          <button
            onClick={() => setCurrentPage('orders')}
            className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;