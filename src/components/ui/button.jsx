import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-500 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
