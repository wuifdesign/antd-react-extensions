import React from 'react';
declare type ErrorKeysType = 403 | 404 | 500;
declare type ErrorPageTranslationType = {
    [key in ErrorKeysType]: {
        title?: string;
        description?: string;
    };
};
export declare type ErrorPageProps = {
    type: ErrorKeysType;
    description?: string;
    translations?: ErrorPageTranslationType;
};
declare const ErrorPage: React.FC<ErrorPageProps>;
export default ErrorPage;
