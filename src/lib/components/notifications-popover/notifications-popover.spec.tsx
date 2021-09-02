import React from 'react'
import { render, screen } from '@testing-library/react'
import { MailOutlined } from '@ant-design/icons'
import { NotificationsPopover } from './notifications-popover'

const data = [
  {
    icon: <MailOutlined />,
    title: 'Title 1',
    description: 'This is description number 1'
  },
  {
    icon: <MailOutlined />,
    title: 'Title 2',
    description: 'This is description number 2'
  },
  {
    icon: <MailOutlined />,
    title: 'Title 3',
    description: 'This is description number 3'
  }
]

describe('NotificationsPopover', () => {
  it('should render', () => {
    render(<NotificationsPopover notificationListProps={{ dataSource: data }} />)
  })

  it('should display children', () => {
    render(<NotificationsPopover notificationListProps={{ dataSource: data }} />)
    const buttonText = screen.getByLabelText(/bell/i)
    expect(buttonText).toBeInTheDocument()
  })
})
