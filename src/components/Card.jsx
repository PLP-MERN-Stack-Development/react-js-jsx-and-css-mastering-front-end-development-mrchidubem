import React from "react";

export default function Card({ children, title }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
}
