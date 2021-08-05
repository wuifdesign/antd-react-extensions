import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { MailOutlined } from '@ant-design/icons'
import NotificationsPopover, { NotificationsPopoverProps } from './notifications-popover'

export default {
  component: NotificationsPopover,
  title: 'Components/Notifications Popover'
} as Meta

const Template: Story<Partial<PropsWithChildren<NotificationsPopoverProps>>> = (args) => (
  <NotificationsPopover
    notificationListProps={{
      maxHeight: 250,
      dataSource: [
        {
          icon: <MailOutlined />,
          title: 'Title 1',
          description: 'This is description number 1',
          onClick: () => console.log('item 1')
        },
        {
          icon: <MailOutlined />,
          title: 'Title 2',
          description: 'This is description number 2',
          onClick: () => console.log('item 2')
        },
        {
          icon: <MailOutlined />,
          title: 'Title 3',
          description: 'This is description number 3',
          onClick: () => console.log('item 3')
        },
        {
          icon: <MailOutlined />,
          title: 'Title 4',
          description: 'This is description number 4',
          onClick: () => console.log('item 4')
        },
        {
          icon: <MailOutlined />,
          title: 'Title 5',
          description: 'This is description number 5',
          onClick: () => console.log('item 5')
        }
      ]
    }}
    {...args}
  />
)

export const Base = Template.bind({})
Base.args = {}

export const WithDot = Template.bind({})
WithDot.args = {
  dot: true
}

export const WithCount = Template.bind({})
WithCount.args = {
  count: 3
}
