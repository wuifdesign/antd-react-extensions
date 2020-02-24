import React from 'react';
export declare type MenuItem = {
    title: string;
    url: string;
    exact?: boolean;
    icon?: React.ReactNode;
};
export declare type MenuGroup = {
    title: string;
    type: 'group';
    elements: MenuElement[];
};
export declare type MenuSubMenu = {
    title: string;
    type: 'submenu';
    elements: MenuElement[];
    icon?: React.ReactNode;
};
export declare type MenuElement = MenuItem | MenuGroup | MenuSubMenu;
export declare type EnhancedMenuItem = MenuItem & {
    key: string;
};
export declare type EnhancedMenuGroup = MenuGroup & {
    key: string;
    activeBy: string[];
    elements: EnhancedMenuElement[];
};
export declare type EnhancedMenuSubMenu = MenuSubMenu & {
    key: string;
    activeBy: string[];
    elements: EnhancedMenuElement[];
};
export declare type EnhancedMenuElement = EnhancedMenuItem | EnhancedMenuGroup | EnhancedMenuSubMenu;
export declare const isMenuItemType: (item: EnhancedMenuElement) => item is EnhancedMenuItem;
