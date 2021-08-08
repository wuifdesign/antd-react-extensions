import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import DataDisplayGroup from './data-display-group'
import DataDisplayRow from './data-display-row'
import { EditableDate, EditableDateRange, EditableInput, EditableSelect, EditableTextarea } from '../editable'

export default {
  component: DataDisplayGroup,
  subcomponents: { DataDisplayRow },
  title: 'Components/Data Display',
  parameters: { controls: { include: ['title'] } }
} as Meta

type TemplateProps = {
  title?: string
}

const Template: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <>
    <DataDisplayGroup title={args.title}>
      <DataDisplayGroup.Row label="Label">Content</DataDisplayGroup.Row>
      <DataDisplayGroup.Row label="Label">Content</DataDisplayGroup.Row>
      <DataDisplayGroup.Row label="Label">Content</DataDisplayGroup.Row>
    </DataDisplayGroup>
  </>
)

const TemplateWithEditable: Story<PropsWithChildren<TemplateProps>> = (args) => (
  <>
    <DataDisplayGroup title={args.title}>
      <DataDisplayGroup.Row label="Date">
        <EditableDate value="2020-10-10" onSubmit={() => Promise.resolve()} />
      </DataDisplayGroup.Row>
      <DataDisplayGroup.Row label="Date Range">
        <EditableDateRange value={['2020-10-10', '2020-10-15']} onSubmit={() => Promise.resolve()} />
      </DataDisplayGroup.Row>
      <DataDisplayGroup.Row label="Input">
        <EditableInput value="My Default Value" onSubmit={() => Promise.resolve()} />
      </DataDisplayGroup.Row>
      <DataDisplayGroup.Row label="Select">
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
      </DataDisplayGroup.Row>
      <DataDisplayGroup.Row label="Textarea">
        <EditableTextarea value="My Default Value" onSubmit={() => Promise.resolve()} />
      </DataDisplayGroup.Row>
    </DataDisplayGroup>
  </>
)

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'My Title'
}

export const WithoutTitle = Template.bind({})

export const WithEditable = TemplateWithEditable.bind({})
