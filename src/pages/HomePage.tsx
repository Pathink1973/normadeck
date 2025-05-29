import { Hero } from '../components/sections/Hero';
import { RecentNormas } from '../components/sections/RecentNormas';
import { SearchSection } from '../components/sections/SearchSection';
import { TextSection } from '../components/sections/TextSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero 
        title="Biblioteca Colaborativa de Normas Gráficas"
        subtitle="Quem trabalha em design sabe: encontrar uma norma gráfica completa com o logótipo original e em vetor é muitas vezes uma dor de cabeça. É nesse sentido, de que a plataforma NormaDeck surge para facilitar esse processo e poupar tempo a quem vive da criatividade. Uma biblioteca colaborativa de identidade visual, onde criativos podem consultar, pesquisar e partilhar normas gráficas oficiais de instituições públicas e privadas."
        ctaLabel="Ver normas"
        ctaLink="/normas"
      />
      
      <RecentNormas 
        title="Normas Recentes"
        limit={4}
        ctaLabel="Ver mais normas"
        ctaLink="/normas"
      />
      
      <SearchSection 
        placeholder="Procurar por nome, país ou categoria..."
        redirectTo="/normas"
      />
      
      <TextSection 
        title="Tens um PDF de normas gráficas? Partilha!"
        content="A NormaDeck é feita por e para designers. Se encontraste uma nova norma gráfica de uma entidade pública, escola ou empresa, envia-nos o link! Queremos manter esta biblioteca sempre atualizada e acessível a todos." 
      />
    </div>
  );
}