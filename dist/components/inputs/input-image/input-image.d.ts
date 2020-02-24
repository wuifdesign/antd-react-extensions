import React from 'react';
import { ImagePreviewProps } from '../../image-preview/image-preview';
export declare type ImageData = {
    mimeType?: string;
    base64?: string;
    base64Image?: string;
};
export declare type ImageRemoveData = {
    mimeType: null;
    base64: null;
    base64Image: null;
    remove: true;
};
export declare type InputImageProps = {
    defaultImage?: string;
    clearable?: boolean;
    onChange?: (value: ImageData | ImageRemoveData) => void;
    imagePreviewProps?: Omit<ImagePreviewProps, 'url' | 'size' | 'onDelete' | 'onEdit'>;
    texts?: {
        dropWaiting: string;
        dropActive: string;
    };
};
export declare const InputImage: React.FC<InputImageProps>;
export default InputImage;
