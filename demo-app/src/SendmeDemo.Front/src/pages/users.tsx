import { Loader } from '@/components/Loader';
import { UsersTable } from '@/components/screens/UsersTable';
import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';

export const UsersPage = observer(() => {

    const users = AppController.Instance.Users.users;

    return (
        <div className='py-10 px-16 container flex flex-col mx-auto'>
            {/* <h3 className="text-hh3 text-primary">Users</h3> */}

            <div className='list mt-8 w-full'>
                {!users.busy && <UsersTable
                    items={users.value || []}
                />}
            </div>
            <Loader
                className='w-full h-full'
                visible={users.busy}
            />
        </div>
    );
});
