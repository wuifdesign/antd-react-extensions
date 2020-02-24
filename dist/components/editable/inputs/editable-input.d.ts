import React from 'react';
import { EditableProps } from '../editable';
export declare type EditableInputProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
    value?: string;
    placeholder?: string;
    onSubmit?: (value: string | undefined) => Promise<void>;
};
declare const EditableInput: React.FC<EditableInputProps>;
export default EditableInput;
