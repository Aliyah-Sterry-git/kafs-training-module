// src/components/Auth/AuthPage.jsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Simulate authentication (in real app, this would connect to a backend)
  const handleLogin = (credentials) => {
    console.log('Login attempt:', credentials);
    
    // Check if this is an admin login
    const isAdmin = credentials.email.includes('@kenbright-admin.com');
    
    // Simulate successful login
    const user = {
      id: 1,
      username: credentials.email.split('@')[0],
      email: credentials.email,
      profilePic: null,
      role: isAdmin ? 'admin' : 'trainee',
      isAuthenticated: true
    };
    localStorage.setItem('user', JSON.stringify(user));
    onAuthSuccess(user);
  };

  const handleRegister = (userData) => {
    console.log('Registration attempt:', userData);
    
    // Check if this is an admin registration
    const isAdmin = userData.email.includes('@kenbright-admin.com');
    
    // Simulate successful registration
    const user = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      profilePic: userData.profilePic,
      role: isAdmin ? 'admin' : 'trainee',
      isAuthenticated: true
    };
    localStorage.setItem('user', JSON.stringify(user));
    onAuthSuccess(user);
  };

  // Pre-defined admin accounts for demo (in real app, this would be in a database)
  const demoAccounts = [
    { email: 'admin@kenbright-admin.com', password: 'admin123', role: 'admin' },
    { email: 'supervisor@kenbright-admin.com', password: 'super123', role: 'admin' },
    { email: 'trainer@kenbright.com', password: 'trainer123', role: 'trainee' }
  ];

  const handleDemoLogin = (account) => {
    const user = {
      id: Date.now(),
      username: account.email.split('@')[0],
      email: account.email,
      profilePic: null,
      role: account.role,
      isAuthenticated: true
    };
    localStorage.setItem('user', JSON.stringify(user));
    onAuthSuccess(user);
  };

  return (
    <>
      {isLogin ? (
        <Login 
          onToggleMode={() => setIsLogin(false)} 
          onLogin={handleLogin}
          demoAccounts={demoAccounts}
          onDemoLogin={handleDemoLogin}
        />
      ) : (
        <Register 
          onToggleMode={() => setIsLogin(true)} 
          onRegister={handleRegister}
        />
      )}
    </>
  );
};

export default AuthPage;