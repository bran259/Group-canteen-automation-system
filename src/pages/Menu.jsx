import React, { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";
import Carts from "../components/Carts";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error loading menu:", err));
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">🍔 Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menu.map((item) => (
          <MenuCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
      <Carts cart={cart} setCart={setCart} />
    </div>
  );
}