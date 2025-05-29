import { useState, useEffect, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { SearchBar } from '../components/ui/SearchBar';
import { Filters } from '../components/ui/Filters';
import { supabase } from '../lib/supabase';
import type { Norma, SortOption } from '../types';
import { useLocation } from 'react-router-dom';

export function NormasPage() {
  const [normas, setNormas] = useState<Norma[]>([]);
  const [filteredNormas, setFilteredNormas] = useState<Norma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentSort, setCurrentSort] = useState<SortOption>({
    label: 'Ordem Alfabética',
    field: 'nome',
    direction: 'asc'
  });
  
  const location = useLocation();
  
  const sortOptions: SortOption[] = useMemo(() => [
    { label: 'Ordem Alfabética', field: 'nome', direction: 'asc' },
    { label: 'Mais Recentes', field: 'created_at', direction: 'desc' },
    { label: 'Mais Antigos', field: 'created_at', direction: 'asc' },
    { label: 'País (A-Z)', field: 'pais', direction: 'asc' },
  ], []);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  useEffect(() => {
    async function fetchNormas() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('normas')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        setNormas(data || []);
        setFilteredNormas(data || []);
      } catch (err) {
        console.error('Error fetching normas:', err);
        setError('Não foi possível carregar as normas');
      } finally {
        setLoading(false);
      }
    }
    
    fetchNormas();
  }, []);
  
  useEffect(() => {
    let results = [...normas];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(norma => 
        norma.nome.toLowerCase().includes(query) || 
        norma.pais.toLowerCase().includes(query) || 
        (norma.categoria && norma.categoria.toLowerCase().includes(query))
      );
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        results = results.filter(norma => {
          const normaValue = norma[key as keyof Norma];
          return normaValue && String(normaValue).toLowerCase() === value.toLowerCase();
        });
      }
    });
    
    results.sort((a, b) => {
      const fieldA = a[currentSort.field];
      const fieldB = b[currentSort.field];
      
      if (!fieldA && !fieldB) return 0;
      if (!fieldA) return 1;
      if (!fieldB) return -1;
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return currentSort.direction === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      return currentSort.direction === 'asc'
        ? (fieldA > fieldB ? 1 : -1)
        : (fieldA < fieldB ? 1 : -1);
    });
    
    setFilteredNormas(results);
  }, [normas, searchQuery, filters, currentSort]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Normas Gráficas
          </h1>
          <SearchBar 
            placeholder="Pesquisar por nome, país ou categoria..."
            onSearch={handleSearch}
            className="mb-6"
          />
          
          <Filters 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sortOptions={sortOptions}
          />
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : filteredNormas.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Nenhuma norma encontrada para os critérios de pesquisa.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredNormas.map((norma) => (
              <Card
                key={norma.id}
                image={norma.imagem_url}
                title={norma.nome}
                subtitle={norma.pais}
                buttonLabel="Descarregar"
                buttonLink={norma.pdf_url}
                normaId={norma.id}
                createdAt={norma.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}