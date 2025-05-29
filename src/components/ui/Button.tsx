import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    icon: Icon, 
    iconPosition = 'left',
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25': variant === 'primary',
            'bg-secondary text-white hover:bg-secondary/90 shadow-md shadow-secondary/25': variant === 'secondary',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {Icon && iconPosition === 'left' && (
          <Icon className={cn('h-4 w-4', { 'mr-2': children })} />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className={cn('h-4 w-4', { 'ml-2': children })} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };