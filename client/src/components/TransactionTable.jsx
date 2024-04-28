import React, { useState, useEffect } from "react";

export default function TransactionTable({ selectedMonth }) {
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const queryParams = new URLSearchParams({
          searchText,
          month: selectedMonth,
        }).toString();

        const response = await fetch(
          `http://localhost:3001/list-transactions?${queryParams}`
        );

        const data = await response.json();
        setTransactions(data.data);
        setTotalTransactions(data.data.length);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [searchText, selectedMonth]);

  const handleSearch = (e) => {
    setSearchText(e.target.value.trim());
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = Array.isArray(transactions)
    ? transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    : [];

  return (
    <div>
      <h2>Transactions Table</h2>
      <div>
        <input
          type="text"
          placeholder="Search Transaction"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <table style={{ marginTop: "10px " }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px " }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastTransaction >= totalTransactions}
        >
          Next
        </button>
      </div>
    </div>
  );
}
