import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, setCurrentPage } = useAppContext();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some delicious items from our menu!</p>
        <button
          onClick={() => setCurrentPage('menu')}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">KSh {item.price} each</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateCartQuantity(item.id, -1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, 1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="w-24 text-right font-bold text-gray-800">
                KSh {item.price * item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-orange-500">KSh {total}</span>
        </div>
        <button
          onClick={() => setCurrentPage('payment')}
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;