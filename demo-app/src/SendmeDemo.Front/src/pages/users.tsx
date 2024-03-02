import { UsersTable } from '@/components/UsersTable';
import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';

export const UsersPage = observer(() => {

    const users = AppController.Instance.Users.users;

    return (
        <div className='p-10 flex flex-col w-full'>
            <h3 className="text-hh3 text-main">Users</h3>

            <div className='list mt-8 w-full'>
                {users && (
                    <UsersTable
                        items={users}
                    />
                )}
            </div>
        </div>
    );
});
