// src/components/FileExplorer.jsx
import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FileItem = ({ name, type = "file", children, defaultOpen = false, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isFolder = type === "folder";

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect?.(name);
    }
  };

  return (
    <div className="ml-4">
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
          isFolder ? 'hover:bg-white/10' : 'hover:bg-blue-500/20'
        }`}
        onClick={handleClick}
      >
        {isFolder && (
          <span className="text-xs text-gray-400">
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
        
        <span className="text-gray-300">
          {isFolder ? (
            isOpen ? <FaFolderOpen className="text-blue-400" /> : <FaFolder className="text-blue-400" />
          ) : (
            <FaFile className="text-gray-400" />
          )}
        </span>
        
        <span className={`${isFolder ? 'text-blue-300' : 'text-gray-200'} select-none font-["Inter"]`}>
          {name}
        </span>
      </div>

      <AnimatePresence>
        {isFolder && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FileExplorer({ onFileSelect }) {
  return (
    <div className="bg-gradient-to-br from-[#0d1b36] to-[#1a365d] border border-white/10 rounded-xl p-4 font-mono text-sm shadow-2xl">
      <div className="text-gray-400 mb-4 font-['Inter'] font-semibold text-center">
        📁 File Saving Structure
      </div>
      
      <div className="glass-card rounded-lg">
        <FileItem 
          name="Client_Documents" 
          type="folder" 
          defaultOpen={true}
          onFileSelect={onFileSelect}
        >
          <FileItem name="QAS_Reports" type="folder" onFileSelect={onFileSelect}>
            <FileItem name="Monthly_Audits" type="folder" onFileSelect={onFileSelect}>
              <FileItem name="2024_January_Audit.pdf" onFileSelect={onFileSelect} />
              <FileItem name="2024_February_Audit.pdf" onFileSelect={onFileSelect} />
            </FileItem>
            <FileItem name="Quality_Policies" type="folder" onFileSelect={onFileSelect}>
              <FileItem name="Data_Quality_Policy_v2.1.docx" onFileSelect={onFileSelect} />
              <FileItem name="Compliance_Standards.pdf" onFileSelect={onFileSelect} />
            </FileItem>
          </FileItem>
          
          <FileItem name="Training_Materials" type="folder" onFileSelect={onFileSelect}>
            <FileItem name="Onboarding" type="folder" onFileSelect={onFileSelect}>
              <FileItem name="Welcome_Guide.pdf" onFileSelect={onFileSelect} />
              <FileItem name="Software_Setup.docx" onFileSelect={onFileSelect} />
            </FileItem>
            <FileItem name="Advanced_Courses" type="folder" onFileSelect={onFileSelect}>
              <FileItem name="Data_Analysis_Tutorial.mp4" onFileSelect={onFileSelect} />
              <FileItem name="Certification_Exam.pdf" onFileSelect={onFileSelect} />
            </FileItem>
          </FileItem>

          <FileItem name="Project_Files" type="folder" onFileSelect={onFileSelect}>
            <FileItem name="Python_Scripts" type="folder" onFileSelect={onFileSelect}>
              <FileItem name="SimpleIFRS17Calculator.py" onFileSelect={onFileSelect} />
            </FileItem>
            <FileItem name="Config_Files" type="folder" onFileSelect={onFileSelect}>
              <FileItem name="docker-compose.yml" onFileSelect={onFileSelect} />
              <FileItem name="requirements.txt" onFileSelect={onFileSelect} />
            </FileItem>
          </FileItem>
        </FileItem>
      </div>
    </div>
  );
}