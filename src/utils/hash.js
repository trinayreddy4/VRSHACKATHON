import CryptoJS from "crypto-js";

export function calculateHash(index, previousHash, data, nonce) {
  return CryptoJS.SHA256(
    index + previousHash + JSON.stringify(data) + nonce
  ).toString();
}
