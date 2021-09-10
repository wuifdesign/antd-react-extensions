import React from 'react'
import { DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import { Editable, EditableProps } from '../editable'
import { RangePickerBaseProps } from 'antd/es/date-picker/generatePicker'

export type EditableDateRangeProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
  value: [string, string] | undefined | null
  placeholder?: [string, string]
  onSubmit?: (value: [string, string] | undefined) => Promise<void>
  dateRangePickerProps?: RangePickerBaseProps<any>
}

export const EditableDateRange: React.FC<EditableDateRangeProps> = ({ dateRangePickerProps, ...props }) => {
  let defaultValue: [Moment, Moment] | undefined
  if (props.value?.length === 2 && props.value[0] && props.value[1]) {
    defaultValue = [moment(props.value[0]), moment(props.value[1])]
  }

  return (
    <Editable
      {...props}
      valueDisplay={(value: [string, string] | undefined) => {
        if (value) {
          return `${value[0]} - ${value[1]}`
        }
        return undefined
      }}
      editElement={(buttons, triggerSubmit) => (
        <div style={{ position: 'relative' }}>
          <DatePicker.RangePicker
            allowClear={false}
            style={{ width: '100%', paddingRight: 33 }}
            placeholder={props.placeholder}
            defaultOpen
            autoFocus
            defaultValue={defaultValue}
            onChange={(_, dates) => {
              triggerSubmit(dates)
            }}
            {...dateRangePickerProps}
          />
          <div style={{ position: 'absolute', right: 11, top: '50%', marginTop: -11, zIndex: 2 }}>{buttons()}</div>
        </div>
      )}
    />
  )
}
