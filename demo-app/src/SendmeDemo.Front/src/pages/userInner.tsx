import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';
import { useParams } from 'wouter';
import { Loader } from '@/components/Loader';
import { IssuerName } from '@/constants/names';
import { IssuerView } from '@/components/screens/issuer/IssuerView';
import { formatCurrency } from '@/components/utils/format';
import { getAddressLink } from '@/viewModels/screens/utils/links';

import OutIconUrl from '@/assets/out-icon.svg?url';

export const UserInner = observer(() => {
    const { name } = useParams();
    const data = name ? AppController.Instance.Users.getInfo(name) : null;

    const isIssuer = name === IssuerName;

    return (
        <div className='relative w-full pt-16 px-16 container'>
            <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <h1 className='text-hh3 text-primary'>{name}</h1>
                    <a
                        target='_blank'
                        className='w-5 ml-2 glow-hover-inner-img'
                        href={getAddressLink(data?.current?.address || '')}
                    >
                        <img
                            src={OutIconUrl}
                            alt='Open in etherscan'
                        />
                    </a>
                </div>
                {data?.current ? (
                    <div className='relative flex flex-col py-5 px-8 gap-5 background-gradient rounded-lg min-w-[400px] text-main'>
                        <div className='flex flex-row justify-between'>
                            <span className='text-paragraphs'>Balance</span>
                            <span className='text-primary ml-6'>
                                {formatCurrency(data.current.balance)}
                            </span>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <span className='text-paragraphs'>Properties</span>
                            <span className='text-primary ml-6'>
                                {data.current.properties?.filter(Boolean).join(', ') || ''}
                            </span>
                        </div>
                        {isIssuer && data.current.totalSupply && (
                            <div className='flex flex-row justify-between'>
                                <span className='text-paragraphs'>Total Supply</span>
                                <span className='text-primary ml-6'>
                                    {formatCurrency(data.current.totalSupply)}
                                </span>
                            </div>
                        )}
                        <Loader
                            className='w-full h-full absolute left-0 top-0 right-0 bottom-0 bg-black/80'
                            visible={AppController.Instance.Users.isRefreshing}
                        />
                    </div>
                ) : null}
                <Loader
                    className='w-full h-full'
                    visible={data?.busy || false}
                />
            </div>
            {isIssuer && (
                <IssuerView className='mt-10' />
            )}
        </div>
    );
});
