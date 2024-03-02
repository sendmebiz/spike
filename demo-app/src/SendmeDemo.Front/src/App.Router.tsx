import { Redirect, Route } from 'wouter';
import { UsersPage } from './pages/users';
import { AppRoutes } from './constants/routes';
import { IssuerPage } from './pages/issuer';

export const AppRouter = () => {
    return (
        <>
            <Route path={AppRoutes.Users}>
                <UsersPage />
            </Route>
            <Route path={AppRoutes.Issuer}>
                <IssuerPage />
            </Route>

            <Route>
                <Redirect to={AppRoutes.Users} />
            </Route>
        </>
    );
};
