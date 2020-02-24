import React from 'react';
export declare type CssVariablesType = Record<string, string>;
export declare type ThemeContextType = {
    css: string | undefined;
    setCss: (css: string) => void;
    cssVariables: CssVariablesType;
    setCssVariables: (cssVariables: CssVariablesType) => void;
};
export declare const ThemeContext: React.Context<ThemeContextType>;
export declare const useTheme: () => {
    css: string;
    setCss: (css: string) => void;
    cssVariables: CssVariablesType;
    setCssVariables: (cssVariables: CssVariablesType) => void;
};
