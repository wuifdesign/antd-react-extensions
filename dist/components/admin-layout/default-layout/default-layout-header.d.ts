import React from 'react';
export declare type AdminLayoutHeaderProps = {
    logoMobile: React.ReactNode | string;
    headerRight?: React.ReactElement;
    sidebarWidth?: number;
    sidebarCollapsedWidth?: number;
};
declare const DefaultLayoutHeader: React.FC<AdminLayoutHeaderProps>;
export default DefaultLayoutHeader;
