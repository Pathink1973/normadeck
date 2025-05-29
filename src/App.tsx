import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { NormasPage } from './pages/NormasPage';
import { AdminPage } from './pages/AdminPage';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

import './styles/animations.css';

function App() {
  const { checkSession } = useAuthStore();
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Check for existing session on app load
    checkSession();
    
    // Set page title
    document.title = 'NormaDeck - Biblioteca de Normas Gráficas';
  }, [checkSession]);
  
  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/normas" element={<NormasPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;