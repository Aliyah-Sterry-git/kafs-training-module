// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import QASReports from "./QASReports";
import TrainingLinks from "./TrainingLinks";
import FileSavingFormat from "./FileSavingFormat";
import Modules from "./Modules";
import Module1 from "./Module1";
import Module2 from "./Module2"; // Add this import
import AuthPage from "./components/Auth/AuthPage";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { TutorialProvider } from "./contexts/TutorialContext";
import ModulesTutorial from "./components/Tutorial/ModulesTutorial";
import Module1Tutorial from "./components/Tutorial/Module1Tutorial";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isAdmin = user && user.role === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen bg-var(--bg-primary) flex items-center justify-center">
        <div className="text-var(--text-primary) text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <TutorialProvider>
      <Router>
        <div className="min-h-screen bg-var(--bg-primary) text-var(--text-primary) transition-colors duration-300">
          {/* Theme Toggle - Bottom Right Corner (visible for everyone now) */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          
          {/* Navbar with theme prop */}
          <Navbar user={user} onLogout={handleLogout} theme={theme} />
          
          <Routes>
            {/* Auth Page with theme prop */}
            <Route 
              path="/auth" 
              element={
                user ? <Navigate to="/" replace /> : <AuthPage onAuthSuccess={handleAuthSuccess} theme={theme} />
              } 
            />
            
            {/* Home - LandingPage with theme prop if not logged in, HomePage if logged in */}
            <Route 
              path="/" 
              element={
                user ? <HomePage theme={theme} /> : <LandingPage theme={theme} />
              } 
            />
            
            {/* Protected Routes - pass theme to other pages as needed */}
            <Route 
              path="/qas-reports" 
              element={
                user ? (
                  <div className="pt-20">
                    <QASReports theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/modules" 
              element={
                user ? (
                  <div className="pt-20">
                    <Modules theme={theme} />
                    <ModulesTutorial />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/training-links" 
              element={
                user ? (
                  <div className="pt-20">
                    <TrainingLinks theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/file-saving-format" 
              element={
                user ? (
                  <div className="pt-20">
                    <FileSavingFormat theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAdmin ? (
                  <div className="pt-20">
                    <AdminDashboard theme={theme} />
                  </div>
                ) : <Navigate to="/" replace />
              } 
            />
            
            {/* Module Routes */}
            <Route 
              path="/modules/1" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module1 theme={theme} />
                    <Module1Tutorial />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            {/* ADD MODULE 2 ROUTE HERE */}
            <Route 
              path="/modules/2" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module2 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                user ? (
                  <div className="pt-20">
                    <UserProfile theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </TutorialProvider>
  );
}

export default App;