import { SearchBar } from '../ui/SearchBar';
import { useNavigate } from 'react-router-dom';

interface SearchSectionProps {
  placeholder?: string;
  searchFields?: string[];
  redirectTo?: string;
}

export function SearchSection({ 
  placeholder = 'Procurar por nome, país ou categoria...', 
  redirectTo = '/normas' 
}: SearchSectionProps) {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`${redirectTo}?search=${encodeURIComponent(query)}`);
    }
  };
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Encontre a norma que procura
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Pesquise por nome da entidade, país ou categoria para encontrar rapidamente as normas gráficas que precisa.
          </p>
          
          <SearchBar 
            placeholder={placeholder}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </section>
  );
}