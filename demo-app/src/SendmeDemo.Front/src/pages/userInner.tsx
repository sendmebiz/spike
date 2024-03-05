import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';
import { useParams } from 'wouter';

export const UserInner = observer(() => {
    const { name } = useParams();
    const data = name ? AppController.Instance.Users.getTransactions(name) : null;

    return (
        <div className='relative w-full p-8'>
            <h1 className='text-hh4 text-main'>{name}</h1>

            {data?.current ? (
                <div className='absolute right-8 top-8 flex flex-col p-5 gap-2 bg-background-b2 rounded-lg min-w-80'>
                    <div className='flex flex-row justify-between'>
                        <span className='text-main'>Balance</span>
                        <span>{data.current.balance}</span>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <span className='text-main'>Properties</span>
                        <span>{data.current.properties?.filter(Boolean).map(p => (<span key={p}>{p}</span>))}</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
});
