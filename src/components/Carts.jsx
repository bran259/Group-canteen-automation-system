import React from "react";

export default function Carts({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty!");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return alert("Please login first!");

    const order = {
      userId: user.id,
      date: new Date().toISOString(),
      status: "Pending",
      totalAmount: total,
    };

    const res = await fetch("https://json-server-vercel-21sz.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const orderData = await res.json();

    for (const item of cart) {
      await fetch("https://json-server-vercel-21sz.vercel.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.id,
          itemId: item.id,
          quantity: item.quantity,
        }),
      });
    }

    alert("Order placed successfully!");
    setCart([]);
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white border p-4 rounded shadow w-72">
      <h3 className="font-bold mb-2">🛍️ Cart</h3>
      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-1">
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