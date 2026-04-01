import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

<<<<<<< HEAD
// Auto-categorization function
=======
// ✅ Auto-categorization function
>>>>>>> 882b4c8 (first commit)
function getCategory(productName) {
  if (!productName || typeof productName !== "string") {
    return "Miscellaneous";
  }

  const name = productName.toLowerCase();

  const keywordMap = {
<<<<<<< HEAD
    Electronics: ["laptop", "ipad", "mobile", "headset", "tv", "ac"],
    Fashion: ["shoes", "shirt", "jeans", "dress"],
    Groceries: ["milk", "bread", "chocolate", "rice"],
    Furniture: ["table", "chair", "sofa", "bed"],

=======
    Electronics: ["laptop", "ipad", "mobile", "headset", "tv"],
    Fashion: ["shoes", "shirt", "jeans", "dress"],
    Groceries: ["milk", "bread", "chocolate", "rice"],
    Furniture: ["table", "chair", "sofa", "bed"]
>>>>>>> 882b4c8 (first commit)
  };

  for (const category in keywordMap) {
    if (keywordMap[category].some(keyword => name.includes(keyword))) {
      return category;
    }
  }

  return "Miscellaneous";
}

function DailySalesDashboard() {
  const [data, setData] = useState([]);

  // Fetch sales data
  const fetchSales = () => {
    fetch("http://localhost:8080/sales")
      .then(res => res.json())
      .then(sales => {
        const dayMap = {};

        sales.forEach(s => {
          const key = s.date;
          if (!dayMap[key]) {
            dayMap[key] = { date: key };
          }
          const category = getCategory(s.product);
<<<<<<< HEAD
          // Count items sold category-wise
=======
          // ✅ Count items sold category-wise
>>>>>>> 882b4c8 (first commit)
          dayMap[key][category] = (dayMap[key][category] || 0) + s.quantity;
        });

        setData(Object.values(dayMap));
      })
      .catch(err => console.error("Failed to fetch sales", err));
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Handle Sell button click
  const handleSell = (product) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    axios.post("http://localhost:8080/sales/sell", {
      date: today,
      product: product,
      quantity: 1
    })
<<<<<<< HEAD
      .then(() => {
        fetchSales(); // refresh chart after sale
      })
      .catch(err => {
        console.error("Error updating sale:", err);
      });
=======
    .then(() => {
      fetchSales(); // refresh chart after sale
    })
    .catch(err => {
      console.error("Error updating sale:", err);
    });
>>>>>>> 882b4c8 (first commit)
  };

  return (
    <div className="container mt-3">
      <h3>Daily Sales Dashboard (Category-wise Counts)</h3>

      {/* Sell Buttons for Products */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleSell("Laptop")}>Sell Laptop</button>
        <button onClick={() => handleSell("Shoes")}>Sell Shoes</button>
        <button onClick={() => handleSell("Headset")}>Sell Headset</button>
        <button onClick={() => handleSell("Ipad")}>Sell Ipad</button>
        <button onClick={() => handleSell("Dairy Milk")}>Sell Dairy Milk</button>
        <button onClick={() => handleSell("Table")}>Sell Table</button>
<<<<<<< HEAD
        <button onClick={() => handleSell("Pen")}>Sell Pen</button>
=======
>>>>>>> 882b4c8 (first commit)
      </div>

      {/* Bar Chart grouped by category */}
      <BarChart width={900} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Electronics" fill="#0088FE" />
        <Bar dataKey="Fashion" fill="#00C49F" />
        <Bar dataKey="Groceries" fill="#FFBB28" />
        <Bar dataKey="Furniture" fill="#FF8042" />
<<<<<<< HEAD

=======
        <Bar dataKey="Miscellaneous" fill="#aa46be" />
>>>>>>> 882b4c8 (first commit)
      </BarChart>
    </div>
  );
}

export default DailySalesDashboard;
