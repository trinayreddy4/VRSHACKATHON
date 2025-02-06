import React, { useState } from "react";
import Block from "./Block";
import TransactionPool from "./TransactionPool";
import Mining from "./Mining";
import { calculateHash } from "../utils/hash";  // Adjust the import path for calculateHash

const Blockchain = () => {
  const validateBlockchain = (blocks) => {
  for (let i = 1; i < blocks.length; i++) {
    const currentBlock = blocks[i];
    const previousBlock = blocks[i - 1];

    // Check if the hash is valid
    if (currentBlock.hash !== calculateHash(currentBlock.index, currentBlock.previousHash, currentBlock.data, currentBlock.nonce)) {
      currentBlock.isValid = false; // Mark the block as invalid
      return false; // Blockchain is invalid if any block is tampered
    }

    // Check if the previous hash is correct
    if (currentBlock.previousHash !== previousBlock.hash) {
      currentBlock.isValid = false; // Mark the block as invalid
      return false; // Blockchain is invalid if the previous hash is incorrect
    }
  }
  
  // If all blocks are valid
  return true;
};

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

  // Mine a new block
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
      hash = calculateHash(blocks.length, lastBlock.hash, transactions.join(", "), nonce);

      if (hash.startsWith("0")) {
        clearInterval(miningInterval);

        const newBlock = {
          index: blocks.length,
          previousHash: lastBlock.hash,
          data: transactions.join(", "),
          nonce,
          hash,
          isValid: true,
        };

        // Add the new block to the chain
        const updatedBlocks = [...blocks, newBlock];
        setBlocks(updatedBlocks); // Revalidate the entire chain after mining

        setTransactions([]);
        setMiningProgress(0);
        setIsMining(false);
      } else {
        nonce++;
        progress = Math.min(100, Math.floor((nonce / 5000) * 100));
        setMiningProgress(progress);
      }
    }, 100);
  };

  // Modify block data
  const modifyBlockData = (index, newData) => {
    const updatedBlocks = [...blocks];
    const blockToModify = updatedBlocks[index];
    blockToModify.data = newData;
    blockToModify.hash = calculateHash(blockToModify.index, blockToModify.previousHash, blockToModify.data, blockToModify.nonce);
    blockToModify.isValid = false;

    // Mark subsequent blocks as modified
    for (let i = index + 1; i < updatedBlocks.length; i++) {
      updatedBlocks[i].isModifiedAfter = true; // Add flag for subsequent blocks
    }

    const updatedChain = updatedBlocks.map((block, i) => {
      if (i > index) {
        block.previousHash = updatedBlocks[i - 1].hash;
        block.hash = calculateHash(block.index, block.previousHash, block.data, block.nonce);
      }
      return block;
    });

    setBlocks(updatedChain);
  };

  // Validate blockchain
  const validateChain = () => {
    const isValid = validateBlockchain(blocks);
    
    setBlocks(
      blocks.map((block) => ({
        ...block,
        isValid:  true, 
        isModifiedAfter:false,// set isValid for each block
      }))
    );

    alert(isValid ? "Blockchain is validating!" : "Blockchain is tampered!");
  };

  return (
    <div className="p-5 space-y-4">
      <TransactionPool transactions={transactions} setTransactions={setTransactions} />
      <Mining miningProgress={miningProgress} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block, index) => (
          <div key={block.index}>
            <Block block={block} isModifiedAfter={block.isModifiedAfter} />
            <div className="mt-2">
              <input
                type="text"
                value={block.data}
                onChange={(e) => modifyBlockData(index, e.target.value)}
                className="px-4 py-2 text-black bg-gray-100 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-3">
        <button
          onClick={mineBlock}
          className={`px-4 py-2 text-white font-bold rounded-lg shadow ${isMining ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
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
