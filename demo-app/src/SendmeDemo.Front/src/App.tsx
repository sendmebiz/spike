import { Header } from './components/Header';
import { Sidebar } from './components/sidebar/wrapper';
import { useEffect, useState } from 'react';
import { AppController } from './controllers';
import { AppRouter } from './App.Router';
import { Loader } from './components/Loader';

function App() {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AppController.Instance.initialize().then(() => setIsLoaded(true));
    }, []);

    return (
        <>
            <div className="w-screen h-svh bg-background text-paragraphs font-main text-paragraph overflow-hidden flex flex-col">
                <Header />
                <Sidebar>
                    <main className='w-full grow min-h-0 overflow-x-hidden overflow-y-auto'>
                        {isLoaded && <AppRouter />}
                    </main>
                </Sidebar>
            </div>
            <Loader
                fullScreen
                visible={AppController.Instance.Network.requestsCount}
            />
        </>
    );
}

export default App;
