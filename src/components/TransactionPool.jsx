import React, { useState } from "react";

const TransactionPool = ({ transactions, setTransactions }) => {
  const [newTransaction, setNewTransaction] = useState("");

  const addTransaction = () => {
    if (newTransaction.trim() === ""){
        alert("The Transaction must have some data");
        return ;
    }
    setTransactions([...transactions, newTransaction]);
    setNewTransaction("");
  };

  return (
    <div className="p-5 bg-gray-100 rounded shadow-md">
      <h2 className="text-lg font-bold">Transaction Pool</h2>
      <input
        type="text"
        placeholder="Enter transaction"
        value={newTransaction}
        onChange={(e) => setNewTransaction(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={addTransaction} className="px-4 py-2 bg-green-500 text-white rounded">
        Add Transaction
      </button>
      <ul className="mt-3">
        {transactions.map((tx, index) => (
          <li key={index} className="bg-white p-2 rounded mt-2 shadow">
            {tx}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionPool;
