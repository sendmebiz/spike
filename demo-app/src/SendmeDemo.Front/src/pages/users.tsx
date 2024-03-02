import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';

export const UsersPage = observer(() => {

    const users = AppController.Instance.Users.users;

    console.log({ users });

    return (
        <h1 className="font-hh1">Users</h1>
    );
});
