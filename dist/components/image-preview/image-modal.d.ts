import React from 'react';
export declare type ImageModalProps = {
    visible: boolean;
    imageUrl: string;
    onClose: () => void;
};
export declare const ImageModal: React.FC<ImageModalProps>;
export default ImageModal;
