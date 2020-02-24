import React from 'react';
import { PageContentHeaderProps } from './page-content-header';
export declare type PageContentProps = {
    style?: React.CSSProperties;
    loading?: boolean;
};
declare const PageContent: React.FC<PageContentProps> & {
    Header: React.FC<PageContentHeaderProps>;
};
export default PageContent;
