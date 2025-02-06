import React from "react";

const Mining = ({ miningProgress }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Mining Progress</h2>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${miningProgress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-center text-sm">
          {miningProgress === 100 ? "Block Mined!" : `${miningProgress}%`}
        </div>
      </div>
    </div>
  );
};

export default Mining;
