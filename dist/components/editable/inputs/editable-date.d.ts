import React from 'react';
import { DatePickerProps } from 'antd/lib/date-picker';
import { EditableProps } from '../editable';
export declare type EditableDateProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
    value?: string;
    placeholder?: string;
    onSubmit?: (value: string | undefined) => Promise<void>;
    datePickerProps?: DatePickerProps;
};
declare const EditableDate: React.FC<EditableDateProps>;
export default EditableDate;
