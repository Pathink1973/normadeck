import { useState, useEffect } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Norma } from '../../types';
import { formatDate } from '../../lib/utils';

interface NormaTableProps {
  onEdit: (norma: Norma) => void;
  onRefresh: () => void;
}

export function NormaTable({ onEdit, onRefresh }: NormaTableProps) {
  const [normas, setNormas] = useState<Norma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchNormas();
  }, []);
  
  async function fetchNormas() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('normas')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setNormas(data || []);
    } catch (err) {
      console.error('Error fetching normas:', err);
      setError('Não foi possível carregar as normas');
    } finally {
      setLoading(false);
    }
  }
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta norma?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('normas')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setNormas(normas.filter(norma => norma.id !== id));
      onRefresh();
    } catch (err) {
      console.error('Error deleting norma:', err);
      alert('Erro ao excluir a norma');
    }
  };
  
  if (loading) {
    return (
      <div className="w-full p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md">
        {error}
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3">Nome</th>
            <th scope="col" className="px-6 py-3">País</th>
            <th scope="col" className="px-6 py-3">Categoria</th>
            <th scope="col" className="px-6 py-3">Ano</th>
            <th scope="col" className="px-6 py-3">Data de Criação</th>
            <th scope="col" className="px-6 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {normas.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                Nenhuma norma encontrada
              </td>
            </tr>
          ) : (
            normas.map(norma => (
              <tr 
                key={norma.id} 
                className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 font-medium">{norma.nome}</td>
                <td className="px-6 py-4">{norma.pais}</td>
                <td className="px-6 py-4">{norma.categoria || '-'}</td>
                <td className="px-6 py-4">{norma.ano || '-'}</td>
                <td className="px-6 py-4">{formatDate(norma.created_at)}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <a 
                    href={norma.pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 text-gray-500 hover:text-primary transition-colors"
                  >
                    <Eye size={18} />
                  </a>
                  <button 
                    onClick={() => onEdit(norma)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(norma.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}