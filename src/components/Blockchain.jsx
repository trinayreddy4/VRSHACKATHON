import React, { useState } from "react";
import Block from "./Block";
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

  const mineBlock = () => {
    const lastBlock = blocks[blocks.length - 1];
    let nonce = 0;
    let hash = "";

    while (!hash.startsWith("0000")) {
      nonce++;
      hash = calculateHash(blocks.length, lastBlock.hash, "Block " + blocks.length, nonce);
    }

    const newBlock = {
      index: blocks.length,
      previousHash: lastBlock.hash,
      data: "Block " + blocks.length,
      nonce,
      hash,
      isValid: true,
    };

    setBlocks([...blocks, newBlock]);
  };

  const validateChain = () => {
    const isValid = validateBlockchain(blocks);
    setBlocks(blocks.map((block) => ({ ...block, isValid })));
    alert(isValid ? "Blockchain is valid!" : "Blockchain is tampered!");
  };

  return (
    <div className="p-5 space-y-4">
      {blocks.map((block) => (
        <Block key={block.index} block={block} />
      ))}
      <button onClick={mineBlock} className="px-4 py-2 bg-blue-500 text-white rounded">Mine Block</button>
      <button onClick={validateChain} className="px-4 py-2 bg-red-500 text-white rounded">Validate Chain</button>
    </div>
  );
};

export default Blockchain;
