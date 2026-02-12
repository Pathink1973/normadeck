import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const { user, signOut } = useAuthStore();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center text-lg font-bold text-gray-900 dark:text-white"
          >
            <img 
              src="https://ik.imagekit.io/8gvnjnrjr/normadeck/Norma-Deck-Logotipo-Header.svg" 
              alt="NormaDeck" 
              className="h-8"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-2 mr-4">
              <Link 
                to="/" 
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/' 
                    ? 'text-primary dark:text-primary bg-primary/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Início
              </Link>
              <Link 
                to="/normas" 
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/normas' 
                    ? 'text-primary dark:text-primary bg-primary/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Normas
              </Link>
              {user && (
                <Link 
                  to="/admin" 
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/admin' 
                      ? 'text-primary dark:text-primary bg-primary/10' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              {user ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                >
                  Sair
                </Button>
              ) : (
                location.pathname !== '/admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
          <div className="flex flex-col h-full">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
              <Link 
                to="/" 
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img 
                  src="https://ik.imagekit.io/8gvnjnrjr/normadeck/Norma-Deck-Logotipo-Header.svg" 
                  alt="NormaDeck" 
                  className="h-8"
                />
              </Link>
              <button 
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <Link 
                to="/" 
                className={`block w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === '/' 
                    ? 'text-primary dark:text-primary bg-primary/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/normas" 
                className={`block w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === '/normas' 
                    ? 'text-primary dark:text-primary bg-primary/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Normas
              </Link>
              {user && (
                <Link 
                  to="/admin" 
                  className={`block w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === '/admin' 
                      ? 'text-primary dark:text-primary bg-primary/10' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </nav>
            
            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sair
                </Button>
              ) : (
                location.pathname !== '/admin' && (
                  <Link 
                    to="/admin" 
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
