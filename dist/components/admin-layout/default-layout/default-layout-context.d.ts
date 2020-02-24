import * as React from 'react';
export declare type AdminLayoutContextType = {
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    mobileNavOpen: boolean;
    setMobileNavOpen: (open: boolean) => void;
};
export declare const DefaultLayoutContext: React.Context<AdminLayoutContextType>;
