import React from 'react';
import { MenuElement } from '../menu-element.type';
import { RouteElement } from '../route-element.type';
export declare type DefaultLayoutProps = {
    menu: MenuElement[];
    logo: React.ReactNode | string;
    logoMobile?: React.ReactNode | string;
    logoCollapsed?: React.ReactNode | string;
    sidebarTheme?: 'light' | 'dark';
    sidebarBottom?: React.ReactNode | string;
    hideFrame?: boolean;
    hideBreadcrumbs?: boolean;
    sidebarWidth?: number;
    sidebarCollapsedWidth?: number;
    sidebarMenuPrepend?: React.ReactNode | string;
    sidebarMenuPrependCollapsed?: React.ReactNode | string;
    sidebarMenuAppend?: React.ReactNode | string;
    sidebarMenuAppendCollapsed?: React.ReactNode | string;
    headerRight?: React.ReactElement;
};
export declare type DefaultLayoutPropsInternal = DefaultLayoutProps & {
    routes: RouteElement[];
};
export declare const DefaultLayout: React.FC<DefaultLayoutPropsInternal>;
export default DefaultLayout;
