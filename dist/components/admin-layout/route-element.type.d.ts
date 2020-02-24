import React from 'react';
import { AuthLayoutProps } from './auth-layout/auth-layout';
import { DefaultLayoutProps } from './default-layout/default-layout';
declare type RouteElementBase = {
    path: string;
    component: React.ElementType;
    routes?: RouteElement[];
    exact?: boolean;
    is404?: boolean;
};
export declare type BlankRouteElement = RouteElementBase & {
    layout: 'blank';
};
export declare type DefaultRouteElement = RouteElementBase & {
    layout: 'default';
    breadcrumb: React.ReactNode | string;
    layoutProps?: DefaultLayoutProps;
};
export declare type AuthRouteElement = RouteElementBase & {
    layout: 'auth';
    layoutProps?: AuthLayoutProps;
};
export declare type CustomLayoutRouteElement = RouteElementBase & {
    layout: React.ElementType;
    layoutProps: Record<string, any>;
};
export declare type RouteElement = BlankRouteElement | DefaultRouteElement | AuthRouteElement | CustomLayoutRouteElement;
export {};
