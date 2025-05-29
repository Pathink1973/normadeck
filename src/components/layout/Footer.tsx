import { Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dfeqzodi3/image/upload/v1748384859/Norma-Deck-Logotipo-Header.svg" 
                alt="NormaDeck" 
                className="h-8"
              />
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Uma biblioteca colaborativa de identidade visual, onde criativos podem consultar, pesquisar e partilhar normas gráficas oficiais de instituições públicas e privadas.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://www.instagram.com/pat_think/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              Feito com <Heart className="h-4 w-4 mx-1 text-red-500" /> para designers
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} NormaDeck. Todos os direitos reservados.
            </p>
            
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                Início
              </Link>
              <Link to="/normas" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                Normas
              </Link>
              <Link to="/admin" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}