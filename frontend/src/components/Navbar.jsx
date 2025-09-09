import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">📚 Bookstore</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          ) : (
            <>
              {role === "buyer" && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                </>
              )}
              {role === "seller" && (
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              )}
              <li className="nav-item">
                <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
