import React from 'react';
import { DataDisplayRowProps } from './data-display-row';
export declare type DataDisplayGroupProps = {
    title?: string;
};
declare type ChildComponents = {
    Row: React.FC<DataDisplayRowProps>;
};
declare const DataDisplayGroup: React.FC<DataDisplayGroupProps> & ChildComponents;
export default DataDisplayGroup;
