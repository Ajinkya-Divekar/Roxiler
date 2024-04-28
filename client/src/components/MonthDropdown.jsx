// Dropdown component
import React from "react";

function MonthDropdown({ selectedMonth, onMonthChange }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <label>Select Month:</label>
      <select value={selectedMonth} onChange={onMonthChange}>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthDropdown;
