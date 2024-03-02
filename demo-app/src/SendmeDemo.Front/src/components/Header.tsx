import { Button } from './common/ui/button';
import Logo from '@/assets/logo.svg';

export const Header = () => {

    return (
        <header className=" bg-background-b1 flex flex-row py-7 px-10 z-10 w-full">
            <img src={Logo} className="w-28" />
            <Button className="ml-auto">Transfer</Button>
        </header>
    );
};
