import React from "react";

const Block = ({ block, onModify }) => {
  return (
    <div className={`p-4 border-2 rounded-lg shadow-lg ${block.isValid ? "bg-green-200" : "bg-red-200"}`}>
      <p><strong>Block #{block.index}</strong></p>
      <p><strong>Nonce:</strong> {block.nonce}</p>
      <p><strong>Data:</strong> <input type="text" value={block.data} onChange={(e) => onModify(e, block.index)} /></p>
      <p><strong>Previous Hash:</strong> {block.previousHash}</p>
      <p><strong>Hash:</strong> {block.hash}</p>
    </div>
  );
};

export default Block;
