import { Link as LinkWouter } from 'wouter';
import { buttonVariants } from './ui/button';
import { twMerge } from '../utils';

type Props = React.PropsWithChildren<{
    replace?: boolean,
    className?: string,
}> & ({
    to: string,
    href?: never,
} | {
    href: string,
    to?: never,
});

export const Link = ({ children, className, ...rest }: Props) => {
    return (
        <LinkWouter
            {...rest}
            className={twMerge(
                buttonVariants({ variant: 'link', className })
            )}
        >
            {children}
        </LinkWouter>
    );
};
