import { User } from '@/services/api/endpoints/dtos/users';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './common/table';
import { combineUrls } from '@zajno/common/structures/path';
import { AppController } from '@/controllers';

type Props = {
    items: User[];
    className?: string;
};

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'balance',
        header: 'Balance',
    },
    {
        id: 'properties',
        header: 'Properties',
        cell: (cell) => (
            <div className='flex flex-row'>
                {cell.row.original?.properties?.map((prop, i) => (
                    <div
                        key={i}
                        className='px-4 py-1 mx-1 inline rounded-full bg-accent-a1 text-background'
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
            <div className='w-5'>
                <a
                    target='_blank'
                    href={combineUrls(
                        AppController.Instance.Settings.settings.etherscan,
                        'address',
                        cell.row.original?.address,
                    )}
                >
                    🔗
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
