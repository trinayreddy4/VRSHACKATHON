import React from "react";
import { motion } from "framer-motion";

const Mining = ({ miningProgress }) => {
  return (
    <div className="p-5">
      <h2 className="text-lg font-bold">Mining Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <motion.div
          className="bg-blue-500 h-6 rounded-full text-white text-center"
          initial={{ width: "0%" }}
          animate={{ width: `${miningProgress}%` }}
          transition={{ duration: 0.1 }}
        >
          {miningProgress}%
        </motion.div>
      </div>
    </div>
  );
};

export default Mining;
