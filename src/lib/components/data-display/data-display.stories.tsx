import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { DataDisplay } from './data-display'
import { DataDisplayItem } from './data-display-item'
import { EditableDate, EditableDateRange, EditableInput, EditableSelect, EditableTextarea } from '../editable'
import { Tag } from 'antd'

export default {
  component: DataDisplay,
  subcomponents: { DataDisplayRow: DataDisplayItem },
  title: 'Components/Data Display',
  parameters: { controls: { include: ['title'] } }
} as Meta

type TemplateProps = {
  title?: string
}

const Template: Story<PropsWithChildren<TemplateProps>> = () => (
  <>
    <DataDisplay>
      <DataDisplay.Item label="Name">John Doe</DataDisplay.Item>
      <DataDisplay.Item label="Role">Admin</DataDisplay.Item>
      <DataDisplay.Item label="Description">My Description</DataDisplay.Item>
      <DataDisplay.Item label="Status">
        <Tag color="green">active</Tag>
      </DataDisplay.Item>
      <DataDisplay.Item label="Street">My Street</DataDisplay.Item>
      <DataDisplay.Item label="City">New York</DataDisplay.Item>
      <DataDisplay.Item label="Country">United States</DataDisplay.Item>
    </DataDisplay>
  </>
)

const TemplateWithEditable: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <>
    <DataDisplay title={args.title}>
      <DataDisplay.Item label="Date">
        <EditableDate value="2020-10-10" onSubmit={() => Promise.resolve()} />
      </DataDisplay.Item>
      <DataDisplay.Item label="Date Range" span={12}>
        <EditableDateRange value={['2020-10-10', '2020-10-15']} onSubmit={() => Promise.resolve()} />
      </DataDisplay.Item>
      <DataDisplay.Item label="Input">
        <EditableInput value="My Default Value" onSubmit={() => Promise.resolve()} />
      </DataDisplay.Item>
      <DataDisplay.Item label="Select">
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
      </DataDisplay.Item>
      <DataDisplay.Item label="Textarea">
        <EditableTextarea value="My Default Value" onSubmit={() => Promise.resolve()} />
      </DataDisplay.Item>
    </DataDisplay>
  </>
)

export const Base = Template.bind({})

export const WithEditable = TemplateWithEditable.bind({})
