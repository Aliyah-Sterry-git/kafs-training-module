// src/ResourcesDropdown.jsx
import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ResourcesDropdown() {
  const [open, setOpen] = useState(false);

  // Get user data from localStorage to check if admin
  const getUser = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  };

  const user = getUser();
  const isAdmin = user && user.role === 'admin';

  // Use React Router's navigation for better UX
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <div className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-[var(--brand-accent)] transition">
        <FaBook />
        <span>Resources</span>
      </div>

      {/* Dropdown Menu with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-56 bg-[#0b1a3a] border border-white/10 rounded-lg shadow-lg py-2 z-50"
          >
            {/* Admin Dashboard Link - Only for admins */}
            {isAdmin && (
              <div
                onClick={() => navigateTo("/admin")}
                className="px-4 py-2 text-gray-200 hover:bg-purple-500 hover:text-white cursor-pointer rounded-md transition-colors border-l-2 border-purple-500"
              >
                <div className="flex items-center justify-between">
                  <span>Admin Dashboard</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Admin</span>
                </div>
              </div>
            )}

            <div
              onClick={() => navigateTo("/qas-reports")}
              className="px-4 py-2 text-gray-200 hover:bg-[var(--brand-accent)] hover:text-black cursor-pointer rounded-md transition-colors"
            >
              QAS Reports & Policies
            </div>

            <div
              onClick={() => navigateTo("/training-links")}
              className="px-4 py-2 text-gray-200 hover:bg-[var(--brand-accent)] hover:text-black cursor-pointer rounded-md transition-colors"
            >
              Training Links
            </div>

            <div
              onClick={() => navigateTo("/file-saving-format")}
              className="px-4 py-2 text-gray-200 hover:bg-[var(--brand-accent)] hover:text-black cursor-pointer rounded-md transition-colors"
            >
              File Saving Format
            </div>

            {/* Show admin status in dropdown */}
            {isAdmin && (
              <div className="px-4 py-2 border-t border-white/10 mt-2">
                <div className="text-xs text-purple-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Administrator Access
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}