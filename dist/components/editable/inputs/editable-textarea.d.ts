import React from 'react';
import { EditableProps } from '../editable';
export declare type EditableTextareaProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
    value?: string;
    placeholder?: string;
    onSubmit?: (value: string | undefined) => Promise<void>;
};
declare const EditableTextarea: React.FC<EditableTextareaProps>;
export default EditableTextarea;
