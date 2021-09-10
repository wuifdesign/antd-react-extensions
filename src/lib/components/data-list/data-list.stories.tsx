import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { DataList } from './data-list'
import { EditableDate, EditableDateRange, EditableInput, EditableSelect, EditableTextarea } from '../editable'
import { Tag } from 'antd'

export default {
  component: DataList,
  title: 'Components/Data List',
  parameters: { controls: { include: ['title'] } }
} as Meta

type TemplateProps = {
  title?: string
}

const Template: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <DataList
    title={args.title}
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

const TemplateWithEditable: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <DataList
    title={args.title}
    elements={[
      { title: 'Date', content: <EditableDate value="2020-10-10" onSubmit={() => Promise.resolve()} /> },
      {
        title: 'Date Range',
        content: <EditableDateRange value={['2020-10-10', '2020-10-15']} onSubmit={() => Promise.resolve()} />
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

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'My Title'
}

export const WithoutTitle = Template.bind({})

export const WithEditable = TemplateWithEditable.bind({})
