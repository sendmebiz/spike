import { Nullable } from '@zajno/common/types';

export const ErrorView = ({ error }: { error: Nullable<string> }) => {
    if (!error) {
        return null;
    }

    return (
        <div className='text-red-500 my-2 text-right text-small pr-1'>
            {error}
        </div>
    );
};
