import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export default function PieChartEx({ selectedMonth }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/pie-chart?month=${selectedMonth}`
        );
        const data = await response.json();
        setChartData(data.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div>
      <h3>Transactions Pie Chart</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="itemCount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // You can add more colors if needed
