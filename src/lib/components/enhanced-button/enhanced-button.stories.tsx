import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { EnhancedButton, EnhancedButtonProps } from './enhanced-button'
import { Space } from 'antd'

export default {
  component: EnhancedButton,
  title: 'Components/Enhanced Button',
  parameters: { controls: { include: ['success', 'warning'] } }
} as Meta

const Template: Story<PropsWithChildren<EnhancedButtonProps>> = (args) => (
  <>
    <Space wrap>
      <EnhancedButton {...args} type="primary">
        Primary
      </EnhancedButton>
      <EnhancedButton {...args}>Default</EnhancedButton>
      <EnhancedButton {...args} type="dashed">
        Dashed
      </EnhancedButton>
      <EnhancedButton {...args} type="primary" ghost>
        Ghost
      </EnhancedButton>
      <EnhancedButton {...args} type="text">
        Text
      </EnhancedButton>
      <EnhancedButton {...args} type="link">
        Link
      </EnhancedButton>
      <EnhancedButton {...args} type="text-inline">
        Link
      </EnhancedButton>
      <EnhancedButton {...args} type="link-inline">
        Link
      </EnhancedButton>
    </Space>
    <br />
    <br />
    <Space wrap>
      <EnhancedButton {...args} type="primary" disabled>
        Primary
      </EnhancedButton>
      <EnhancedButton {...args} disabled>
        Default
      </EnhancedButton>
      <EnhancedButton {...args} type="dashed" disabled>
        Dashed
      </EnhancedButton>
      <EnhancedButton {...args} type="primary" ghost disabled>
        Ghost
      </EnhancedButton>
      <EnhancedButton {...args} type="text" disabled>
        Text
      </EnhancedButton>
      <EnhancedButton {...args} type="link" disabled>
        Link
      </EnhancedButton>
      <EnhancedButton {...args} type="text-inline" disabled>
        Link
      </EnhancedButton>
      <EnhancedButton {...args} type="link-inline" disabled>
        Link
      </EnhancedButton>
    </Space>
  </>
)

export const Base = Template.bind({})
Base.args = {}

export const Danger = Template.bind({})
Danger.args = {
  danger: true
}

export const Success = Template.bind({})
Success.args = {
  success: true
}

export const Warning = Template.bind({})
Warning.args = {
  warning: true
}
