import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import { useTextareaScrollbarWidth } from '../../../utils/hooks'
import { Editable, EditableProps } from '../editable'
import { FCWithoutChildren } from '../../../utils'

export type EditableTextareaProps = Omit<EditableProps, 'value' | 'onSubmit'> & {
  value?: string | undefined | null
  placeholder?: string
  onSubmit?: (value: string | undefined) => Promise<void>
}

export const EditableTextarea: FCWithoutChildren<EditableTextareaProps> = ({ ...props }) => {
  const [value, setValue] = useState<string | undefined | null>(props.value)
  const [, setRenderTrigger] = useState(0)
  const textArea = useRef(null)
  const textAreaScrollbarWidth = useTextareaScrollbarWidth(textArea.current)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <Editable
      {...props}
      onStartEdit={() => setTimeout(() => setRenderTrigger((n) => n + 1))}
      onExitEdit={useCallback(() => setValue(props.value), [props.value])}
      editElement={(buttons, triggerSubmit) => (
        <div style={{ position: 'relative' }}>
          <Input.TextArea
            ref={textArea}
            style={{ paddingRight: textAreaScrollbarWidth + 45 + 11 }}
            rows={7}
            autoFocus
            value={value || undefined}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder={props.placeholder}
          />
          <div
            style={{ position: 'absolute', right: textAreaScrollbarWidth + 11, top: '50%', marginTop: -11, zIndex: 2 }}
          >
            {buttons(() => triggerSubmit(value))}
          </div>
        </div>
      )}
    />
  )
}
