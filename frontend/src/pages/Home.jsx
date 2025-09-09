// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [books, setBooks] = useState([]);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const { data } = await api.get("/books");
      setBooks(data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch books");
    }
  }

  async function handleAddToCart(bookId) {
    try {
      await api.post("/cart/add", { book_id: bookId, quantity: 1 });
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Add to cart failed");
    }
  }

  return (
    <div className="container mt-4">
      <h3>Storefront</h3>
      <div className="row g-3 mt-2">
        {books.length === 0 && <p>No books yet.</p>}
        {books.map((b) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={b.id}>
            <BookCard book={b} onAddToCart={handleAddToCart} showAddToCart={role === "buyer"} />
          </div>
        ))}
      </div>
    </div>
  );
}
