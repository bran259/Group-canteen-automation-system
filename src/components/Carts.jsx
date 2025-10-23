import React from "react";
import api from "../services/api";

export default function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    const payload = {
      items: cart.map((c) => ({ itemId: c.id, quantity: c.quantity })),
    };
    try {
      const res = await api.post("/orders", payload);
      alert("Order placed successfully! Order ID: " + res.data.orderId);
      setCart([]);
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white border p-4 rounded-lg shadow-lg w-72">
      <h3 className="font-bold mb-2"> Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-1"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₱{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="font-bold mt-2">Total: ₱{total}</div>
          <button
            onClick={placeOrder}
            className="mt-2 w-full bg-green-600 text-white py-1 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
