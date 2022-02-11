import React, { useState } from 'react'
import { Select, SelectProps } from 'antd'
import { Editable, EditableProps } from '../editable'
import { FCWithoutChildren } from '../../..'

type SelectValueType = string | number | string[] | number[]

export type EditableSelectProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
  value?: SelectValueType | undefined | null
  placeholder?: string
  onSubmit?: (value?: SelectValueType) => Promise<void>
  selectProps?: SelectProps<string | number | string[] | number[]>
  renderDisplay?: (labels: { label: string; value: string | number }[]) => React.ReactNode
}

export const EditableSelect: FCWithoutChildren<EditableSelectProps> = ({ selectProps, renderDisplay, ...props }) => {
  const [value, setValue] = useState<SelectValueType | undefined | null>(props.value)
  const isSingleSelect = selectProps?.mode !== 'multiple' && selectProps?.mode !== 'tags'

  return (
    <Editable
      {...props}
      valueDisplay={(value) => {
        if (value) {
          if (!Array.isArray(value)) {
            value = [value]
          }
          const labels: { label: string; value: string | number }[] = []
          for (const val of value) {
            const currentValue = selectProps?.options?.find((option) => option.value === val)
            if (currentValue) {
              labels.push(currentValue as any)
            }
          }
          return renderDisplay ? renderDisplay(labels) : labels.map((item) => item.label).join(', ')
        }
        return undefined
      }}
      editElement={(buttons, triggerSubmit) => (
        <div style={{ position: 'relative' }}>
          <Select
            style={{ width: '100%' }}
            autoFocus
            defaultValue={props.value || undefined}
            defaultOpen
            onChange={(e) => {
              setValue(e)
              if (isSingleSelect) {
                triggerSubmit(e)
              }
            }}
            placeholder={props.placeholder}
            {...selectProps}
          />
          <div
            style={{
              position: 'absolute',
              right: 11,
              top: '50%',
              marginTop: -11,
              zIndex: 2
            }}
          >
            {buttons(isSingleSelect ? undefined : () => triggerSubmit(value))}
          </div>
        </div>
      )}
    />
  )
}
