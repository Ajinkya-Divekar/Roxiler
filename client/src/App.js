import "./App.css";
import TransactionTable from "./components/TransactionTable";
import { useState } from "react";
import MonthDropdown from "./components/MonthDropdown";
import TransactionStatistics from "./components/TransactionStatistics";
import BarChartEx from "./components/BarChart";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("March");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Transactions Dashboard</h1>

        <MonthDropdown
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <TransactionTable selectedMonth={selectedMonth} />
        <div className="dashboard-section" style={{ marginTop: "10px " }}>
          <div className="dashboard-section-left">
            <TransactionStatistics selectedMonth={selectedMonth} />
          </div>
          <div className="dashboard-section-right">
            <BarChartEx selectedMonth={selectedMonth}></BarChartEx>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
