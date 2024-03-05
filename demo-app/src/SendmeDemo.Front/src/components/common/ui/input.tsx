import * as React from 'react';

import { cn } from '@/components/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full px-3 py-3',
          'rounded-md border-2 border-border active:border-slate-200 bg-background-b3 focus-visible:outline-none focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'text-button placeholder:text-paragraphs',
          'ring-offset-white focus-visible:ring-2 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
