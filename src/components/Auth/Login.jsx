// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Rocket } from 'lucide-react';

const Login = ({ onToggleMode, onLogin, demoAccounts, onDemoLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your Kenbright Training account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Sign in
            </button>
          </div>

          {/* Demo Accounts Section */}
          {demoAccounts && onDemoLogin && (
            <div className="mt-6 border-t border-gray-700 pt-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Rocket className="h-4 w-4 text-purple-400" />
                <p className="text-center text-sm font-medium text-purple-400">Quick Demo Access</p>
              </div>
              <div className="space-y-2">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onDemoLogin(account)}
                    className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-200 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-200 font-medium text-sm">{account.email}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        account.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {account.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">Click to login</span>
                      <span className="text-gray-500 text-xs">Password: {account.password}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">
                Use these demo accounts to test different user roles
              </p>
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={onToggleMode}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;