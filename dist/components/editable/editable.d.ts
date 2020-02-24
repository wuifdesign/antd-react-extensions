import React from 'react';
export declare type EditableProps = {
    onSubmit?: (value: any) => Promise<void>;
    value?: any;
    valuePlaceholder?: string;
    editAble?: boolean;
    style?: React.CSSProperties;
};
export declare type BaseEditableProps = EditableProps & {
    valueDisplay?: (value: any) => React.ReactNode | undefined;
    onStartEdit?: () => any;
    onExitEdit?: () => any;
    editElement: (buttons: (saveHandler?: () => any) => React.ReactNode, triggerSubmit: (value: any) => any) => React.ReactNode;
};
declare const Editable: React.FC<BaseEditableProps>;
export default Editable;
