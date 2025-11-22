import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 mt-8 border-t dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} PLP React • Built with React + Tailwind
      </div>
    </footer>
  );
}
