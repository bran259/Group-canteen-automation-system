// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     api.get("/orders").then((res) => setOrders(res.data));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//       {orders.map((order) => (
//         <div key={order.id} className="border p-4 rounded mb-3">
//           <p>Order #{order.id}</p>
//           <p>Status: {order.status}</p>
//           <p>Total: ₱{order.totalAmount}</p>
//           <ul className="list-disc pl-4">
//             {order.Items?.map((item) => (
//               <li key={item.id}>{item.name}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch("http://localhost:4000/orders")
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