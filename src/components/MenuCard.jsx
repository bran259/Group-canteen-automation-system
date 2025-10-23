import React from "react";
import "./MenuCard.css";

export default function MenuCard({ item, addToCart }) {
  return (
    <div className="border rounded-lg p-3 shadow-md hover:shadow-lg transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
      <p className="text-gray-600 text-sm">{item.description}</p>
      <p className="font-bold text-green-600 mt-1">Ksh {item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
