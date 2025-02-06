import React, { useState } from "react";
import Blockchain from "./components/Blockchain";
import { FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      <header className="p-5 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Interactive Blockchain Simulator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </header>
      <Blockchain />
    </div>
  );
};

export default App;
