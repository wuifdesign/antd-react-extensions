import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import EllipsisMiddle, { EllipsisMiddleProps } from './ellipsis-middle'

export default {
  component: EllipsisMiddle,
  title: 'Components/Ellipsis Middle'
} as Meta

const Template: Story<PropsWithChildren<EllipsisMiddleProps>> = (args) => (
  <EllipsisMiddle {...args}>
    In the process of internal desktop applications development, many different design specs and implementations would
    be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of
    development.
  </EllipsisMiddle>
)

export const Base = Template.bind({})
Base.args = {
  suffixCount: 10
}
