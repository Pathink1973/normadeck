import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  image?: string;
}

export function Hero({ 
  title, 
  subtitle, 
  ctaLabel, 
  ctaLink, 
  image = 'https://res.cloudinary.com/dfeqzodi3/image/upload/v1748384312/NormaDeck-Hero_z395ah.webp'
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
              {subtitle}
            </p>
            <Link to={ctaLink}>
              <Button 
                variant="primary" 
                size="lg" 
                icon={ArrowRight} 
                iconPosition="right"
                className="w-full md:w-auto bg-[#824DFE] hover:bg-[#824DFE]/90 shadow-lg shadow-[#824DFE]/25 transition-all duration-300"
              >
                {ctaLabel}
              </Button>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-2xl opacity-70 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={image} 
                  alt="NormaDeck Hero" 
                  className="w-full h-auto object-cover rounded-2xl shadow-inner transform transition-transform duration-500 hover:scale-105" 
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}