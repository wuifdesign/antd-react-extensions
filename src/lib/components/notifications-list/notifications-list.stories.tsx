import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { NotificationsList, NotificationsListProps } from './notifications-list'
import { MailOutlined } from '@ant-design/icons'

export default {
  component: NotificationsList,
  title: 'Components/Notifications List'
} as Meta

const Template: Story<Partial<PropsWithChildren<NotificationsListProps>>> = (args) => (
  <NotificationsList
    maxHeight={200}
    dataSource={[
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
    ]}
    {...args}
  />
)

export const Base = Template.bind({})
Base.args = {}
