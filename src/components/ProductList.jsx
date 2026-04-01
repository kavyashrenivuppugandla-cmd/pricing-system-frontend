import React, { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");   // default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // ascending by default

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => {
        const unique = Array.isArray(data)
          ? data.filter((item, index, self) =>
            index === self.findIndex(p => p.name === item.name)
          )
          : [];
        setProducts(unique);
      })
      .catch(() => setProducts([]));
  }, []);

  const handleSale = (id) => {
    fetch(`http://localhost:8080/sales?productId=${id}&quantity=1`, { method: "POST" })
      .then(() => window.location.reload());
  };

  const handleInventoryUpdate = (id, newInventory) => {
    fetch(`http://localhost:8080/products/${id}/inventory?inventory=${newInventory}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(updatedProduct => {
        setProducts(products.map(p => p.id === id ? updatedProduct : p));
        if (Number(updatedProduct.inventory) === 0) {
          alert(`Out of stock: ${updatedProduct.name} is now out of stock!`);
        } else if (Number(updatedProduct.inventory) < 2) {
          alert(`Low stock alert: ${updatedProduct.name} has only ${updatedProduct.inventory} left!`);
        }
      })
      .catch(err => console.error("Failed to update inventory", err));
  };

  // Filter products by search term
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products by selected key and order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];

    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="add-product-container" style={{ alignItems: 'flex-start' }}>
      <div className="large-card">
        <h2 className="add-product-header" style={{ textAlign: 'left', marginBottom: '25px', fontSize: '1.6rem' }}>📋 Product Inventory</h2>

        {/* Toolbar */}
        <div className="action-toolbar">
          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="🔍 Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
              style={{ marginBottom: 0 }}
            />
          </div>

          {/* Sort Controls */}
          <div className="toolbar-group">
            <span className="modern-label" style={{ marginBottom: 0, marginRight: '5px' }}>Sort by:</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="modern-select"
            >
              <option value="name">Name</option>
              <option value="basePrice">Base Price</option>
              <option value="inventory">Inventory</option>
              <option value="suggestedPrice">Suggested Price</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="modern-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="modern-table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Base Price</th>
                <th>Inventory</th>
                <th>Suggested Price</th>
                <th>Quick Sell</th>
                <th>Update Inventory</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td><strong>{p.name}</strong></td>
                  <td>₹{p.basePrice}</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: p.inventory <= 1 ? '#ffe3e3' : p.inventory < 5 ? '#fff3cd' : '#e3f2fd',
                      color: p.inventory <= 1 ? '#c0392b' : p.inventory < 5 ? '#856404' : '#1e88e5',
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}>
                      {p.inventory === 0 ? "Out of stock" : p.inventory === 1 ? "1 item left" : `${p.inventory} in stock`}
                    </span>
                  </td>
                  <td>{p.suggestedPrice ? `₹${p.suggestedPrice.toFixed(2)}` : "N/A"}</td>
                  <td>
                    <button
                      className="btn-sm-modern"
                      onClick={() => handleSale(p.id)}
                      disabled={p.inventory === 0}
                      style={{ opacity: p.inventory === 0 ? 0.5 : 1, cursor: p.inventory === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      Sell 1
                    </button>
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={p.inventory}
                      onBlur={(e) => handleInventoryUpdate(p.id, Math.max(0, Number(e.target.value)))}
                      className="modern-input"
                      style={{ width: "90px", padding: "8px 12px", textAlign: 'center' }}
                      min="0"
                    />
                  </td>
                </tr>
              ))}
              {sortedProducts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
