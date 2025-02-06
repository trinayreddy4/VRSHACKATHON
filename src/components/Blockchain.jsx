import React, { useState } from "react";
import Block from "./Block";
import TransactionPool from "./TransactionPool";
import Mining from "./Mining";
import { calculateHash } from "../utils/hash";
import { validateBlockchain } from "../utils/validateChain";

const Blockchain = () => {
  const [blocks, setBlocks] = useState([
    {
      index: 0,
      previousHash: "0",
      data: "Genesis Block",
      nonce: 0,
      hash: calculateHash(0, "0", "Genesis Block", 0),
      isValid: true,
    },
  ]);

  const [transactions, setTransactions] = useState([]);
  const [miningProgress, setMiningProgress] = useState(0);
  const [isMining, setIsMining] = useState(false);

const mineBlock = async () => {
  if (transactions.length === 0) {
    alert("No transactions to mine!");
    return;
  }

  setIsMining(true);
  const lastBlock = blocks[blocks.length - 1];
  let nonce = 0;
  let hash = "";
  let progress = 0;

  let miningInterval = setInterval(() => {
    if (hash.startsWith("00")) {
      clearInterval(miningInterval); 

      const newBlock = {
        index: blocks.length,
        previousHash: lastBlock.hash,
        data: transactions.join(", "),
        nonce,
        hash,
        isValid: true,
      };

      setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
      setTransactions([]); 
      setMiningProgress(0);
      setIsMining(false);
    } else {
      nonce++;
      hash = calculateHash(blocks.length, lastBlock.hash, transactions.join(", "), nonce);

      progress = Math.min(100, Math.floor((nonce / 5000) * 100));
      
      setMiningProgress(progress);
      console.log(nonce, hash, progress);
    }
  }, 100);

};





  const validateChain = () => {
    const isValid = validateBlockchain(blocks);
    setBlocks(blocks.map((block) => ({ ...block, isValid })));
    alert(isValid ? "Blockchain is valid!" : "Blockchain is tampered!");
  };

  return (
    <div className="p-5 space-y-4">
      <TransactionPool transactions={transactions} setTransactions={setTransactions} />
      <Mining miningProgress={miningProgress} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block) => (
          <Block key={block.index} block={block} />
        ))}
      </div>
      <div className="flex space-x-3">
        <button
          onClick={mineBlock}
          className={`px-4 py-2 text-white font-bold rounded-lg shadow ${
            isMining ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isMining}
        >
          {isMining ? "Mining..." : "Mine Block"}
        </button>
        <button
          onClick={validateChain}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow"
        >
          Validate Chain
        </button>
      </div>
    </div>
  );
};

export default Blockchain;
