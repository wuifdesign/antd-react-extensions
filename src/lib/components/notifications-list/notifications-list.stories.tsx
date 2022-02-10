import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { NotificationsList, NotificationsListProps } from './notifications-list'
import { MailOutlined } from '@ant-design/icons'
import { EnhancedButton } from '../enhanced-button'

export default {
  component: NotificationsList,
  title: 'Components/Notifications List'
} as Meta

const Template: Story<Partial<PropsWithChildren<NotificationsListProps>>> = (args) => (
  <NotificationsList
    dataSource={[
      {
        icon: <MailOutlined />,
        title: 'Title 1',
        description: 'This is description number 1',
        date: '2020-12-12 12:30',
        onClick: () => console.log('item 1')
      },
      {
        type: 'primary',
        icon: <MailOutlined />,
        title: 'Title 2',
        description: 'This is description number 2',
        date: '2020-12-12 12:30',
        onClick: () => console.log('item 2')
      },
      {
        type: 'success',
        icon: <MailOutlined />,
        title: 'Title 3',
        description: 'This is description number 3',
        date: '2020-12-12 12:30',
        onClick: () => console.log('item 3')
      },
      {
        type: 'warning',
        icon: <MailOutlined />,
        title: 'Title 4',
        description: 'This is description number 4',
        date: '2020-12-12 12:30',
        onClick: () => console.log('item 4')
      },
      {
        type: 'danger',
        icon: <MailOutlined />,
        title: 'Title 5',
        description: 'This is description number 5',
        date: '2020-12-12 12:30',
        onClick: () => console.log('item 5')
      },
      {
        type: 'danger',
        icon: <MailOutlined />,
        title: 'Title 5',
        read: true,
        description: 'This is description number 5',
        date: '2020-12-12 12:30',
        onClick: () => console.log('item 5')
      }
    ]}
    {...args}
  />
)

export const Base = Template.bind({})
Base.args = {}

export const WithHeaderAndFooter = Template.bind({})
WithHeaderAndFooter.args = {
  maxHeight: 500,
  header: <div style={{ textAlign: 'center' }}>All your Notifications</div>,
  footer: (
    <EnhancedButton type="link" block>
      Show all Notifications
    </EnhancedButton>
  )
}
