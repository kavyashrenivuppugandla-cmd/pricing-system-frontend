import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Auto-categorization function
function getCategory(productName) {
  if (!productName || typeof productName !== "string") {
    return "Miscellaneous"; // fallback if name is missing
  }

  const name = productName.toLowerCase();

  const keywordMap = {
    Electronics: ["laptop", "ipad", "mobile", "headset", "tv", "ac"],
    Fashion: ["shoes", "shirt", "jeans", "dress"],
    Groceries: ["milk", "bread", "chocolate", "rice"],
    Furniture: ["table", "chair", "sofa", "bed"],
  };

  for (const category in keywordMap) {
    if (keywordMap[category].some(keyword => name.includes(keyword))) {
      return category;
    }
  }

  return "Miscellaneous"; // anything else goes here
}

function PricingDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(products => {
        const categoryMap = {};

        products.forEach(p => {
          const category = getCategory(p.name);
          const revenue = (p.suggestedPrice || p.basePrice) * p.inventory;
          categoryMap[category] = (categoryMap[category] || 0) + revenue;
        });

        // Filter and map to chart data
        const chartData = Object.keys(categoryMap)
          .filter(cat => cat !== "Miscellaneous")
          .map(cat => ({
            name: cat,
            value: categoryMap[cat]
          }));

        setData(chartData);
      })
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  const COLORS = ["#46be9c", "#5328ff", "#ff6842", "#ee1023", "#2ca02c", "#d62728"];

  return (
    <div className="add-product-container">
      <div className="large-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="add-product-header" style={{ marginBottom: '30px', textAlign: 'center' }}>📊 Pricing Analytics Dashboard</h2>
        <PieChart width={700} height={500}>
          <Pie
            data={data}
            cx={350}
            cy={250}
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default PricingDashboard;
