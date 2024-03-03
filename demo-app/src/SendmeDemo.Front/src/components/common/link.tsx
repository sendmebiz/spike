import { Link as LinkWouter } from 'wouter';
import { Button } from './ui/button';

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
        <div>
            <LinkWouter asChild {...rest}>
                <Button
                    variant='link'
                    className={className}
                >
                    {children}
                </Button>
            </LinkWouter>
        </div>
    );
};
