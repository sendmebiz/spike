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
                    prop !== null ? (
                    <div
                        key={i}
                        className='px-4 py-1 mx-1 inline rounded-full bg-accent-a1 text-background'
                    >
                        {prop}
                    </div>
                    ) : null
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3H21V9" stroke="url(#paint0_linear_669_16)" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M10 14L21 3" stroke="url(#paint1_linear_669_16)" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path
                            d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                            stroke="url(#paint2_linear_669_16)" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                        <defs>
                            <linearGradient id="paint0_linear_669_16" x1="17.5535" y1="3" x2="21.1695" y2="5.4854"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#3183FF"/>
                                <stop offset="1" stop-color="#0B62E4"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_669_16" x1="14.6814" y1="3" x2="21.3107" y2="7.55657"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#3183FF"/>
                                <stop offset="1" stop-color="#0B62E4"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_669_16" x1="9.38372" y1="6" x2="18.4237" y2="12.2135"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#3183FF"/>
                                <stop offset="1" stop-color="#0B62E4"/>
                            </linearGradient>
                        </defs>
                    </svg>
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
