import React from 'react'
import { Meta } from '@storybook/react'
import { EditableDate } from './inputs/editable-date'
import { EditableDateRange } from './inputs/editable-date-range'
import { EditableInput } from './inputs/editable-input'
import { EditableSelect } from './inputs/editable-select'
import { EditableTextarea } from './inputs/editable-textarea'
import { Space, SelectProps } from 'antd'

export default {
  component: EditableInput,
  subcomponents: { EditableDate, EditableDateRange, EditableSelect, EditableTextarea },
  title: 'Components/Editable',
  parameters: { controls: { include: ['title'] } }
} as Meta

export const Input = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <h5>Default</h5>
      <EditableInput onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Placeholder</h5>
      <EditableInput placeholder="My Placeholder" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Default Value</h5>
      <EditableInput
        value="My default Value"
        onSubmit={(data) => {
          console.log(data)
          return Promise.resolve()
        }}
      />
    </div>
    <div>
      <h5>Editable Disabled</h5>
      <EditableInput editAble={false} onSubmit={() => Promise.resolve()} />
    </div>
  </Space>
)

export const Date = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <h5>Default</h5>
      <EditableDate onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Placeholder</h5>
      <EditableDate placeholder="My Placeholder" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Default Value</h5>
      <EditableDate value="2020-10-10" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>Editable Disabled</h5>
      <EditableDate editAble={false} onSubmit={() => Promise.resolve()} />
    </div>
  </Space>
)

export const DateRange = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <h5>Default</h5>
      <EditableDateRange onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Placeholder</h5>
      <EditableDateRange placeholder={['First Placeholder', 'Second Placeholder']} onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Default Value</h5>
      <EditableDateRange value={['2020-10-10', '2020-10-15']} onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>Editable Disabled</h5>
      <EditableDateRange editAble={false} onSubmit={() => Promise.resolve()} />
    </div>
  </Space>
)

const selectProps: SelectProps<any> = {
  options: [
    { label: 'Value 1', value: '1' },
    { label: 'Value 2', value: '2' },
    { label: 'Value 3', value: '3' }
  ]
}

export const Select = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <h5>Default</h5>
      <EditableSelect selectProps={selectProps} onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Placeholder</h5>
      <EditableSelect selectProps={selectProps} placeholder="My Placeholder" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Default Value</h5>
      <EditableSelect selectProps={selectProps} value={'1'} onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>Editable Disabled</h5>
      <EditableSelect selectProps={selectProps} editAble={false} onSubmit={() => Promise.resolve()} />
    </div>
  </Space>
)

const multiSelectProps: SelectProps<any> = {
  ...selectProps,
  mode: 'multiple'
}

export const MultiSelect = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <h5>Default</h5>
      <EditableSelect selectProps={multiSelectProps} onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Placeholder</h5>
      <EditableSelect selectProps={multiSelectProps} placeholder="My Placeholder" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Default Value</h5>
      <EditableSelect selectProps={multiSelectProps} value={['1', '2']} onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>Editable Disabled</h5>
      <EditableSelect selectProps={multiSelectProps} editAble={false} onSubmit={() => Promise.resolve()} />
    </div>
  </Space>
)

export const Textarea = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <h5>Default</h5>
      <EditableTextarea onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Placeholder</h5>
      <EditableTextarea placeholder="My Placeholder" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>With Default Value</h5>
      <EditableTextarea value="My default Value" onSubmit={() => Promise.resolve()} />
    </div>
    <div>
      <h5>Editable Disabled</h5>
      <EditableTextarea editAble={false} onSubmit={() => Promise.resolve()} />
    </div>
  </Space>
)
