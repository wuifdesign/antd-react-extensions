import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { DataDisplay } from './data-display'
import { EditableDate, EditableDateRange, EditableInput, EditableSelect, EditableTextarea } from '../editable'
import { Tag } from 'antd'

export default {
  component: DataDisplay,
  title: 'Components/Data Display',
  parameters: { controls: { include: ['title'] } }
} as Meta

type TemplateProps = {
  title?: string
}

const Template: Story<PropsWithChildren<TemplateProps>> = () => (
  <DataDisplay
    elements={[
      { title: 'Name', content: 'John Doe' },
      { title: 'Role', content: 'Admin' },
      { title: 'Description', content: 'My Description' },
      { title: 'Status', content: <Tag color="green">active</Tag> },
      { title: 'Street', content: 'My Street' },
      { title: 'City', content: 'New York' },
      { title: 'Country', content: 'United States' }
    ]}
  />
)

const TemplateWithEditable: Story<PropsWithChildren<TemplateProps>> = () => (
  <DataDisplay
    elements={[
      { title: 'Date', content: <EditableDate value="2020-10-10" onSubmit={() => Promise.resolve()} /> },
      {
        title: 'Date Range',
        content: <EditableDateRange value={['2020-10-10', '2020-10-15']} onSubmit={() => Promise.resolve()} />,
        col: { span: 12 }
      },
      { title: 'Input', content: <EditableInput value="My Default Value" onSubmit={() => Promise.resolve()} /> },
      {
        title: 'Select',
        content: (
          <EditableSelect
            selectProps={{
              options: [
                { label: 'Value 1', value: '1' },
                { label: 'Value 2', value: '2' },
                { label: 'Value 3', value: '3' }
              ]
            }}
            value="1"
            onSubmit={() => Promise.resolve()}
          />
        )
      },
      { title: 'Textarea', content: <EditableTextarea value="My Default Value" onSubmit={() => Promise.resolve()} /> }
    ]}
  />
)

export const Base = Template.bind({})

export const WithEditable = TemplateWithEditable.bind({})
