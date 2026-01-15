// src/components/Auth/Auth.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  X,
  Chrome,
  Github,
  Facebook
} from "lucide-react";

import { supabase } from "../../supabaseClient";

export default function Auth({ onAuthSuccess, theme = 'dark' }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const colors = {
    dark: {
      cyan: "#00E5FF",
      blue: "#3B82F6",
      purple: "#7C4DFF",
      gradientStart: "#00E5FF",
      gradientEnd: "#3B82F6",
      card: "#1A1F2E",
      bg: "#0A0F1E",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF",
      inputBg: "rgba(255,255,255,0.05)",
      inputBorder: "rgba(255,255,255,0.1)",
      inputText: "#FFFFFF"
    },
    light: {
      cyan: "#00E5FF",
      blue: "#0066FF",
      purple: "#7C4DFF",
      gradientStart: "#0066FF",
      gradientEnd: "#7C4DFF",
      card: "#FFFFFF",
      bg: "#F8FAFC",
      text: "#0F172A",
      textSecondary: "#64748B",
      inputBg: "#FFFFFF",
      inputBorder: "#E2E8F0",
      inputText: "#0F172A"
    }
  };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  useEffect(() => {
    setIsLogin(mode === 'login');
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setError("");
    setShowPassword(false);
  }, [mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const toggleMode = () => {
    navigate(`/auth?mode=${isLogin ? 'signup' : 'login'}`);
  };

  const handleClose = () => navigate('/');

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!isLogin) {
      if (!formData.name) {
        setError("Please enter your name");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      let data, error;

      if (isLogin) {
        // Email/Password Sign In
        ({ data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        }));
      } else {
        // Email/Password Sign Up
        ({ data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              username: formData.name.toLowerCase().replace(/\s+/g, '_')
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        }));
      }

      if (error) throw error;

      // Check if email confirmation is required
      if (!isLogin && data.user?.identities?.length === 0) {
        setError("User already exists. Please sign in instead.");
        setLoading(false);
        return;
      }

      if (!isLogin) {
        // For signup, show success message
        setError("Registration successful! Please check your email to confirm your account.");
        setTimeout(() => {
          navigate(`/auth?mode=login`);
        }, 2000);
      } else {
        // For login, trigger success callback
        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;
      
      // The user will be redirected to OAuth provider
      // No need to do anything else here

    } catch (err) {
      console.error("Social login error:", err);
      setError(`Failed to sign in with ${provider}: ${err.message}`);
      setSocialLoading(false);
    }
  };

  // Social login providers configuration
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: Chrome,
      color: theme === 'dark' ? '#4285F4' : '#DB4437',
      bgColor: theme === 'dark' ? 'rgba(66, 133, 244, 0.1)' : 'rgba(219, 68, 55, 0.08)',
      borderColor: theme === 'dark' ? 'rgba(66, 133, 244, 0.3)' : 'rgba(219, 68, 55, 0.2)'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: theme === 'dark' ? '#FFFFFF' : '#333333',
      bgColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(51, 51, 51, 0.08)',
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(51, 51, 51, 0.2)'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: theme === 'dark' ? '#1877F2' : '#1877F2',
      bgColor: theme === 'dark' ? 'rgba(24, 119, 242, 0.1)' : 'rgba(24, 119, 242, 0.08)',
      borderColor: theme === 'dark' ? 'rgba(24, 119, 242, 0.3)' : 'rgba(24, 119, 242, 0.2)'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-all duration-300"
        style={{
          background: theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)'
        }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-fade-in"
          style={{
            background: currentColors.card,
            border: theme === 'dark'
              ? `1.5px solid ${currentColors.cyan}30`
              : `1.5px solid ${currentColors.purple}20`,
            boxShadow: theme === 'dark'
              ? `0 8px 32px rgba(0, 221, 255, 0.15)`
              : `0 20px 60px rgba(103, 58, 183, 0.15), 0 0 0 1px rgba(103, 58, 183, 0.08)`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg transition-all duration-200 z-10 hover:scale-110"
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <X className="w-5 h-5 transition-colors" style={{ color: theme === 'dark' ? currentColors.textSecondary : '#64748B' }} />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${currentColors.gradientStart}, ${currentColors.gradientEnd})`,
                    boxShadow: `0 4px 20px ${currentColors.gradientStart}40`
                  }}
                >
                  KB
                </div>
                <div className="text-left">
                  <div className="font-black text-lg leading-none" style={{ color: currentColors.text }}>KENBRIGHT</div>
                  <div className="text-xs font-medium" style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}>Actuarial Hub</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                {isLogin
                  ? 'Sign in to continue learning'
                  : 'Create your free account'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-3 rounded-xl flex items-center gap-2 text-sm"
                style={{
                  background: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                  border: theme === 'dark' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: theme === 'dark' ? '#EF4444' : '#DC2626' }} />
                <span style={{ color: theme === 'dark' ? '#F87171' : '#DC2626' }}>{error}</span>
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="mb-6">
              <div className="flex gap-3 mb-4">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleSocialLogin(provider.id)}
                    disabled={socialLoading}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: provider.bgColor,
                      border: `2px solid ${provider.borderColor}`,
                      color: provider.color
                    }}
                  >
                    <provider.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{provider.name}</span>
                  </button>
                ))}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2" style={{ 
                    background: currentColors.card, 
                    color: currentColors.textSecondary 
                  }}>
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: currentColors.textSecondary }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: currentColors.inputBg,
                        border: `2px solid ${currentColors.inputBorder}`,
                        color: currentColors.inputText
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                        e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = currentColors.inputBorder;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: currentColors.textSecondary }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: currentColors.inputBg,
                      border: `2px solid ${currentColors.inputBorder}`,
                      color: currentColors.inputText
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                      e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = currentColors.inputBorder;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: currentColors.textSecondary }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: currentColors.inputBg,
                      border: `2px solid ${currentColors.inputBorder}`,
                      color: currentColors.inputText
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                      e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = currentColors.inputBorder;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition hover:scale-110"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: currentColors.textSecondary }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: currentColors.inputBg,
                        border: `2px solid ${currentColors.inputBorder}`,
                        color: currentColors.inputText
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                        e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = currentColors.inputBorder;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="text-xs transition hover:opacity-70" 
                    style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
                    onClick={() => {
                      // You can implement password reset here
                      setError("Password reset feature coming soon!");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-6 relative overflow-hidden group"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #00E5FF, #0093dc)'
                    : 'linear-gradient(135deg, #0066ffda, rgb(120, 72, 252))',
                  boxShadow: theme === 'dark'
                    ? '0 5px 20px rgba(0, 229, 255, 0.4)'
                    : '0 5px 20px rgba(103, 58, 183, 0.4)',
                  color: theme === 'dark' ? '#fefefe' : 'white'
                }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        borderTopColor: 'white'
                      }} />
                    <span>{isLogin ? 'Signing in...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" style={{ color: 'white' }} />
                  </>
                )}
              </button>
            </div>

            {/* Toggle Login/Signup */}
            <div className="text-center mt-6 pt-6 border-t"
              style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <p className="text-sm mb-4" style={{ color: currentColors.textSecondary }}>
                {isLogin ? "New to Kenbright?" : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : `${currentColors.blue}08`,
                  border: `2px solid ${theme === 'dark' ? currentColors.cyan : currentColors.blue}${theme === 'dark' ? '80' : '80'}`,
                  color: theme === 'dark' ? currentColors.cyan : currentColors.blue
                }}
              >
                <Sparkles className="w-4 h-4"
                  style={{
                    color: theme === 'dark' ? currentColors.cyan : currentColors.blue
                  }}
                />
                <span>{isLogin ? 'Create Free Account' : 'Sign In Instead'}</span>
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs mt-6" style={{ color: currentColors.textSecondary }}>
              By continuing, you agree to{' '}
              <a href="#" className="transition hover:opacity-70 font-medium" style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}>Terms</a>
              {' & '}
              <a href="#" className="transition hover:opacity-70 font-medium" style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}>Privacy</a>
            </p>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}