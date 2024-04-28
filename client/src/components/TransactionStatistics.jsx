import React, { useState, useEffect } from "react";

function TransactionStatistics({ selectedMonth }) {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/statistics?month=${selectedMonth}`
        );
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div>
      <h3>Transactions Statistics</h3>
      <div>
        <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
}

export default TransactionStatistics;
