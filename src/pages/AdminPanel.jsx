// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function AdminPanel() {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({ name: "", price: "", quantity: "" });

//   useEffect(() => {
//     api.get("/items").then((res) => setItems(res.data));
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     await api.post("/items", form);
//     setForm({ name: "", price: "", quantity: "" });
//     const res = await api.get("/items");
//     setItems(res.data);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border p-1 rounded"
//         />
//         <input
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           className="border p-1 rounded"
//         />
//         <input
//           placeholder="Qty"
//           value={form.quantity}
//           onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//           className="border p-1 rounded"
//         />
//         <button className="bg-blue-600 text-white px-4 py-1 rounded">
//           Add
//         </button>
//       </form>

//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Qty</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id} className="text-center border-t">
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.price}</td>
//               <td>{item.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    const data = await res.json();
    setMenu([...menu, data]);
    setNewItem({ name: "", description: "", price: "" });
  };

  const deleteItem = async (id) => {
    await fetch`(http://localhost:4000/menu/${id}, { method: "DELETE" });`
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