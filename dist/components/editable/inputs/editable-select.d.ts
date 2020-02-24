import React from 'react';
import { SelectProps } from 'antd/lib/select';
import { EditableProps } from '../editable';
declare type SelectValueType = string | number | string[] | number[];
export declare type EditableSelectProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
    value?: SelectValueType;
    placeholder?: string;
    onSubmit?: (value?: SelectValueType) => Promise<void>;
    selectProps?: SelectProps<string | number | string[] | number[]>;
    renderDisplay?: (labels: {
        label: string;
        value: string | number;
    }[]) => React.ReactNode;
};
declare const EditableSelect: React.FC<EditableSelectProps>;
export default EditableSelect;
