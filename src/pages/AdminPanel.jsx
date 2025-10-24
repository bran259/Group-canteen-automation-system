import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });
//load menu
  useEffect(() => {
    fetch("https://json-server-vercel-21sz.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

//Add new item
  const handleAddItem = async (e) => {
    e.preventDefault();

    const res = await fetch("https://json-server-vercel-21sz.vercel.app/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    const data = await res.json();
    setMenu([...menu, data]);
    setNewItem({ name: "", description: "", price: "" });
  };
//delete items
  const deleteItem = async (id) => {
    await fetch`(https://json-server-vercel-21sz.vercel.app/menu/${id}, { method: "DELETE" });`
    setMenu(menu.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">👩‍💼 Admin Panel</h1>

      <form onSubmit={handleAddItem} className="mb-6">
        <input
          type="text"
          placeholder="Item name"
          className="border p-2 mr-2 rounded"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2 rounded"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 mr-2 rounded w-24"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <button className="bg-green-600 text-white px-3 py-1 rounded">
          Add Item
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
      <ul>
        {menu.map((item) => (
          <li
            key={item.id}
            className="border p-3 rounded mb-2 flex justify-between bg-white"
          >
            <span>
              {item.name} - ₱{item.price}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}