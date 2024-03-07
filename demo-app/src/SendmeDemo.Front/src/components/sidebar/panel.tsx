import { AppRoutes } from '@/constants/routes';
import { Link } from '@/components/common/link';
import { useLocation } from 'wouter';
import { twMerge } from '../utils';

export const SidebarPanel = () => {
    const [path] = useLocation();
    const isIssuer = path === AppRoutes.Issuer;

    return (
        <aside className="w-80 h-full bg-background-b2 flex flex-col px-10 pt-6 gap-3">
            <NavLink to={AppRoutes.Users.Root} isActive={!isIssuer}>Users</NavLink>
            <NavLink to={AppRoutes.Issuer} isActive={isIssuer}>Issuer Portal</NavLink>
        </aside>
    );
};

type NavLinkProps = {
    to: string;
    children: React.ReactNode;
    isActive?: boolean;
};

const NavLink = ({ to, children, isActive }: NavLinkProps) => {
    return (
        <div className='relative'>
            <Link
                to={to}
                className={twMerge(
                    'pl-0 text-main',
                    isActive ? 'text-accent-a1' : undefined,
                )}
            >
                {children}
            </Link>
            {isActive && (
                <div
                    className="absolute top-0 -left-5 h-full w-[3px] bg-accent-a1 rounded-sm"
                />
            )}
        </div>
    );
};
