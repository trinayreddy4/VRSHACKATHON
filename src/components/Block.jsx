import React from "react";
import { motion } from "framer-motion";

const Block = ({ block }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-4 rounded-lg shadow-lg border  ${
        block.isValid ? "bg-green-300" : "bg-red-300"
      }`}
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
      ><strong>Previous Hash:</strong> {block.previousHash}</p>
      <p
        className="break-all"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <strong>Hash:</strong> {block.hash}
      </p>
    </motion.div>
  );
};

export default Block;
