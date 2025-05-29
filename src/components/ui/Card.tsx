import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Download } from 'lucide-react';
import { Button } from './Button';
import { isNewItem } from '../../lib/utils';
import { useThemeStore } from '../../store/themeStore';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeColor?: string;
  buttonLabel?: string;
  buttonLink?: string;
  normaId?: string;
  createdAt?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    image, 
    title, 
    subtitle, 
    badgeText,
    badgeColor = '#FF0077',
    buttonLabel, 
    buttonLink,
    normaId,
    createdAt,
    ...props 
  }, ref) => {
    const { theme } = useThemeStore();
    
    const isNew = createdAt ? isNewItem(createdAt) : false;

    const getDownloadUrl = () => {
      if (!normaId) return buttonLink;
      
      // Ensure we're using the correct URL format for edge functions
      const baseUrl = import.meta.env.VITE_SUPABASE_URL;
      return `${baseUrl}/functions/v1/get-pdf?id=${encodeURIComponent(normaId)}`;
    };
    
    const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      
      if (!normaId) {
        if (buttonLink) {
          window.open(buttonLink, '_blank', 'noopener,noreferrer');
        }
        return;
      }

      try {
        const downloadUrl = getDownloadUrl();
        const response = await fetch(downloadUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the redirect URL from the response
        const location = response.headers.get('Location');
        if (location) {
          window.open(location, '_blank', 'noopener,noreferrer');
          return;
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        const pdfUrl = data.url || data.location;
        if (!pdfUrl) {
          throw new Error('No PDF URL received from the server');
        }

        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        console.error('Error downloading PDF:', error);
        // Fallback to direct URL if available
        if (buttonLink) {
          window.open(buttonLink, '_blank', 'noopener,noreferrer');
        }
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden transition-all duration-300',
          'bg-white dark:bg-gray-800',
          'shadow-lg hover:shadow-xl',
          'transform hover:-translate-y-1',
          'animate-fadeSlideUp',
          className
        )}
        {...props}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          
          {(isNew || badgeText) && (
            <div 
              className="absolute top-3 right-3 px-3 py-1.5 text-xs font-semibold text-white rounded-full"
              style={{ backgroundColor: badgeColor }}
            >
              {badgeText || 'Novo'}
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{subtitle}</p>
          )}
          
          {buttonLink && buttonLabel && (
            <a 
              href={buttonLink}
              onClick={handleDownload}
              className="inline-block w-full"
            >
              <Button
                variant="primary"
                size="sm"
                icon={Download}
                className="w-full bg-[#8f74ff] hover:bg-[#8f74ff]/90 shadow-lg shadow-[#8f74ff]/25 transition-all duration-300"
              >
                {buttonLabel}
              </Button>
            </a>
          )}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };