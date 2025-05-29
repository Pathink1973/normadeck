import { ChangeEvent, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SortOption } from '../../types';

interface FiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
  onSortChange: (sort: SortOption) => void;
  sortOptions: SortOption[];
  className?: string;
}

export function Filters({ onFilterChange, onSortChange, sortOptions, className }: FiltersProps) {
  const [filters, setFilters] = useState<Record<string, string>>({
    pais: '',
    categoria: '',
    ano: '',
  });
  
  const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
    onSortChange(sort);
    setIsOpen(false);
  };
  
  const selectClassName = "w-full md:w-48 px-4 py-3 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/40 transition-all duration-200 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600";
  
  return (
    <div className={cn('flex flex-col md:flex-row gap-6', className)}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="pais" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            País
          </label>
          <select
            id="pais"
            name="pais"
            value={filters.pais}
            onChange={handleFilterChange}
            className={selectClassName}
          >
            <option value="">Todos os países</option>
            <option value="Portugal">Portugal</option>
            <option value="Brasil">Brasil</option>
            <option value="Espanha">Espanha</option>
            <option value="França">França</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            value={filters.categoria}
            onChange={handleFilterChange}
            className={selectClassName}
          >
            <option value="">Todas as categorias</option>
            <option value="Instituição pública">Instituição pública</option>
            <option value="Escola">Escola</option>
            <option value="Empresa">Empresa</option>
            <option value="Outra">Outra</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="ano" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ano
          </label>
          <select
            id="ano"
            name="ano"
            value={filters.ano}
            onChange={handleFilterChange}
            className={selectClassName}
          >
            <option value="">Todos os anos</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="Anterior a 2020">Anterior a 2020</option>
          </select>
        </div>
      </div>
      
      <div className="relative flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ordenar por
        </label>
        <button
          type="button"
          className={cn(
            selectClassName,
            "flex items-center justify-between"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentSort.label}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <ul className="py-2">
              {sortOptions.map((option) => (
                <li key={option.label}>
                  <button
                    type="button"
                    className={cn(
                      'w-full text-left px-4 py-3 text-sm transition-colors',
                      currentSort.label === option.label
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    )}
                    onClick={() => handleSortChange(option)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}