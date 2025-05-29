import { ChangeEvent, FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = 'Pesquisar...', onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        'relative w-full max-w-2xl mx-auto',
        className
      )}
    >
      <div className="relative group">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="w-full py-4 pl-14 pr-24 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/40 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors group-hover:text-primary group-focus-within:text-primary">
          <Search size={20} />
        </div>
      </div>
      <button 
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-primary text-white rounded-lg transition-all duration-200 hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/40"
      >
        Pesquisar
      </button>
    </form>
  );
}