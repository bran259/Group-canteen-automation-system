// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import MenuCard from "../components/MenuCard";
// import Cart from "../components/Carts";

// export default function Menu() {
//   const [items, setItems] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     api.get("/items").then((res) => setItems(res.data));
//   }, []);

//   const addToCart = (item) => {
//     const existing = cart.find((c) => c.id === item.id);
//     if (existing)
//       setCart(
//         cart.map((c) =>
//           c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
//         )
//       );
//     else setCart([...cart, { ...item, quantity: 1 }]);
//   };

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {items.map((item) => (
//         <MenuCard key={item.id} item={item} addToCart={addToCart} />
//       ))}
//       <Cart cart={cart} setCart={setCart} />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";
import Carts from "../components/Carts";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/menu")
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