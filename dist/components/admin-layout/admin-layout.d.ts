import React from 'react';
import { RouteElement } from './route-element.type';
import { DefaultLayoutProps } from './default-layout/default-layout';
import { AuthLayoutProps } from './auth-layout/auth-layout';
export declare type AdminLayoutProps = {
    routes: RouteElement[];
    loading?: boolean;
    useHashRouter?: boolean;
    authLayoutProps?: AuthLayoutProps;
    defaultLayoutProps?: DefaultLayoutProps;
};
/**
 * Default Layout for the Admin Interface. Can be configured for specific needs.
 *
 * LazyLoad Routes:
 * `const DashboardPage = React.lazy(() => import(/* webpackChunkName: "dashboard" *\/'../dashboard.page'))`
 */
export declare const AdminLayout: React.FC<AdminLayoutProps>;
export default AdminLayout;
