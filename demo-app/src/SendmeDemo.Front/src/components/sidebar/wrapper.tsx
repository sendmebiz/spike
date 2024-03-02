import { SidebarPanel } from './panel';

export const Sidebar = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="flex flex-row h-full">
            <SidebarPanel />
            {children}
        </div>
    );
};
