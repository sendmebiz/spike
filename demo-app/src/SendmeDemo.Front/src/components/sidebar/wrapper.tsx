import { SidebarPanel } from './panel';

export const Sidebar = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="flex flex-row grow shrink min-h-0">
            <SidebarPanel />
            {children}
        </div>
    );
};
