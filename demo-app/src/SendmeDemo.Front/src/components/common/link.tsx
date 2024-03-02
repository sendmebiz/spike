import { Link as LinkWouter } from 'wouter';
import { Button } from './ui/button';

type Props = React.PropsWithChildren<{
    to: string,
    replace?: boolean,
    className?: string,
}>;

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
