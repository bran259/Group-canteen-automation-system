import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminMenuPage = () => {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem } = useAppContext();
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', stock: ''
  });

  const handleAdd = () => {
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      alert('Please fill all fields');
      return;
    }
    addMenuItem({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: '/images/default.jpg'
    });
    setFormData({ name: '', price: '', category: '', stock: '' });
    setShowAddForm(false);
  };

  const handleUpdate = () => {
    updateMenuItem(editingItem.id, {
      ...editingItem,
      price: parseFloat(editingItem.price),
      stock: parseInt(editingItem.stock)
    });
    setEditingItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Item</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
            {editingItem?.id === item.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={editingItem.stock}
                  onChange={(e) => setEditingItem({ ...editingItem, stock: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.category}</p>
                <p className="text-lg font-bold text-orange-500 mb-2">KSh {item.price}</p>
                <p className={`text-sm mb-4 ${item.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  Stock: {item.stock}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${item.name}?`)) {
                        deleteMenuItem(item.id);
                      }
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenuPage;