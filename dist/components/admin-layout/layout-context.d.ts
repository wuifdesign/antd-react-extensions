import * as React from 'react';
export declare type LayoutContextType = {
    fullPageLoading: boolean;
    setFullPageLoading: (isLoading: boolean) => void;
};
export declare const LayoutContext: React.Context<LayoutContextType>;
export declare const useLayoutContext: () => LayoutContextType;
