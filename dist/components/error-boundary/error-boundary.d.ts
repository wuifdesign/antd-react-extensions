import React from 'react';
export declare type ErrorBoundaryProps = {
    showFallback?: boolean;
    fallback?: React.ReactNode;
};
/**
 * Catch any error within component.
 *
 * Use `ErrorBoundary.setOnErrorHandler((error, info) => console.log(error, info))` to log errors if needed.
 */
declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, {
    hasError: boolean;
}> {
    static defaultProps: ErrorBoundaryProps;
    static onError: (error: Error | null, info: object) => void;
    static setOnErrorHandler: (handler: (error: Error | null, info: object) => void) => void;
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error | null, info: object): void;
    render(): React.ReactNode;
}
export default ErrorBoundary;
