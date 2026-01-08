// src/components/UserProfile.jsx
import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 bg-gray-800 rounded-full pl-3 pr-1 py-1 border border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {user.profilePic ? (
              <img 
                src={user.profilePic} 
                alt={user.username} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <span className="text-white text-sm font-medium">{user.username}</span>
        </div>
        <button
          onClick={onLogout}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          title="Logout"
        >
          <LogOut className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;