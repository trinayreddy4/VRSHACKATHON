import React, { useState } from "react";

const TransactionPool = ({ transactions, setTransactions }) => {
  const [newTransaction, setNewTransaction] = useState("");

  const handleAddTransaction = () => {
    if (newTransaction.trim() === "") {
      alert("Please enter a valid transaction.");
      return;
    }

    setTransactions([...transactions, newTransaction.trim()]);
    setNewTransaction("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <h2 className="text-xl font-bold">Transaction Pool</h2>
      <div className="space-y-2">
        <textarea
          className="w-full p-2 border rounded-lg"
          rows="4"
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
          placeholder="Enter new transaction data"
        ></textarea>
        <button
          onClick={handleAddTransaction}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
        >
          Add Transaction
        </button>
      </div>

      <div className="space-y-2 mt-4">
        <h3 className="font-bold">Pending Transactions:</h3>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <li key={index} className="text-sm p-2 bg-gray-100 rounded-md">
                {tx}
              </li>
            ))
          ) : (
            <li>No transactions in the pool</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionPool;
