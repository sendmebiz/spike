import { Header } from './components/Header';
import { Sidebar } from './components/sidebar/wrapper';
import { useEffect, useState } from 'react';
import { AppController } from './controllers';
import { AppRouter } from './App.Router';

function App() {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AppController.Instance.initialize().then(() => setIsLoaded(true));
    }, []);

    return (
        <div className="w-screen h-svh bg-background text-paragraphs font-main text-paragraph">
            <Header />
            <Sidebar>
                <main>
                    {isLoaded && <AppRouter />}
                </main>
            </Sidebar>
        </div>
    );
}

export default App;
