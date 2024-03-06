import { User } from '@/services/api/endpoints/dtos/users';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../common/table';
import { combineUrls } from '@zajno/common/structures/path';
import { AppController } from '@/controllers';
import { Link } from '../common/link';
import { AppRoutes } from '@/constants/routes';
import { formatCurrency } from '../utils/format';
import OutIconUrl from '@/assets/out-icon.svg?url';

type Props = {
    items: User[];
    className?: string;
};

const columns: ColumnDef<User>[] = [
    {
        id: 'name',
        header: 'Name',
        cell: (cell) => (
            <Link
                to={AppRoutes.Users({ name: cell.row.original?.name || '?' })}
                className='text-main text-primary justify-start px-1'
            >
                {cell.row.original?.name}
            </Link>
        ),
    },
    {
        id: 'balance',
        header: 'Balance',
        cell: (cell) => (
            <div
                className='text-white text-main'
            >
                {formatCurrency(cell.row.original?.balance)}
            </div>
        ),
    },
    {
        id: 'properties',
        header: 'Properties',
        cell: (cell) => (
            <div className='flex flex-row'>
                {cell.row.original?.properties?.filter(Boolean).map((prop, i) => (
                    <div
                        key={i}
                        className='px-4 py-2 mx-1 inline rounded-full bg-accent-a1 text-primary text-medium font-medium'
                    >
                        {prop}
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: 'address',
        header: '',
        maxSize: 30,
        cell: (cell) => (
            <div className='w-7'>
                <a
                    target='_blank'
                    href={combineUrls(
                        AppController.Instance.Settings.settings.etherscan,
                        'address',
                        cell.row.original?.address,
                    )}
                    className='glow-hover-inner-img'
                >
                    <img src={OutIconUrl} alt='Open in etherscan' />
                </a>
            </div>
        ),
    },
];

export const UsersTable = ({ items, className }: Props) => {

    return (
        <DataTable
            className={className}
            columns={columns}
            data={items}
        />
    );
};
