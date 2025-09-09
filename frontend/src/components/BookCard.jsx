import React from "react";

export default function BookCard({ book, onAddToCart, showAddToCart = false }) {
  return (
    <div className="card h-100">
      <img
        src={book.image_url || "https://via.placeholder.com/300x180?text=Book"}
        className="card-img-top"
        alt={book.title}
        style={{ objectFit: "cover", height: 180 }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text text-truncate">{book.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹{book.price}</strong>
          {showAddToCart && (
            <button className="btn btn-sm btn-primary" onClick={() => onAddToCart(book.id)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
