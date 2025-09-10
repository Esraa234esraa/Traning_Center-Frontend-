import React from "react";
import { Link } from "react-router-dom";

export const ActionButton = ({ to, onClick, color, children }) => {
  const baseStyle = "px-2 py-1 text-sm font-medium transition hover:underline";

  const colorClasses = {
    blue: "text-blue-600 hover:text-blue-800",
    red: "text-red-600 hover:text-red-800",
    green: "text-green-600 hover:text-green-800",
  };

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${colorClasses[color]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${colorClasses[color]}`}>
      {children}
    </button>
  );
};
