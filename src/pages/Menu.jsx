import React, { useEffect, useState } from "react";
import api from "../services/api";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data));
  }, []);

  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing)
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    else setCart([...cart, { ...item, quantity: 1 }]);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} addToCart={addToCart} />
      ))}
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}