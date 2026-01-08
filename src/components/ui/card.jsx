import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl bg-gray-800 border border-gray-700 shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
