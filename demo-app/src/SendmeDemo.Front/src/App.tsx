import { Redirect, Route } from 'wouter';
import { Header } from './components/Header';
import { Sidebar } from './components/sidebar/wrapper';
import { AppRoutes } from './constants/routes';
import { UsersPage } from './pages/users';
import { IssuerPage } from './pages/issuer';

function App() {

    return (
        <div className="w-screen h-svh">
            <Header />
            <Sidebar>
                <main>
                    <Route path={AppRoutes.Users}>
                        <UsersPage />
                    </Route>
                    <Route path={AppRoutes.Issuer}>
                        <IssuerPage />
                    </Route>

                    <Route>
                        <Redirect to={AppRoutes.Users} />
                    </Route>
                </main>
            </Sidebar>
        </div>
    );
}

export default App;
