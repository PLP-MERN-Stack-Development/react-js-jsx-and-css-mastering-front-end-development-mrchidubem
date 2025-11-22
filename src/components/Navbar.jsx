import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-xl">PLP React</Link>
          <Link to="/tasks" className="text-sm">Tasks</Link>
          <Link to="/api" className="text-sm">API Data</Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="px-3 py-1 rounded border">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
