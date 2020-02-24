import React from 'react';
export declare type SortableItemProps = {
    id: string;
    item: React.ReactNode;
    disabled?: boolean;
    onDelete?: (id: string) => void;
};
declare const SortableItem: React.FC<SortableItemProps>;
export default SortableItem;
