import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { DataListGroup } from './data-list-group'
import { DataListItem } from './data-list-item'
import { EditableDate, EditableDateRange, EditableInput, EditableSelect, EditableTextarea } from '../editable'

export default {
  component: DataListGroup,
  subcomponents: { DataDisplayRow: DataListItem },
  title: 'Components/Data List',
  parameters: { controls: { include: ['title'] } }
} as Meta

type TemplateProps = {
  title?: string
}

const Template: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <>
    <DataListGroup title={args.title}>
      <DataListGroup.Item label="Label">Content</DataListGroup.Item>
      <DataListGroup.Item label="Label">Content</DataListGroup.Item>
      <DataListGroup.Item label="Label">Content</DataListGroup.Item>
    </DataListGroup>
  </>
)

const TemplateWithEditable: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <>
    <DataListGroup title={args.title}>
      <DataListGroup.Item label="Date">
        <EditableDate value="2020-10-10" onSubmit={() => Promise.resolve()} />
      </DataListGroup.Item>
      <DataListGroup.Item label="Date Range">
        <EditableDateRange value={['2020-10-10', '2020-10-15']} onSubmit={() => Promise.resolve()} />
      </DataListGroup.Item>
      <DataListGroup.Item label="Input">
        <EditableInput value="My Default Value" onSubmit={() => Promise.resolve()} />
      </DataListGroup.Item>
      <DataListGroup.Item label="Select">
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
      </DataListGroup.Item>
      <DataListGroup.Item label="Textarea">
        <EditableTextarea value="My Default Value" onSubmit={() => Promise.resolve()} />
      </DataListGroup.Item>
    </DataListGroup>
  </>
)

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'My Title'
}

export const WithoutTitle = Template.bind({})

export const WithEditable = TemplateWithEditable.bind({})
