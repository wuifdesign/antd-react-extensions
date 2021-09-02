import React from 'react'
import { render, screen } from '@testing-library/react'
import { NotificationsList } from './notifications-list'
import { MailOutlined } from '@ant-design/icons'

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

describe('NotificationsList', () => {
  it('should render', () => {
    render(<NotificationsList dataSource={data} />)
  })

  it('should display children', () => {
    render(<NotificationsList dataSource={data} />)
    const buttonText = screen.getByText(/Title 1/i)
    expect(buttonText).toBeInTheDocument()
  })
})
