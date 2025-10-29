import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PaymentPage = () => {
  const { cart, placeOrder, setCurrentPage } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayment = async () => {
    setProcessing(true);
    setTimeout(async () => {
      const orderId = await placeOrder(paymentMethod);
      setProcessing(false);
      setCurrentPage(`receipt-${orderId}`);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.name} x {item.quantity}</span>
            <span>KSh {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span className="text-orange-500">KSh {total}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <DollarSign size={24} className="mr-2 text-green-500" />
            <span className="font-semibold">Cash Payment</span>
          </label>
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <DollarSign size={24} className="mr-2 text-blue-500" />
            <span className="font-semibold">Online Payment (M-Pesa)</span>
          </label>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={processing}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : 'Confirm Payment'}
      </button>
    </div>
  );
};

export default PaymentPage;