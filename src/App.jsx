// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import QASReports from "./QASReports";
import TrainingLinks from "./TrainingLinks";
import FileSavingFormat from "./FileSavingFormat";
import Modules from "./Modules";
import Module1 from "./Module1";
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
  const [theme, setTheme] = useState('dark'); // Default to dark mode

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Check for saved theme preference
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

  // Check if user is admin
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
          {/* Theme Toggle - Bottom Left Corner */}
          {user && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
          
          {user && <Navbar userProfile={<UserProfile user={user} onLogout={handleLogout} />} />}
          
          {/* REMOVED pt-20 from this wrapper - HomePage handles its own spacing */}
          <Routes>
            <Route 
              path="/auth" 
              element={
                user ? <Navigate to="/" replace /> : <AuthPage onAuthSuccess={handleAuthSuccess} />
              } 
            />
            {/* HomePage - NO padding, hero extends behind navbar */}
            <Route 
              path="/" 
              element={
                user ? <HomePage /> : <Navigate to="/auth" replace />
              } 
            />
            {/* Other pages - ADD pt-20 wrapper for navbar spacing */}
            <Route 
              path="/qas-reports" 
              element={
                user ? (
                  <div className="pt-20">
                    <QASReports />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/modules" 
              element={
                user ? (
                  <div className="pt-20">
                    <Modules />
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
                    <TrainingLinks />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/file-saving-format" 
              element={
                user ? (
                  <div className="pt-20">
                    <FileSavingFormat />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAdmin ? (
                  <div className="pt-20">
                    <AdminDashboard />
                  </div>
                ) : <Navigate to="/" replace />
              } 
            />
            <Route 
              path="/modules/1" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module1 />
                    <Module1Tutorial />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
          </Routes>
        </div>
      </Router>
    </TutorialProvider>
  );
}

export default App;