import React from "react";

export default function MenuCard({ item, addToCart }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="font-bold text-lg">{item.name}</h2>
      <p>{item.description}</p>
      <p className="text-green-600">₱{item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
