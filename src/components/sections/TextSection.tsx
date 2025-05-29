import { Button } from '../ui/Button';
import { Send } from 'lucide-react';

interface TextSectionProps {
  title: string;
  content: string;
}

export function TextSection({ title, content }: TextSectionProps) {
  return (
    <section className="py-16 px-4 bg-[#8f74ff]/5 dark:bg-[#8f74ff]/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {content}
            </p>
          </div>
          
          <a
            href={`mailto:patriciobritodesign@gmail.com?subject=${encodeURIComponent(
              "[Nova Norma Gráfica Partilhada]"
            )}`}
            className="inline-block"
          >
            <Button
              variant="primary"
              size="lg"
              icon={Send}
              className="bg-[#8f74ff] hover:bg-[#8f74ff]/90 shadow-lg shadow-[#8f74ff]/25 transition-all duration-300"
            >
              Partilha Norma Gráfica
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}