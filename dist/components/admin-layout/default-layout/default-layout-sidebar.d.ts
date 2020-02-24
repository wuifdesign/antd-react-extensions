import React from 'react';
import { MenuElement } from '../menu-element.type';
export declare const SIDEBAR_WIDTH = 230;
export declare const SIDEBAR_COLLAPSED_WIDTH = 80;
export declare type AdminLayoutSidebarProps = {
    menu: MenuElement[];
    logo: React.ReactNode | string;
    logoCollapsed?: React.ReactNode | string;
    sidebarBottom?: React.ReactNode | string;
    sidebarWidth?: number;
    sidebarTheme?: 'light' | 'dark';
    sidebarCollapsedWidth?: number;
    menuPrepend?: React.ReactNode | string;
    menuAppend?: React.ReactNode | string;
};
declare const DefaultLayoutSidebar: React.FC<AdminLayoutSidebarProps>;
export default DefaultLayoutSidebar;
