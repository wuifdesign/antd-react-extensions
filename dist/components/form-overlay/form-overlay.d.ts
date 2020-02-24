import React from 'react';
import { ButtonProps } from '../button/button';
export declare type FormOverlayButtons = 'reset' | 'cancel' | 'submit' | React.ReactNode;
export declare type FormOverlayProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (value: any) => Promise<void>;
    width?: number;
    title?: string;
    type?: 'drawer' | 'modal';
    submitButtonProps?: ButtonProps;
    submitButtonText?: string;
    submitButtonIcon?: React.ReactNode;
    submitButtonDisabled?: boolean;
    cancelButtonProps?: ButtonProps;
    cancelButtonText?: string;
    buttons?: {
        left: FormOverlayButtons[];
        right: FormOverlayButtons[];
    };
    initialValues?: object;
};
declare const FormOverlay: React.FC<FormOverlayProps>;
export default FormOverlay;
