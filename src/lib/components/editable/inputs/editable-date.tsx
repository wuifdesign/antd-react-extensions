import React from 'react'
import { DatePicker, DatePickerProps } from 'antd'
import moment from 'moment'
import { Editable, EditableProps } from '../editable'
import { FCWithoutChildren } from '../../..'

export type EditableDateProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
  value?: string | undefined | null
  placeholder?: string
  onSubmit?: (value: string | undefined) => Promise<void>
  datePickerProps?: DatePickerProps
}

export const EditableDate: FCWithoutChildren<EditableDateProps> = ({ datePickerProps, ...props }) => {
  const defaultValue = props.value ? moment(props.value) : undefined

  return (
    <Editable
      {...props}
      editElement={(buttons, triggerSubmit) => (
        <div style={{ position: 'relative' }}>
          <DatePicker
            allowClear={false}
            style={{ width: '100%', paddingRight: 33 }}
            placeholder={props.placeholder}
            defaultOpen
            autoFocus
            defaultValue={defaultValue}
            onChange={(_, date) => {
              triggerSubmit(date)
            }}
            {...datePickerProps}
          />
          <div style={{ position: 'absolute', right: 11, top: '50%', marginTop: -11, zIndex: 2 }}>{buttons()}</div>
        </div>
      )}
    />
  )
}
