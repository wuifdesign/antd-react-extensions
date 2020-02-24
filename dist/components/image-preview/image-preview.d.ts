import React from 'react';
export declare type ImagePreviewProps = {
    url: string | undefined | null;
    thumbUrl?: string;
    size?: number;
    style?: React.CSSProperties;
    fullscreenButton?: boolean;
    hideBackground?: boolean;
    onDelete?: () => Promise<unknown>;
    onEdit?: () => void;
    emptyText?: string;
    askForDeleteConfirmation?: boolean;
    deleteConfirmText?: string | null;
    showFullSizeTitle?: string;
    editImageTitle?: string;
    deleteImageTitle?: string;
};
export declare const ImagePreview: React.FC<ImagePreviewProps>;
export default ImagePreview;
