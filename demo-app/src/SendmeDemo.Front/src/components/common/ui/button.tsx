import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, tv } from 'tailwind-variants';
import { TwConfigMerge } from '@/components/utils';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md'
    + ' text-button font-main ring-offset-white transition-colors'
    + ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2'
    + ' disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-accent-a2 text-primary hover:bg-accent-a1 active:bg-accent-a2/50 disabled:bg-background-b2 disabled:border-border disabled:border-2',
      destructive:
        'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
      outline:
        'border-2 border-border bg-transparent hover:bg-background-b3 hover:text-primary',
      secondary:
        'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
      ghost: 'hover:bg-slate-100 hover:text-slate-900',
      link: 'text-paragraphs underline-offset-4 hover:underline hover:text-primary dark:text-slate-50',
      switcher: 'bg-accent-a2 text-primary hover:bg-accent-a1 active:bg-accent-a2/50 disabled:bg-primary disabled:border-none disabled:text-black disabled:opacity-100',
    },
    size: {
      default: 'h-10 px-10 py-6',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
}, { twMergeConfig: TwConfigMerge });

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const [forceDisabled, setForceDisabled] = React.useState(false);

    const _onClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const res = onClick?.(e);
      if (res instanceof Promise) {
        setForceDisabled(true);
        res.finally(() => setForceDisabled(false));
      }
    }, [onClick]);

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || forceDisabled}
        onClick={_onClick}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
