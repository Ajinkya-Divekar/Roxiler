import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function BarChartEX({ selectedMonth }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/bar-chart?month=${selectedMonth}`
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
      <h3>Transactions Bar Chart</h3>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priceRange" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="itemCount" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
