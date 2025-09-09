// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const role = localStorage.getItem("role") || "";

  useEffect(() => {
    if (role === "seller") fetchSellerOrders();
    // if you later want buyer orders, you can implement /orders/buyer endpoint
  }, [role]);

  async function fetchSellerOrders() {
    try {
      const { data } = await api.get("/orders/seller");
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to load orders");
    }
  }

  async function updateStatus(orderId, status) {
    try {
      await api.put("/orders/update", { order_id: orderId, status });
      toast.success("Order updated");
      fetchSellerOrders();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  }

  if (role !== "seller") {
    return (
      <div className="container mt-4">
        <h3>Orders</h3>
        <p>Buyers can place orders from Cart. Sellers can view orders here.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Seller Orders</h3>
      {orders.length === 0 && <p>No orders yet.</p>}
      <div className="list-group">
        {orders.map((o) => (
          <div key={o.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{o.book?.title || "—"}</strong>
              <div>Buyer ID: {o.buyer_id}</div>
              <div>Status: {o.status}</div>
            </div>
            <div>
              {o.status !== "Shipped" && (
                <button className="btn btn-sm btn-primary" onClick={() => updateStatus(o.id, "Shipped")}>Mark Shipped</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
