// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const { data } = await api.get("/cart"); // absolute path
      setItems(data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch cart");
    }
  }

  async function placeOrder(item) {
    try {
      await api.post("/orders/place", { book_id: item.book.id, quantity: item.quantity });
      toast.success("Order placed");
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Order failed");
    }
  }

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {items.length === 0 && <p>Your cart is empty.</p>}
      <div className="list-group">
        {items.map((ci) => (
          <div key={ci.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{ci.book.title}</strong>
              <div>Qty: {ci.quantity}</div>
              <div>Price: ₹{ci.book.price}</div>
            </div>
            <div className="d-flex flex-column align-items-end">
              <div><strong>Subtotal: ₹{(ci.book.price * ci.quantity).toFixed(2)}</strong></div>
              <button className="btn btn-sm btn-success mt-2" onClick={() => placeOrder(ci)}>Place Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
