import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded mb-3">
          <p>Order #{order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₱{order.totalAmount}</p>
          <ul className="list-disc pl-4">
            {order.OrderDetails?.map((d) => (
              <li key={d.id}>
                {d.Item?.name} x {d.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
