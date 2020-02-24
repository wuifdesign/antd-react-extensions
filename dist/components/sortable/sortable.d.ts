import React from 'react';
export declare type SortEndCallback<T extends any> = (data: {
    newIndex: number;
    oldIndex: number;
    newItems: T[];
}) => void;
export declare type DeleteCallback<T extends any> = (data: {
    index: number;
    newItems: T[];
}) => void;
export declare type SortableProps<T extends any> = {
    items: T[];
    getItemKey: (item: T) => string;
    renderItem: (item: T) => React.ReactNode;
    needsConfirmation?: boolean;
    confirmationTitle?: React.ReactNode;
    confirmationContent?: React.ReactNode;
    onSortEnd?: SortEndCallback<T>;
    onDelete?: DeleteCallback<T>;
    disabled?: boolean;
};
declare const Sortable: <T>({ items, onSortEnd, getItemKey, renderItem, needsConfirmation, confirmationTitle, confirmationContent, onDelete, disabled }: SortableProps<T>) => JSX.Element;
export default Sortable;
