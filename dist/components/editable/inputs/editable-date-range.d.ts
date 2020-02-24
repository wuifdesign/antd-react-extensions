import React from 'react';
import { EditableProps } from '../editable';
import { RangePickerBaseProps } from 'antd/es/date-picker/generatePicker';
export declare type EditableDateRangeProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
    value?: [string, string];
    placeholder?: [string, string];
    onSubmit?: (value: [string, string] | undefined) => Promise<void>;
    dateRangePickerProps?: RangePickerBaseProps<any>;
};
declare const EditableDateRange: React.FC<EditableDateRangeProps>;
export default EditableDateRange;
