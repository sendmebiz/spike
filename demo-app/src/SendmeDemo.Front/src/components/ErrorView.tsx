import { Nullable } from '@zajno/common/types';
import { cn } from './utils';

type Props = {
    error: Nullable<string>;
    className?: string;
};

export const ErrorView = ({ error, className }: Props) => {
    if (!error) {
        return null;
    }

    return (
        <div
            className={cn(
                'text-red-500 my-2 text-right text-small pr-1',
                className,
            )}
        >
            {error}
        </div>
    );
};
