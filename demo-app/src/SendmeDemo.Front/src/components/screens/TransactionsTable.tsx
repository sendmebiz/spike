import { UserTransaction } from '@/services/api/endpoints/dtos/users';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../common/table';
import { formatCurrency, formatDate, shortenAddressHard } from '../utils/format';
import OutIconUrl from '@/assets/out-icon.svg?url';
import { getTransactionLink } from '@/viewModels/screens/utils/links';
import { twMerge } from '../utils';

type Props = {
    items: UserTransaction[];
    className?: string;
};

const columns: ColumnDef<UserTransaction>[] = [
    {
        id: 'id',
        header: 'TX',
        cell: (cell) => (
            <Cell className='font-mono'>
                <a
                    target='_blank'
                    href={getTransactionLink(cell.row.original?.id)}
                    className='basis-[25%] flex flex-row glow-hover-inner-img hover:underline text-accent-a1 gap-1'
                >
                    {shortenAddressHard(cell.row.original?.id)}
                    <img src={OutIconUrl} alt='Open in etherscan' className='inline w-4 self-start' />
                </a>
            </Cell>
        ),
    },
    {
        id: 'date',
        header: 'Date',
        cell: (cell) => (
            <Cell
                // className='w-[150px]'
                title={formatDate(cell.row.original.timeStamp * 1000, formatDate.Formats.TimeDayMonthYear)}
            >
                {formatDate(cell.row.original.timeStamp * 1000, formatDate.Formats.DayMonthYear)}
            </Cell>
        ),
    },
    {
        id: 'from',
        header: 'From',
        cell: (cell) => (
            <Cell>
                {cell.row.original?.from?.startsWith('0x00') ? '0x00' : cell.row.original?.from}
            </Cell>
        ),
    },
    {
        id: 'to',
        header: 'To',
        cell: (cell) => (
            <Cell>
                {cell.row.original?.to?.startsWith('0x00') ? '0x00' : cell.row.original?.to}
            </Cell>
        ),
    },
    {
        id: 'value',
        header: 'Value',
        cell: (cell) => (
            <Cell
                className={twMerge(
                    'relative',
                    // 'border-2 rounded-xl px-2 py-1',
                    // 'underline decoration-4 underline-offset-4',
                    // cell.row.original?.isOut
                    //     // ? 'border-yellow-600'
                    //     // : 'border-green-700',
                    //     ? 'decoration-yellow-600'
                    //     : 'decoration-green-700',
                )}
                title={formatCurrency(cell.row.original?.value, true)}
            >
                {cell.row.original?.isOut != null && <span
                    className={twMerge(
                        'border-2 rounded-lg w-11 text-center px-1 py-1 absolute text-small top-1/2 translate-x-[-110%] translate-y-[-50%]',
                        'text-primary border-accent-a2 font-medium',
                        cell.row.original?.isOut
                            ? '' // 'text-yellow-600 border-yellow-600'
                            : 'bg-accent-a2 font-semibold',
                    )}
                >
                    {cell.row.original?.isOut ? 'OUT' : 'IN'}
                </span>}
                {formatCurrency(cell.row.original?.value)}
            </Cell>
        ),
    },
    {
        id: 'type',
        header: 'Type',
        cell: (cell) => (
            <Cell>
                {cell.row.original?.type}
            </Cell>
        ),
    },
];

export const TransactionsTable = ({ items, className }: Props) => {
    return (
        <DataTable
            className={className}
            columns={columns}
            data={items}
        />
    );
};

const Cell = ({ children, className, ...rest }: JSX.IntrinsicElements['div']) => {
    return (
        <div
            className={twMerge(
                'text-white text-medium',
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
};
