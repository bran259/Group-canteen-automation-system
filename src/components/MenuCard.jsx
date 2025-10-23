import React from "react";

export default function MenuCard({ item, addToCart }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{item.name}</h2>
      <p>{item.description}</p>
      <p className="font-semibold text-green-600">₱{item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
