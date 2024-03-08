import { IValueModelReadonly } from '@zajno/common/models/types';
import { observer } from 'mobx-react-lite';
import { twJoin, twMerge } from './utils';

import '@/styles/loader.css';

type Props = {
    visible?: boolean | IValueModelReadonly<number> | IValueModelReadonly<boolean>;
    fullScreen?: boolean;
    className?: string;
    loaderClassName?: string;
};

export const Loader = observer(({ visible, fullScreen, className, loaderClassName }: Props) => {

    const isVisible = visible === undefined
        ? true
        : (typeof visible === 'boolean' ? visible : !!visible.value);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            onClick={fullScreen ? preventDefault : undefined}
            className={twMerge(
                'flex items-center justify-center',
                fullScreen ? 'fixed top-0 left-0 w-screen h-screen z-[100] bg-background/70 pointer-events-auto' : '',
                className,
            )}
        >
            <div
                className={twJoin('loader', loaderClassName)}
            />
        </div>
    );
});

function preventDefault(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
}
