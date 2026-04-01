import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import PricingDashboard from "./components/PricingDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="app-sidebar">
          <div className="sidebar-header">
            <h2 className="logo-title">💰 PricePro</h2>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/">Add Product (Home)</Link>
              </li>
              <li>
                <Link to="/products">Products List</Link>
              </li>
              <li>
                <Link to="/analytics">Pricing Analytics</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="app-main">
          {/* Header */}
          <header className="app-header">
            <h1>Dynamic Pricing Recommendation System</h1>
          </header>
          {/* Main Content Area */}
          <main className="app-content">
            <Routes>
              <Route path="/" element={<AddProduct />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/analytics" element={<PricingDashboard />} />
            </Routes>
          </main>
          {/* Footer */}
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} PricePro. All rights reserved. Version 1.0.0</p>
          </footer>
        </div>
      </div>
    </Router>
    <div>
      <h1 className="text-center mt-3">
        Dynamic Pricing Recommendation System
      </h1>
      <Router>
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/analytics" element={<PricingDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
