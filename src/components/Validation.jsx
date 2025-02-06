// src/utils/validation.js

import { calculateHash } from "../utils/hash";

// Function to validate the entire blockchain
export const validateBlockchain = (blocks) => {
  for (let i = 1; i < blocks.length; i++) {
    const currentBlock = blocks[i];
    const previousBlock = blocks[i - 1];

    // Check if the current block's hash matches the hash calculated from the data
    if (currentBlock.hash !== calculateHash(currentBlock.index, currentBlock.previousHash, currentBlock.data, currentBlock.nonce)) {
      return false; // Block is invalid
    }

    // Check if the current block's previousHash matches the previous block's hash
    if (currentBlock.previousHash !== previousBlock.hash) {
      return false; // Chain is broken
    }
  }
  return true; // Blockchain is valid
};

// Function to revalidate the blockchain after a new block is added or modified
export const revalidateChain = (blocks) => {
  const updatedBlocks = blocks.map((block, index) => {
    const isValid = index === 0 ? true : validateBlockchain([blocks[index - 1], block]); // Validate only after the first block
    return {
      ...block,
      isValid,
    };
  });
  return updatedBlocks;
};
