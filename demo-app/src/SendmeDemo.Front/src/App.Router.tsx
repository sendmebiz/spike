import { Redirect, Route } from 'wouter';
import { UsersPage } from './pages/users';
import { AppRoutes } from './constants/routes';
import { IssuerPage } from './pages/issuer';
import { UserInner } from './pages/userInner';

export const AppRouter = () => {
    return (
        <>
            <Route path={AppRoutes.Users.Root}>
                <UsersPage />
            </Route>
            <Route path={AppRoutes.Users.Template}>
                <UserInner />
            </Route>

            <Route path={AppRoutes.Issuer}>
                <IssuerPage />
            </Route>

            <Route>
                <Redirect to={AppRoutes.Users.Root} />
            </Route>
        </>
    );
};
