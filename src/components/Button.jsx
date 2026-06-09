import React from 'react';
import { cn } from '../utils';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow',
    outline: 'border-2 border-outline-variant bg-transparent text-on-surface hover:bg-surface-container hover:border-outline',
    ghost: 'bg-transparent text-on-surface hover:bg-surface-container',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm'
  };

  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base'
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
