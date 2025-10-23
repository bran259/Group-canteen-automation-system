import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch("https://json-server-vercel-21sz.vercel.app/")
      .then((res) => res.json())
      .then((data) => {
        const userOrders = data.filter((o) => o.userId === user?.id);
        setOrders(userOrders);
      })
      .catch((err) => console.error("Error loading orders:", err));
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">📦 My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded mb-3 bg-white shadow"
            >
              <p>
                <strong>Date:</strong> {new Date(order.date).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ₱{order.totalAmount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}