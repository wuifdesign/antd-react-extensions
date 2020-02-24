import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { Button, ButtonProps } from './button'
import { Space } from 'antd'

export default {
  component: Button,
  title: 'Components/Button',
  parameters: { controls: { include: ['success', 'warning'] } }
} as Meta

const Template: Story<PropsWithChildren<ButtonProps>> = (args) => (
  <>
    <Space wrap>
      <Button {...args} type="primary">
        Primary
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} type="dashed">
        Dashed
      </Button>
      <Button {...args} type="text">
        Text
      </Button>
      <Button {...args} type="link">
        Link
      </Button>
      <Button {...args} type="primary" disabled>
        Primary
      </Button>
      <Button {...args} disabled>
        Default
      </Button>
      <Button {...args} type="dashed" disabled>
        Dashed
      </Button>
      <Button {...args} type="text" disabled>
        Text
      </Button>
      <Button {...args} type="link" disabled>
        Link
      </Button>
    </Space>
  </>
)

export const Success = Template.bind({})
Success.args = {
  success: true
}

export const Warning = Template.bind({})
Warning.args = {
  warning: true
}
