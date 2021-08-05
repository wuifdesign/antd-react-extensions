import React from 'react'
import { render, screen } from '@testing-library/react'
import { MailOutlined } from '@ant-design/icons'
import { NotificationsPopover } from './notifications-popover'

const data = [
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
  }
]

describe('NotificationsPopover', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  it('should render', () => {
    render(<NotificationsPopover notificationListProps={{ dataSource: data }} />)
  })

  it('should display children', () => {
    render(<NotificationsPopover notificationListProps={{ dataSource: data }} />)
    const buttonText = screen.getByLabelText(/bell/i)
    expect(buttonText).toBeInTheDocument()
  })
})
