import React, { useCallback, useEffect, useState } from 'react'
import { Input } from 'antd'
import { Editable, EditableProps } from '../editable'

export type EditableInputProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
  value: string | undefined | null
  placeholder?: string
  onSubmit?: (value: string | undefined) => Promise<void>
}

export const EditableInput: React.FC<EditableInputProps> = ({ ...props }) => {
  const [value, setValue] = useState<string | undefined | null>(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <Editable
      {...props}
      onExitEdit={useCallback(() => setValue(props.value), [props.value])}
      editElement={(buttons, triggerSubmit) => (
        <Input
          autoFocus
          defaultValue={value || undefined}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              triggerSubmit(value)
            }
          }}
          suffix={buttons(() => triggerSubmit(value))}
          placeholder={props.placeholder}
        />
      )}
    />
  )
}
