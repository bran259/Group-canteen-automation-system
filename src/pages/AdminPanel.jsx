import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post("/items", form);
    setForm({ name: "", price: "", quantity: "" });
    const res = await api.get("/items");
    setItems(res.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder="Qty"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-1 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          Add
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center border-t">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
