import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminInventoryPage = () => {
  const { menu, updateMenuItem } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [stockValue, setStockValue] = useState('');

  const handleUpdateStock = (item) => {
    if (!stockValue || parseInt(stockValue) < 0) {
      alert('Please enter a valid stock value');
      return;
    }
    updateMenuItem(item.id, { ...item, stock: parseInt(stockValue) });
    setEditingId(null);
    setStockValue('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {menu.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 font-semibold">{item.name}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">KSh {item.price}</td>
                <td className="px-6 py-4">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={stockValue}
                      onChange={(e) => setStockValue(e.target.value)}
                      className="w-24 px-3 py-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <span className={item.stock < 10 ? 'text-red-500 font-bold' : 'text-green-600'}>
                      {item.stock}
                      {item.stock < 10 && <AlertTriangle size={16} className="inline ml-1" />}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === item.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateStock(item)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setStockValue('');
                        }}
                        className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setStockValue(item.stock.toString());
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventoryPage;