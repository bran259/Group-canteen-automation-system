import React, { useState } from 'react';
import { Menu, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MenuPage = () => {
  const { menu, addToCart } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(menu.map(item => item.category))];
  const filteredMenu = selectedCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Menu</h1>
      
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-200 whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-48 bg-gradient-to-br from-orange-200 to-green-200 flex items-center justify-center">
              <Menu size={64} className="text-white" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <span className="text-lg font-bold text-orange-500">KSh {item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.category}</p>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${item.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {item.stock < 10 && <AlertTriangle size={16} className="inline mr-1" />}
                  Stock: {item.stock}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  disabled={item.stock === 0}
                  className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
                    item.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;