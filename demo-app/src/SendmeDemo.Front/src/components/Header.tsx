import { Button } from './common/ui/button';
import Logo from '@/assets/logo.svg';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './common/ui/dialog';
import { TransferDialog } from './screens/transfer/Transfer';

export const Header = () => {

    return (
        <header className=" bg-background-b1 flex flex-row py-7 px-10 z-10 w-full">
            <img src={Logo} className="w-28" />
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="ml-auto">Transfer</Button>
                </DialogTrigger>
                <DialogContent className='px-10 max-w-xl'>
                    <DialogHeader>
                        <DialogTitle>Transfer</DialogTitle>
                        <TransferDialog />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </header>
    );
};
