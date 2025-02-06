import React from "react";
import { motion } from "framer-motion";

const Block = ({ block, isModifiedAfter }) => {
  // Conditional color class for modified blocks
  let blockColorClass = "bg-green-300"; // default valid block color
  if (block.isValid === false) {
    blockColorClass = "bg-red-300"; // tampered block color
  } else if (isModifiedAfter) {
    blockColorClass = "bg-orange-300"; // subsequent block color (after modification)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-4 rounded-lg shadow-lg border ${blockColorClass}`}
    >
      <h3 className="font-bold text-wrap">Block #{block.index}</h3>
      <p><strong>Nonce:</strong> {block.nonce}</p>
      <p><strong>Data:</strong> {block.data}</p>
      <p
        className="break-all"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <strong>Previous Hash:</strong> {block.previousHash}
      </p>
      <p
        className="break-all"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <strong>Hash:</strong> {block.hash}
      </p>
      {!block.isValid && (
        <p className="text-red-600 font-semibold mt-2">This block is tampered!</p>
      )}
    </motion.div>
  );
};

export default Block;
