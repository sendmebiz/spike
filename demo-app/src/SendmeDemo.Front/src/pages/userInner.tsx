import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';
import { useParams } from 'wouter';
import { combineUrls } from '@zajno/common/structures/path';

import OutIconUrl from '@/assets/out-icon.svg?url';
import { Loader } from '@/components/Loader';

export const UserInner = observer(() => {
    const { name } = useParams();
    const data = name ? AppController.Instance.Users.getInfo(name) : null;

    return (
        <div className='relative w-full pt-16 px-16 container'>
            <div className='relative w-full'>
                <div className='flex flex-row'>
                    <h1 className='text-hh3 text-primary'>{name}</h1>
                    <a
                        target='_blank'
                        className='w-5 ml-2 glow-hover-inner-img'
                        href={combineUrls(
                            AppController.Instance.Settings.settings.etherscan,
                            'address',
                            data?.current?.address,
                        )}
                    >
                        <img
                            src={OutIconUrl}
                            alt='Open in etherscan'
                        />
                    </a>
                </div>
                <Loader
                    className='w-full h-full'
                    visible={data?.busy || false}
                />
                {data?.current ? (
                    <div className='absolute right-0 top-0 flex flex-col py-5 px-8 gap-5 background-gradient rounded-lg min-w-96 text-main'>
                        <div className='flex flex-row justify-between'>
                            <span className='text-paragraphs'>Balance</span>
                            <span className='text-primary'>{data.current.balance}</span>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <span className='text-paragraphs'>Properties</span>
                            <span className='text-primary'>
                                {data.current.properties?.filter(Boolean).join(', ') || ''}
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
});
