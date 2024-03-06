import { Redirect, Route, Switch } from 'wouter';
import { UsersPage } from './pages/users';
import { AppRoutes } from './constants/routes';
import { UserInner } from './pages/userInner';

export const AppRouter = () => {
    return (
        <Switch>
            <Route path={AppRoutes.Users.Root}>
                <UsersPage />
            </Route>
            <Route path={AppRoutes.Users.Template}>
                <UserInner />
            </Route>

            <Route>
                <Redirect to={AppRoutes.Users.Root} />
            </Route>
        </Switch>
    );
};
