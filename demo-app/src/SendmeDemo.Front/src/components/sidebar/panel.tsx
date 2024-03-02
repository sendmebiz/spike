import { AppRoutes } from '@/constants/routes';
import { Link } from '@/components/common/link';
import { useRoute } from 'wouter';
import { twMerge } from 'tailwind-merge';

export const SidebarPanel = () => {
    return (
        <aside className="w-72 h-full bg-background-b2 flex flex-col px-10 pt-6 gap-1">
            <NavLink to={AppRoutes.Users}>Users</NavLink>
            <NavLink to={AppRoutes.Issuer}>Issuer</NavLink>
        </aside>
    );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const [isActive] = useRoute(to);

    return (
        <div className='relative'>
            <Link
                to={to}
                className={twMerge(
                    'pl-0',
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
