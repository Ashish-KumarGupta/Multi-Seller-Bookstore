// src/pages/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function SellerDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    fetchMyBooks();
  }, []);

  async function fetchMyBooks() {
    try {
      const { data } = await api.get("/books/my-books");
      setMyBooks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your books");
    }
  }

  async function handleAddBook(e) {
    e.preventDefault();
    try {
      await api.post("/books/add", {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock || "0"),
        image_url: imageUrl,
      });
      toast.success("Book added");
      setTitle(""); setDescription(""); setPrice(""); setStock(""); setImageUrl("");
      fetchMyBooks();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Add book failed");
    }
  }

  return (
    <div className="container mt-4">
      <h3>Seller Dashboard</h3>

      <div className="card p-3 mt-3">
        <h5>Add a Book</h5>
        <form onSubmit={handleAddBook} className="row g-2">
          <div className="col-md-6">
            <input className="form-control" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="Stock" value={stock} onChange={(e)=>setStock(e.target.value)} />
          </div>
          <div className="col-12">
            <input className="form-control" placeholder="Image URL" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
          </div>
          <div className="col-12">
            <textarea className="form-control" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
          </div>
          <div className="col-12">
            <button className="btn btn-success">Add Book</button>
          </div>
        </form>
      </div>

      <div className="mt-4">
        <h5>Your Books</h5>
        <div className="row g-3">
          {myBooks.length === 0 && <p>No books added yet.</p>}
          {myBooks.map((b) => (
            <div key={b.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <img src={b.image_url || "https://via.placeholder.com/300x180?text=Book"} className="card-img-top" alt={b.title} style={{height:180,objectFit:"cover"}} />
                <div className="card-body d-flex flex-column">
                  <h6>{b.title}</h6>
                  <p className="text-truncate">{b.description}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <strong>₹{b.price}</strong>
                    <span className="badge bg-secondary">{b.stock} in stock</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
