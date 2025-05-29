import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Norma } from '../../types';

interface RecentNormasProps {
  title: string;
  limit?: number;
  ctaLabel?: string;
  ctaLink?: string;
}

export function RecentNormas({ 
  title, 
  limit = 4, 
  ctaLabel = 'Ver mais normas', 
  ctaLink = '/normas' 
}: RecentNormasProps) {
  const [normas, setNormas] = useState<Norma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchRecentNormas() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('normas')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);
          
        if (error) {
          throw error;
        }
        
        setNormas(data || []);
      } catch (err) {
        console.error('Error fetching recent normas:', err);
        setError('Não foi possível carregar as normas recentes');
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecentNormas();
  }, [limit]);
  
  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            {title}
          </h2>
          
          <Link to={ctaLink}>
            <Button 
              variant="outline" 
              icon={ArrowRight} 
              iconPosition="right"
              className="w-full md:w-auto"
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[...Array(limit)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {normas.map((norma) => (
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
    </section>
  );
}