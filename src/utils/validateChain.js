import { calculateHash } from "./hash";

export function validateBlockchain(blocks) {
  for (let i = 1; i < blocks.length; i++) {
    const prevBlock = blocks[i - 1];
    const currBlock = blocks[i];

    if (currBlock.previousHash !== prevBlock.hash) {
      return false;
    }

    if (
      currBlock.hash !==
      calculateHash(
        currBlock.index,
        currBlock.previousHash,
        currBlock.data,
        currBlock.nonce
      )
    ) {
      return false;
    }
  }
  return true;
}
